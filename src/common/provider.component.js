import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";

// Save state to react context
export const Context = createContext();

const Provider = ({ children, client }) => {
  const [isFetch, setIsFetch] = useState(false);

  // define provider object to be passed in react context
  const providerData = {
    state: {
      isFetch,
    },
    action: {
      setIsFetch,
    },
  };

  // Render children component wrapped in apollo provider so we can use graphql query and mutation in func component
  return (
    <ApolloProvider client={client}>
      <Context.Provider value={providerData}>
        <div>{children}</div>
      </Context.Provider>
    </ApolloProvider>
  );
};

// Define props requirement
Provider.propTypes = {
  children: PropTypes.any.isRequired,
  client: PropTypes.any.isRequired,
};

export default Provider;
