import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Media, Tenant } from "@/payload-types";
import { z } from "zod";

export const checkoutRouter = createTRPCRouter({
  getProducts: baseProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {


      const data = await ctx.db.find({
        collection: "products",
        depth: 2, //populate "category and "image"
        where: {id: {
          in: input.ids
          }}
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
