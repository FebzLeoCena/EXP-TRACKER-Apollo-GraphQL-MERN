import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GridBackground from "./components/GridBackground.jsx";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  //TODO =>Update the URI on production
  uri: "http://localhost:4000/graphql", // URL of the graphql server
  cache: new InMemoryCache(), //Apollo client uses cache query results after fetching them from server
  credentials: "include", // this tells apollo client to send cookies along with every request to the server
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>
);
