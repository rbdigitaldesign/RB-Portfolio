'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { FileText, Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-4xl py-16 px-4">
            <header className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
                {user && (
                    <p className="text-lg text-muted-foreground mt-2">
                        Welcome, {user.email}
                    </p>
                )}
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Newspaper />
                            Manage Blog Posts
                        </CardTitle>
                        <CardDescription>
                            Create, edit, and delete blog posts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/admin/blog">Go to Blog Posts</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <FileText />
                            Manage Projects
                        </CardTitle>
                        <CardDescription>
                            Edit project details and case studies. (Coming soon)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button disabled>Go to Projects</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
