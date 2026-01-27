import React, { Suspense } from "react";
import CheckoutView from "@/modules/checkout/ui/views/checkout-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <Suspense>
      <CheckoutView tenantSlug={slug} />
    </Suspense>
  );
};

export default Page;
