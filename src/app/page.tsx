import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { auth } from "@/lib/auth"
import { Database, Lock, Zap, Shield, Code, Users } from "lucide-react"

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Next.js Fullstack Starter</h1>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            {session ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Build Fullstack Apps Faster
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A complete Next.js 15 starter template with authentication, database,
          server actions, and beautiful UI components. Start building immediately.
        </p>
        <div className="flex gap-4 justify-center">
          {session ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Complete auth system with NextAuth.js, including login, registration,
                and role-based access control.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Database</CardTitle>
              <CardDescription>
                Prisma ORM with PostgreSQL support. Migrations, seeding, and
                type-safe database access out of the box.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Server Actions</CardTitle>
              <CardDescription>
                Type-safe server actions for data mutations. No API routes needed
                for most operations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Built-in security with bcrypt password hashing, CSRF protection,
                and secure session management.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>UI Components</CardTitle>
              <CardDescription>
                Beautiful Shadcn UI components with Tailwind CSS. Dark mode
                support included.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete user management dashboard with role assignment and
                admin controls.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Create your account now and start building your next project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {session ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">Sign Up Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
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
  )
}
