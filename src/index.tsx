import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { App } from "app";
import { AuthProvider } from "context";
import { GlobalStyles } from "styles";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>myMoney</title>
        </Helmet>
        <GlobalStyles />
        <App />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
