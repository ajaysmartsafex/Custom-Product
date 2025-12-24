import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { typeDefs, resolvers } from "./src/graphql/index.js";
import { getUserFromToken } from "./src/middleware/auth.middleware.js";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async (ctx) => {
            // 🔥 CODEGEN SAFETY
            if (!ctx || !ctx.req) {
                return { user: null };
            }

            const authHeader = ctx.req.headers?.authorization;
            const token = authHeader?.replace("Bearer ", "");

            const user = await getUserFromToken(token);

            return { user };
        },
    })
);


app.listen(8080, () => {
    console.log("🚀 GraphQL Server running on http://localhost:8080/graphql");
});
