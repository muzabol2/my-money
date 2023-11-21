import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Wrapper } from "components";
import { useAuthContext } from "hooks";
import {
  Categories,
  Home,
  Inspiration,
  Login,
  Signup,
  UpdateProfile,
} from "pages";
import { RedirectPaths as P } from "enums";

import { StyledContainer } from "./styled";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <StyledContainer>
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path={P.HOME}>
              {!user && <Redirect to={P.LOGIN} />}
              {user && (
                <Wrapper>
                  <Home />
                </Wrapper>
              )}
            </Route>
            <Route path={P.CATEGORIES}>
              {!user && <Redirect to={P.LOGIN} />}
              {user && (
                <Wrapper>
                  <Categories />
                </Wrapper>
              )}
            </Route>
            <Route path={P.UPDATE_PROFILE}>
              {!user && <Redirect to={P.LOGIN} />}
              {user && (
                <Wrapper>
                  <UpdateProfile />
                </Wrapper>
              )}
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
  );
}

export default App;
