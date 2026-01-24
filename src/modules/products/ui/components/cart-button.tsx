import React from "react";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId }: CartButtonProps) => {
  const cart = useCart(tenantSlug);
  return (
    <Button
      variant="elevated"
      className={cn("flex-1 bg-pink-400 ", cart.isProductInCart(productId) && "bg-white")}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

