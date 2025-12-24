import Product from "../../models/Product.model.js";
import { requireRole } from "../../middleware/role.middleware.js";

export const productResolvers = {
    Query: {
        getProducts: async () => {
            return Product.find().populate("createdBy", "name role");
        },

        getProduct: async (_: any, { id }: any) => {
            return Product.findById(id).populate("createdBy", "name role");
        }
    },

    Mutation: {
        createProduct: requireRole(["admin", "seller"])(
            async (_: any, { input }: any, context: any) => {
                return Product.create({
                    ...input,
                    createdBy: context.user._id
                });
            }
        ),

        updateProduct: requireRole(["admin", "seller"])(
            async (_: any, { id, input }: any, context: any) => {
                const product = await Product.findById(id);

                if (!product) throw new Error("Product not found");

                // seller can update only own products
                if (
                    context.user.role === "seller" &&
                    product.createdBy.toString() !== context.user._id.toString()
                ) {
                    throw new Error("Not allowed");
                }

                return Product.findByIdAndUpdate(id, input, { new: true });
            }
        ),

        deleteProduct: requireRole(["admin", "seller"])(
            async (_: any, { id }: any, context: any) => {
                const product = await Product.findById(id);

                if (!product) throw new Error("Product not found");

                if (
                    context.user.role === "seller" &&
                    product.createdBy.toString() !== context.user._id.toString()
                ) {
                    throw new Error("Not allowed");
                }

                await Product.findByIdAndDelete(id);
                return true;
            }
        )
    }
};