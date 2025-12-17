import { auth } from "@/lib/auth"
import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, Activity } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  // Get stats
  const [totalUsers, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ])

  return (
    <div className="flex flex-col h-full">
      <Header user={session.user} title="Dashboard" />

      <div className="flex-1 p-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {session.user.name}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your application today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
          />
          <StatsCard
            title="Your Role"
            value={session.user.role || "USER"}
            icon={Shield}
          />
          <StatsCard
            title="Status"
            value="Active"
            icon={Activity}
          />
        </div>

        {/* Recent Users Card */}
        {(session.user.role === "ADMIN" || session.user.role === "MODERATOR") && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{user.name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Getting Started Card */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Quick links to help you get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              • Update your profile in the Settings page
            </p>
            {(session.user.role === "ADMIN" || session.user.role === "MODERATOR") && (
              <p className="text-sm">
                • Manage users in the Users page
              </p>
            )}
            <p className="text-sm">
              • Toggle between light and dark themes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
