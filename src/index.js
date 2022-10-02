import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
   <React.StrictMode>
      <AuthContextProvider>
         <HelmetProvider>
            <Helmet>
               <meta charSet="utf-8" />
               <title>myMoney</title>
            </Helmet>
            <App />
         </HelmetProvider>
      </AuthContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
