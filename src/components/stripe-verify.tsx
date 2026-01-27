import React from "react";
import { Button, Link } from "@payloadcms/ui";

interface StripeVerifyProps {}

export const StripeVerify = () => {
  return (
    <Link href="/stripe-verify">
      <Button>Verify account</Button>
    </Link>
  );
};

