import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ToastHandler from "app/toast-handler";

import { useAuthContext } from "context";

import { RedirectPaths as P } from "models";

import { Categories, Home, Inspiration, Login, Signup, UpdateProfile } from "pages";
import { withNavbar } from "components";

import { StyledContainer } from "./styled";

const WrappedUpdateProfile = withNavbar(UpdateProfile);
const WrappedCategories = withNavbar(Categories);
const WrappedHome = withNavbar(Home);

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div>
      <StyledContainer>
        {authIsReady && (
          <BrowserRouter>
            <Switch>
              <Route exact path={P.HOME}>
                {!user && <Redirect to={P.LOGIN} />}
                {user && <WrappedHome />}
              </Route>
              <Route path={P.CATEGORIES}>
                {!user && <Redirect to={P.LOGIN} />}
                {user && <WrappedCategories />}
              </Route>
              <Route path={P.UPDATE_PROFILE}>
                {!user && <Redirect to={P.LOGIN} />}
                {user && <WrappedUpdateProfile />}
              </Route>
              <Route path={P.LOGIN}>
                {user && <Redirect to={P.HOME} />}
                {!user && <Login />}
              </Route>
              <Route path={P.SIGNUP}>
                {user && <Redirect to={P.HOME} />}
                {!user && <Signup />}
              </Route>
              <Route path={P.INSPIRATION}>
                <Inspiration />
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </StyledContainer>
      <ToastHandler />
    </div>
  );
};

export default App;
