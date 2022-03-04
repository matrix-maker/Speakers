import React, { useState, memo } from "react";
import { SpeakerFilterContext } from "../context/SpeakerFilterProvider";
import { useContext } from "react";
import { SpeakerContext, SpeakerProvider } from "../context/SpeakerContext";
import SpeakerDelete from "./SpeakerDelete";
import ErrorBoundary from "./ErrorBoundary";

const Session = ({ title, room }) => {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room.name}</strong>
    </span>
  );
};

const Sessions = () => {
  const { eventYear } = useContext(SpeakerFilterContext);
  const { speaker } = useContext(SpeakerContext);
  const sessions = speaker.sessions;
  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter((session) => session.eventYear === eventYear)
        .map((session) => {
          return (
            <div className="session w-100" key={session.id}>
              <Session {...session} />
            </div>
          );
        })}
    </div>
  );
};

const ImageWithFallback = ({ src, ...props }) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    if (!error) {
      setError(true);
      setImgSrc(`/images/speaker-99999.jpg`);
    }
  };
  return <img src={imgSrc} {...props} onError={onError} />;
};

const SpeakerImage = () => {
  const { speaker } = useContext(SpeakerContext);
  const { id, first, last } = speaker;
  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <ImageWithFallback
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

const SpeakerFavourite = ({ favorite, onFavoriteToggle }) => {
  const { speaker, updateRecord } = useContext(SpeakerContext);
  const [inTransition, setIntransition] = useState(false);
  const doneCallback = () => {
    setIntransition(false);
  };
  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setIntransition(true);
          updateRecord(
            {
              ...speaker,
              favorite: !speaker.favorite,
            },
            doneCallback
          );
        }}
      >
        <i
          className={
            speaker.favorite === true
              ? "fa fa-star orange"
              : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {inTransition ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
};

const SpeakerDemographics = () => {
  const { speaker } = useContext(SpeakerContext);
  console.log(speaker.first + " .. " + speaker.last);
  const { first, last, bio, company, twitterHandle } = speaker;
  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavourite />
      <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeakerNoError = memo(function Speaker({
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
  showErrorCard,
}) {
  const { showSessions } = useContext(SpeakerFilterContext);
  if (showErrorCard) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <img src="/images/speaker-99999.jpg" />
          <div>
            <b>Error Showing Speaker</b>
          </div>
        </div>
      </div>
    );
  }
  return (
    <SpeakerProvider
      speaker={speaker}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions === true ? <Sessions /> : null}
        <SpeakerDelete />
      </div>
    </SpeakerProvider>
  );
},
areEqualSpeaker);

function areEqualSpeaker(prevProps, nextProps) {
  return prevProps.speaker.favorite === nextProps.speaker.favorite;
}

const Speaker = (props) => {
  return (
    <ErrorBoundary
      errorUI={
        <SpeakerNoError {...props} showErrorCard={true}></SpeakerNoError>
      }
    >
      <SpeakerNoError {...props}></SpeakerNoError>
    </ErrorBoundary>
  );
};

export default Speaker;
