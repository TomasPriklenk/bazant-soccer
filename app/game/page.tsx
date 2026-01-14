"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function GameMenuPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // kontrola přihlášení
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        // nepřihlášen → zpět na homepage / login
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div style={styles.loading}>
        Načítání…
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Herní menu</h1>

      <button style={styles.button} onClick={() => router.push("/team")}>
        ⚽ Tým
      </button>

      <button style={styles.button} onClick={() => router.push("/obchod")}>
        🛒 Obchod
      </button>
    </div>
  );
}

/* ===== STYLY ===== */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  button: {
    width: "240px",
    padding: "16px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "2px solid #00ff66",
    background: "#0a3d1c",
    color: "#00ff66",
    cursor: "pointer",
  },
  loading: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
