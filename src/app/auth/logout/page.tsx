"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        // Call the logout API to clear the cookie
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Redirect to home page regardless of API call result
        router.push("/");
      }
    }

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-indigo-600 font-medium">Logging out...</p>
      </div>
    </div>
  );
}

