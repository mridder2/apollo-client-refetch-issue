import React from "react";
import "./App.css";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ReproductionComponent from "./ReproductionComponent";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000",
    fetch
  }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <ReproductionComponent />
      </ApolloProvider>
    </div>
  );
}

export default App;
