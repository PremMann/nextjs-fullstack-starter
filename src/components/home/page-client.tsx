"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Database, Lock, Zap, Shield, Code, Users } from "lucide-react";
import "@/lib/i18n"; // Import your configuration

// Define the session type locally or import from your auth types
type Session = {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
} | null;

export default function PageClient({ session }: { session: Session }) {
    const { t, i18n } = useTranslation("homepage");

    // Helper to toggle language
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "kh" : "en");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Next.js Fullstack Starter</h1>
                    <div className="flex gap-2 items-center">
                        {/* Language Switcher Button */}
                        <Button variant="outline" size="sm" onClick={toggleLanguage}>
                            {i18n.language === "en" ? "KH" : "EN"}
                        </Button>

                        <ThemeToggle />
                        {session ? (
                            <Button asChild>
                                <Link href="/dashboard">{t('dashboard')}</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">{t('login')}</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">{t('register')}</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-5xl font-bold mb-6">{t('hero.title')}</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {t('hero.description')}
                </p>
                <div className="flex gap-4 justify-center">
                    {session ? (
                        <Button size="lg" asChild>
                            <Link href="/dashboard">{t('hero.go_to_dashboard')}</Link>
                        </Button>
                    ) : (
                        <>
                            <Button size="lg" asChild>
                                <Link href="/register">{t('hero.get_started')}</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/login">{t('hero.sign_in')}</Link>
                            </Button>
                        </>
                    )}
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-20">
                <h3 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Lock className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.auth_title')}
                        desc={t('features.auth_desc')}
                    />
                    <FeatureCard
                        icon={<Database className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.db_title')}
                        desc={t('features.db_desc')}
                    />
                    <FeatureCard
                        icon={<Zap className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.actions_title')}
                        desc={t('features.actions_desc')}
                    />
                    <FeatureCard
                        icon={<Shield className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.security_title')}
                        desc={t('features.security_desc')}
                    />
                    <FeatureCard
                        icon={<Code className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.ui_title')}
                        desc={t('features.ui_desc')}
                    />
                    <FeatureCard
                        icon={<Users className="h-10 w-10 mb-2 text-primary" />}
                        title={t('features.users_title')}
                        desc={t('features.users_desc')}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl">{t('cta.title')}</CardTitle>
                        <CardDescription className="text-lg">
                            {t('cta.description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {session ? (
                            <Button size="lg" asChild>
                                <Link href="/dashboard">{t('hero.go_to_dashboard')}</Link>
                            </Button>
                        ) : (
                            <div className="flex gap-4 justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">{t('cta.sign_up_free')}</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/login">{t('hero.sign_in')}</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t mt-20">
                <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
                    <p>© 2024 Next.js Fullstack Starter. Built with Next.js 15.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <Card>
            <CardHeader>
                {icon}
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
        </Card>
    );
}