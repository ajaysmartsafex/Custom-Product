import { GraphQLError } from "graphql";

export const requireRole = (allowedRoles: string[]) => {
    return (resolver: any) => {
        return (
            parent: any,
            args: any,
            context: { user?: any },
            info: any
        ) => {
            // 🔑 Allow introspection & public resolvers
            if (!context || !context.user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "UNAUTHENTICATED" },
                });
            }

            if (!allowedRoles.includes(context.user.role)) {
                throw new GraphQLError("Not authorized", {
                    extensions: { code: "FORBIDDEN" },
                });
            }

            return resolver(parent, args, context, info);
        };
    };
};

