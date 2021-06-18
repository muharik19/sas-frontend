import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import _get from "lodash/get";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";

//Local config
import Config from "./config";

//Local library
import { getToken, removeToken } from "../lib/auth";
import { Error } from "../lib/alert";

// Get GraphQL results over a network using HTTP fetch
const linkHttp = createHttpLink({
  fetch,
  uri: Config.GraphQlHost,
});

// setContext function takes a function that returns either an object or a promise that returns an object to set the new context of a request
const authLink = setContext((_, { headers }) => {
  // get the authentication token from Store if exists
  const token = getToken();

  //return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Basic ${token}` : "",
      "x-token": token ? `${token}` : "",
    },
  };
});

// Handle and inspect errors in your GraphQL network stack
const linkError = onError(({ graphQlErrors, networkError }) => {
  if (graphQlErrors) {
    // listen to server response and give notif swal if error from server only
    const error = _get(graphQlErrors, "0.message");
    Error(error);

    if (error === "Anda tidak memiliki otorisasi") {
      Error("Sesi anda telah berakhir, lakukan login kembali").then(() => {
        removeToken();
        //render back to login
        window.location.href = "/";
      });
    }

    graphQlErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    // listen to network error and give notif swal if error from network only
    Error(networkError);
    console.log(`[Network error]: ${networkError}`);
  }
});

// Export a HOC from next-with-apollo
export default withApollo(
  // You can get headers and context from the callback params
  // e.g. ({headers, ctx, initialState})
  ({ initialState }) =>
    new ApolloClient({
      link: authLink.concat(linkError).concat(linkHttp),
      cache: new InMemoryCache()
        // rehydrate the cache using the initial data passed from the server
        .restore(initialState || {}),
    }),
);
