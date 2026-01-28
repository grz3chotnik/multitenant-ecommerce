import React from "react";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate } from "@tanstack/query-core";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { HydrationBoundary } from "@tanstack/react-query";

interface PageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}
export const dynamic = "force-dynamic"

const Page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};

export default Page;
