import Speaker from "./Speaker";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import ReactPlaceholder from "react-placeholder/lib";
import { data } from "../../SpeakerData";
import { useContext } from "react";
import { SpeakerFilterContext } from "../context/SpeakerFilterProvider";
import SpeakerAdd from "./SpeakerAdd";

const SpeakersList = () => {
  const {
    insertRecord,
    deleteRecord,
    updateRecord,
    requestStatus,
    error,
    data: speakersData,
  } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE)
    return (
      <div className="text-danger">
        ERROR <b>Loading speakerdata failed {error}</b>
      </div>
    );

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        row={30}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakersData
            .filter((speaker) => {
              return (
                speaker.first
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .filter((speaker) => {
              return speaker.sessions.find((session) => {
                return session.eventYear === eventYear;
              });
            })
            .map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceholder>
    </div>
  );
};

export default SpeakersList;
