import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Inspiration from './pages/inspiration/Inspiration';
import UpdateProfile from './pages/updateProfile/UpdateProfile';

function App() {
   const { authIsReady, user } = useAuthContext();

   return (
      <div className="App">
         {authIsReady && (
            <BrowserRouter>
               <Navbar />
               <Switch>
                  <Route exact path="/">
                     {!user && <Redirect to="/login" />}
                     {user && <Home />}
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
                  <Route path="/updateProfile">
                     {!user && <Redirect to="/login" />}
                     {user && <UpdateProfile />}
                  </Route>
               </Switch>
            </BrowserRouter>
         )}
      </div>
   );
}

export default App
