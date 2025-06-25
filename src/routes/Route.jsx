import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Errorpage from "../components/Errorpage";
const Home = lazy(() => import("./Home"));
const Explore = lazy(() => import("./Explore"));
const Tips = lazy(() => import("./Tips"));
const Tip = lazy(() => import("./Tip"));
const Mytips = lazy(() => import("./Mytips"));
const Register = lazy(() => import("./Register"));
const Login = lazy(() => import("./Login"));
const Sharetips = lazy(() => import("./Sharetips"));
const Updatetip = lazy(() => import("./Updatetip"));
import Loading_spinner from "../components/Loading_spinner";
import Privateroute from "../components/Privateroute";

const withSuspense = (Component) => () =>
  (
    <Suspense fallback={<Loading_spinner />}>
      <Component />
    </Suspense>
  );

// Wrap private routes with Privateroute
const withPrivate = (Component) => () =>
  (
    <Privateroute>
      <Suspense fallback={<Loading_spinner />}>
        <Component />
      </Suspense>
    </Privateroute>
  );

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        Component: withSuspense(Home),
      },
      { path: "/explore", Component: withSuspense(Explore) },
      { path: "/tips", Component: withSuspense(Tips) },
      { path: "/tips/:id", Component: withSuspense(Tip) },
      { path: "/mytips", Component: withPrivate(Mytips) },      
      { path: "/signup", Component: withSuspense(Register) },
      { path: "/login", Component: withSuspense(Login) },
      { path: "/updatetip/:id", Component: withSuspense(Updatetip) },
      { path: "/sharetips", Component: withPrivate(Sharetips) }, 
    ],
  },
]);
