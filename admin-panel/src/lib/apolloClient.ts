import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8080/graphql", // backend graphql URL
    }),
    cache: new InMemoryCache(),
});
