import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Inspiration from './pages/inspiration/Inspiration';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import Categories from './pages/categories/categories';
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
