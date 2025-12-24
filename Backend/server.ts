// Backend/src/server.ts
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";

import { typeDefs, resolvers } from "./src/graphql/index.js";
import { getUserFromToken } from "./src/middleware/auth.middleware.js";

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);

// ✅ Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => ({
        message: formattedError.message,
        code: formattedError.extensions?.code,
    }),
});

await server.start();

// ✅ Middleware
app.use(
    "/graphql",
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization;
            const user = await getUserFromToken(authHeader);
            return { user };
        },
    })
);

// ✅ Database Connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    });

// ✅ Start Server
httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL Server running on http://localhost:${PORT}/graphql`);
});

// ✅ Graceful Shutdown
const shutdown = async () => {
    console.log("🛑 Shutting down server...");
    await server.stop();
    await mongoose.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
