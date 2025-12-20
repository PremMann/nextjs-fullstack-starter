import { auth } from "@/lib/auth"
import PageClient from "@/components/home/page-client";

export default async function HomePage() {
  const session = await auth()

  return <PageClient session={session} />
}