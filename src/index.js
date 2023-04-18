import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
   <React.StrictMode>
      <AuthContextProvider>
         <ThemeProvider>
            <HelmetProvider>
               <Helmet>
                  <meta charSet="utf-8" />
                  <title>myMoney</title>
               </Helmet>
               <App />
            </HelmetProvider>
         </ThemeProvider>
      </AuthContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
