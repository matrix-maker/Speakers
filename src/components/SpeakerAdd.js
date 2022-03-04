import React from "react";
import withAuth from "./withAuth";

const SpeakerAdd = ({ eventYear, insertRecord, loggedInUser }) => {
  if (!loggedInUser || loggedInUser.length === 0) return null;
  return (
    <a href="#" className="addSes">
      <i
        onClick={(event) => {
          event.preventDefault();
          const name = window.prompt("Enter the First and Last Name: ", "");
          const nameArray = name.split(" ");
          insertRecord({
            id: "99999",
            first: nameArray[0],
            last: nameArray[1],
            company: "Not yet updated",
            bio: "Not yet updated",
            twitterHandle: "Not yet updated",
            favorite: false,
            sessions: [
              {
                id: "12321",
                title: `New Session for ${nameArray[0]}`,
                eventYear: eventYear,
                room: {
                  name: "Not yet updated",
                  capacity: 0,
                },
              },
            ],
          });
        }}
      >
        +
      </i>
    </a>
  );
};

export default withAuth(SpeakerAdd);
