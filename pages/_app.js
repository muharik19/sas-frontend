import React, { useEffect } from "react";
import Router from "next/router";
import NoSSR from "react-no-ssr";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import jwtDecode from "jwt-decode";

// Local library
import { getToken, removeToken } from "../src/lib/auth";
import withData from "../src/config/apollo";
import Provider from "../src/common/provider.component";

// Local styles
import "../styles/globals.css";

function MyApp({ Component, pageProps, apollo }) {
  useEffect(() => {
    //Current url
    const { pathname } = window.location;
    //Check user token is valid?
    const checkAuth = (path) => {
      // Return true if path is /
      const isNotAuthorizedPage = path === "/";

      let token = getToken();

      // Save token from server to local Store
      try {
        jwtDecode(token);
      } catch (error) {
        token = null;
        removeToken();
      }

      // Render to / if token empty
      if (_isEmpty(token) && !isNotAuthorizedPage) {
        Router.push({ pathname: "/" });
      }

      // Render to /home if token not empty
      if (!_isEmpty(token)) {
        if (path === "/" || path === "") {
          Router.push({ pathname: "/home" });
        }
      }
    };

    // Listen to every url chnages access and check auth token
    const routeChange = (url) => checkAuth(url);
    Router.events.on("routeChangeStart", routeChange);
    Router.events.on("hashChangeStart", routeChange);

    // Listen to current url access and check auth token
    checkAuth(pathname);
  }, []);
  return (
    <NoSSR>
      <Provider client={apollo}>
        <Component {...pageProps} />
      </Provider>
    </NoSSR>
  );
}

// Wrap our main app to apollo client so they listen to every request
export default withData(MyApp);
