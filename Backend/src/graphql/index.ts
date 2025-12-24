import { authTypeDefs } from "./typeDefs/auth.typeDefs.js";
import { productTypeDefs } from "./typeDefs/product.typeDefs.js";

import { authResolvers } from "./resolvers/auth.resolver.js";
import { productResolvers } from "./resolvers/product.resolver.js";

export const typeDefs = [authTypeDefs, productTypeDefs];
export const resolvers = [authResolvers, productResolvers];