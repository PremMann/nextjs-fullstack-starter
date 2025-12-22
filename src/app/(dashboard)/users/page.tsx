import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Header } from "@/components/dashboard/header"
import { UserTable } from "@/components/dashboard/user-table"
import { getUsersAction } from "@/actions/user.actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import { UsersToolbar } from "@/components/dashboard/users-toolbar";

type UsersPageProps = {
  searchParams?: Promise<{
    search?: string
    role?: string
    page?: string
    limit?: string
  }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
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

  const sp = await searchParams

  const search = (sp?.search ?? "").trim()
  const role = (sp?.role ?? "").trim()
  const page = Math.max(1, Number(sp?.page ?? "1") || 1)
  const limit = Math.min(100, Math.max(1, Number(sp?.limit ?? "20") || 20))

  const result = await getUsersAction(page, limit, search, role || undefined)

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

        <UsersToolbar
          initialSearch={search}
          initialRole={role}
          initialLimit={limit}
        />

        <UserTable
          users={result.data.data}
          currentUserId={session.user.id || ""}
          currentUserRole={session.user.role || "USER"}
          page={result.data.pagination.page}
          totalPages={result.data.pagination.totalPages}
          limit={result.data.pagination.limit}
          total={result.data.pagination.total}
        />
      </div>
    </div>
  )
}
