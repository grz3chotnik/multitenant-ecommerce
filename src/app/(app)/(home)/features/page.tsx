import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        title: "Multi-Tenant Storefronts",
        description: "Each seller gets their own customizable storefront with a unique subdomain.",
    },
    {
        title: "Secure Payments",
        description: "Integrated Stripe payments with automatic payouts to sellers.",
    },
    {
        title: "Product Management",
        description: "Easy-to-use dashboard for managing products, inventory, and orders.",
    },
    {
        title: "Advanced Search",
        description: "Powerful filtering and search to help customers find exactly what they need.",
    },
];

const Page = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-2">Features</h1>
            <p className="text-muted-foreground mb-10">
                Everything you need to run your online store.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature) => (
                    <Card key={feature.title}>
                        <CardHeader>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Page;
