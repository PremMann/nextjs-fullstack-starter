import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const errorMessage = searchParams.error || "An authentication error occurred"

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <CardTitle>Authentication Error</CardTitle>
        <CardDescription>{errorMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild className="w-full">
          <Link href="/login">Back to Login</Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/">Go Home</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
