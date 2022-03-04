import Header from "./Header";
import Layout from "./Layout";
import Speakers from "./Speakers";
import AuthProvider from "../context/AuthContext";

const App = () => {
  return (
    <AuthProvider initialLoggedInUser="Ramesh">
      <Layout initialTheme="light">
        <div>
          <Header />
          <Speakers />
        </div>
      </Layout>
    </AuthProvider>
  );
};

export default App;
