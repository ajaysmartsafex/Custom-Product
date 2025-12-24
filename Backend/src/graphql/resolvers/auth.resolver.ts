import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import User from "../../models/User.model.js";
import { generateToken } from "../../utils/generateToken.js";
import { requireRole } from "../../middleware/role.middleware.js";

export const authResolvers = {
    Query: {
        // 🔐 Authenticated user only
        me: (_: any, __: any, context: any) => {
            if (!context?.user) {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "UNAUTHENTICATED" },
                });
            }
            return context.user;
        },
    },

    Mutation: {
        // ✅ PUBLIC (User/Seller only)
        register: async (_: any, args: any) => {
            const { email, password, role = "USER" } = args;

            // 🚫 Prevent ADMIN self-registration
            if (role === "ADMIN") {
                throw new GraphQLError("Admin registration not allowed", {
                    extensions: { code: "FORBIDDEN" },
                });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new GraphQLError("Email already registered", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                ...args,
                role,
                password: hashedPassword,
            });

            return {
                token: generateToken(user),
                user,
            };
        },

        // 🔑 PUBLIC
        login: async (_: any, { email, password }: any) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new GraphQLError("Invalid credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            if (!user.password) {
                throw new GraphQLError("Invalid credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new GraphQLError("Invalid credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            return {
                token: generateToken(user),
                user,
            };
        },

        // // 🔐 ADMIN-ONLY (example)
        // createSeller: requireRole(["ADMIN"])(async (_: any, args: any) => {
        //     const hashedPassword = await bcrypt.hash(args.password, 10);

        //     const user = await User.create({
        //         ...args,
        //         role: "SELLER",
        //         password: hashedPassword,
        //     });

        //     return {
        //         token: generateToken(user),
        //         user,
        //     };
        // }),
    },
};
