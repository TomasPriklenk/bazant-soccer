"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RequireLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setLoggedIn(true);
      }
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return <div style={{ color: "white" }}>Načítání…</div>;
  }

  if (!loggedIn) {
    return (
      <div
        style={{
          marginTop: 40,
          padding: 30,
          border: "2px dashed #00ff66",
          borderRadius: 12,
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>🔒 Pro hraní se musíš přihlásit</h2>
        <p>Bez účtu nemůžeš spravovat tým, obchod ani ligy.</p>
        <a
          href="/"
          style={{
            marginTop: 20,
            display: "inline-block",
            color: "#00ff66",
            fontWeight: "bold",
          }}
        >
          👉 Přihlásit se
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
