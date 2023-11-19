import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import Categories from '../pages/categories/categories';
import Home from '../pages/home/Home';
import Inspiration from '../pages/inspiration/Inspiration';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import UpdateProfile from '../pages/updateProfile/UpdateProfile';
import Wrapper from './Wrapper';

function App() {
   const { authIsReady, user } = useAuthContext();

   return (
      <div className="App">
         {authIsReady && (
            <BrowserRouter>
               <Switch>
                  <Route exact path="/">
                     {!user && <Redirect to="/login" />}
                     {user &&
                        <Wrapper>
                           <Home />
                        </Wrapper>
                     }
                  </Route>
                  <Route path="/categories">
                     {!user && <Redirect to="/login" />}
                     {user &&
                        <Wrapper>
                           <Categories />
                        </Wrapper>
                     }
                  </Route>
                  <Route path="/updateProfile">
                     {!user && <Redirect to="/login" />}
                     {user &&
                        <Wrapper>
                           <UpdateProfile />
                        </Wrapper>
                     }
                  </Route>
                  <Route path="/login">
                     {user && <Redirect to="/" />}
                     {!user && <Login />}
                  </Route>
                  <Route path="/signup">
                     {user && <Redirect to="/" />}
                     {!user && <Signup />}
                  </Route>
                  <Route path='/inspiration' >
                     <Inspiration />
                  </Route>
               </Switch>
            </BrowserRouter>
         )}
      </div>
   );
}

export default App
