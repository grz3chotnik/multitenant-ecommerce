"use client";

import { useTRPC } from "@/trpc/client";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { toast } from "sonner";
import { generateTenantUrl } from "@/lib/utils";
import { CheckoutItem } from "@/modules/checkout/ui/components/checkout-item";
import { CheckoutSidebar } from "@/modules/checkout/ui/components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutStates } from "@/modules/checkout/hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface CheckoutViewProps {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();

  const { productIds, clearCart, removeProduct } = useCart(tenantSlug);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds }),
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancel: false });
      },
      onSuccess: (data) => {
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          //TODO: modify when subdomains enabled
          router.push("/sign-in");
        }
        toast.error(error.message);
      },
    }),
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      router.push("/library");

      queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());
    }
  }, [
    states.success,
    clearCart,
    router,
    setStates,
    queryClient,
    trpc.library.getMany,
  ]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <LoaderIcon className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <InboxIcon />
          <p>No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() =>
              purchase.mutate({
                tenantSlug,
                productIds,
              })
            }
            isCancelled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
