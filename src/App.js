import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShareScreen from "./screens/sharescreen/ShareScreen";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import CreateCoverScreen from "./screens/CreateCover/CreateCoverScreen";
import SignInScreen from "./screens/AuthScreens/SignInScreen";
import SignUpScreen from "./screens/AuthScreens/SignUpScreen";
import { useEffect } from "react";
import ForgotPasswordScreen from "./screens/AuthScreens/ForgotPasswordScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import NavBarComp from "./components/NavBarComp";
import { PageNotFound } from "./assets";
// import CoverBook from "./screens/CoverBook";
import Coverbook from "./screens/Coverbook/Coverbook";
import ProfileScreen from "./screens/ProfileScreen";
import InsightsScreen from "./screens/InsightsScreen";
import PackagesPricingScreen from "./screens/Packages/PackagesPricingScreen";
import InvitedUserSetPaswrdScreen from "./screens/AuthScreens/InvitedUserSetPaswrdScreen";

const AfterLoggedInRouting = () => {
  const state = useSelector((state) => state.UserReducer);
  const history = useHistory();
  useEffect(() => {
    if (!state.isUserLogin) {
      history.push("/");
    }
  }, []);
  return (
    <>
      <Route path="/dashboard">
        <NavBarComp />
        <Dashboard />
      </Route>
      <Route path="/edit-cover/:cover_id">
        <CreateCoverScreen />
      </Route>
      <Route path="/coverbook/:cover_id">
        <Coverbook />
      </Route>
      <Route path="/share/:cover_id">
        <NavBarComp />
        <ShareScreen />
      </Route>
      <Route path="/profile">
        <NavBarComp />
        <ProfileScreen />
      </Route>
      <Route path="/insights">
        <NavBarComp />
        <InsightsScreen />
      </Route>
      <Route path="/packages">
        <NavBarComp />
        <PackagesPricingScreen />
      </Route>
      {/* <Route path="*" component={NotFound} /> */}
    </>
  );
};

const RoutingContainer = () => {
  const state = useSelector((state) => state.UserReducer);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignInScreen />
          </Route>
          <Route path="/signup">
            <SignUpScreen />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordScreen />
          </Route>
          <Route path="/coverbook/:cover_id">
            <Coverbook />
          </Route>
          <Route path="/invited-user/:verify_id">
            <InvitedUserSetPaswrdScreen />
          </Route>
          {state.isUserLogin ? <AfterLoggedInRouting /> : <Redirect to="/" />}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        enableMultiContainer
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutingContainer />
        </PersistGate>
      </Provider>
    </>
  );
}

const NotFound = () => {
  return (
    <main className="h-100 d-flex justify-content-center align-items-center">
      <img src={PageNotFound} style={{ width: "auto", height: "100%" }} />
    </main>
  );
};

export default App;
