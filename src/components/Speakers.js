import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import { SpeakerFilterProvider } from "../context/SpeakerFilterProvider";

const Speakers = () => {
  return (
    <SpeakerFilterProvider startingShowSessions={false}>
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterProvider>
  );
};

export default Speakers;
