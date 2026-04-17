"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 bg-primary/20 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground animate-none">Loading Admin Dashboard...</p>
      </div>
    </div>
  );
}
