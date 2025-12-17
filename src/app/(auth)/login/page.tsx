import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <LoginForm />
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Button variant="link" asChild className="p-0">
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
      <div className="text-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">← Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
