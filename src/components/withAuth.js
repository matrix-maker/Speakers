import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const withAuth = (Component) => {
  return (props) => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    return (
      <Component
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        {...props}
      ></Component>
    );
  };
};

export default withAuth;