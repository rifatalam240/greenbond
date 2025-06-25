import { Outlet, useNavigation } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading_spinner from "../components/Loading_spinner";
import TipsProvider from "../context/TipsContext";
import AuthProvider from "../context/Authcontext";

const Root = () => {
  const data = useNavigation();
  return (
    <div className="px-4 md:px-10 lg:px-20 mx-auto space-y-4">
      <AuthProvider>
        <TipsProvider>
          <div>
            <Navbar />

            {data.state === "loading" ? <Loading_spinner /> : <Outlet />}
            <Footer />
          </div>
        </TipsProvider>
      </AuthProvider>
    </div>
  );
};

export default Root;
