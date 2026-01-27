import {  getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { dehydrate } from "@tanstack/query-core";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  console.log(JSON.stringify(filters), "this is from rsc");
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        limit: DEFAULT_LIMIT,
      }),
  );

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView  />
      </HydrationBoundary>
  );
};

export default Page;
