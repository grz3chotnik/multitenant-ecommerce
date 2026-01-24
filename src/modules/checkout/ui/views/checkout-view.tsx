"use client ";
import React from "react";

interface CheckoutViewProps {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  return <div>{tenantSlug}</div>;
};

export default CheckoutView;
