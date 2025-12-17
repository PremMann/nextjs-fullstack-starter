import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Header } from "@/components/dashboard/header"
import { UserTable } from "@/components/dashboard/user-table"
import { getUsersAction } from "@/actions/user.actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function UsersPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Check if user has permission
  if (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR") {
    return (
      <div className="flex flex-col h-full">
        <Header user={session.user} title="Users" />
        <div className="flex-1 p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don&apos;t have permission to access this page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const result = await getUsersAction(1, 100)

  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col h-full">
        <Header user={session.user} title="Users" />
        <div className="flex-1 p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {result.error || "Failed to load users"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Header user={session.user} title="Users" />

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage users and their roles
          </p>
        </div>

        <UserTable
          users={result.data.data}
          currentUserId={session.user.id || ""}
          currentUserRole={session.user.role || "USER"}
        />
      </div>
    </div>
  )
}
