"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/");
      } else {
        setReady(true);
      }
    };

    checkUser();
  }, [router]);

  if (!ready) {
    return <div style={{ color: "white" }}>Načítám…</div>;
  }

  return <>{children}</>;
}
