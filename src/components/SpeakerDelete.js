import { useContext } from "react";
import { SpeakerContext } from "../context/SpeakerContext";

const SpeakerDelete = () => {
  const { speaker, deleteRecord } = useContext(SpeakerContext);
  return (
    <span className="session w-100">
      <a href="#" className="remSes">
        <i
          onClick={(event) => {
            event.preventDefault();
            if (window.confirm("Are you sure want to delete the Speaker?")) {
              deleteRecord(speaker);
            }
          }}
        >
          -
        </i>
      </a>
      <span className="padL2">Delete Speaker</span>
    </span>
  );
};

export default SpeakerDelete;
