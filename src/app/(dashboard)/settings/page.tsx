import { auth } from "@/lib/auth"
import { Header } from "@/components/dashboard/header"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { PasswordForm } from "@/components/dashboard/password-form"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <Header user={session.user} title="Settings" />

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProfileForm user={session.user} />
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}
