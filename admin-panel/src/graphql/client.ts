// admin-panel/src/graphql/client.ts

// admin-panel/src/graphql/client.ts

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql",
});

const authLink = new SetContextLink((prevContext) => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


