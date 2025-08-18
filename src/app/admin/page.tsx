'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { FileText, Newspaper, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <div className="container mx-auto max-w-4xl py-16 px-4">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
                {user && (
                    <p className="text-lg text-muted-foreground mt-2">
                        Welcome, {user.email}
                    </p>
                )}
                 <Button onClick={handleLogout} variant="outline" className="mt-4">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
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
