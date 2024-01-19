import LoginComponent from "@/components/LoginComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardComponent from "@/components/DashboardComponent";

export default async function Home() {

  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect("/")
  }
  return (
    <main className="min-h-screen">
      <DashboardComponent />
    </main>
  )
}
