import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
    return (
        <div className="max-w-xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-2">Contact</h1>
            <p className="text-muted-foreground mb-10">
                Have questions? We&apos;d love to hear from you.
            </p>
            <Card>
                <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        <span className="font-medium text-foreground">Email:</span>{" "}
                        support@example.com
                    </p>
                    <p>
                        <span className="font-medium text-foreground">Response time:</span>{" "}
                        Within 24 hours
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
