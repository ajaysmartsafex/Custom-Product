import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { store } from "./app/store";
import { apolloClient } from "./lib/apolloClient";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);
