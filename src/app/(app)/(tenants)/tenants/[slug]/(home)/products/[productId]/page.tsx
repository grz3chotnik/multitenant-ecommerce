import React, { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/query-core";
import ProductView, {ProductViewSkeleton} from "@/modules/products/ui/views/product-view";

interface PageProps {
  params: Promise<{ productId: string; slug: string }>;
}
export const dynamic = "force-dynamic"

const Page = async ({ params }: PageProps) => {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton /> } >
        <ProductView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
