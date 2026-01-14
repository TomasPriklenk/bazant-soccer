"use client";

import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/game`,
      },
    });
  };

  return (
    <main style={{ color: "white", padding: 40 }}>
      <h1>Bazant Soccer</h1>

      <button
        onClick={signInWithGoogle}
        style={{ marginTop: 20, fontSize: 18 }}
      >
        Přihlásit se přes Google
      </button>
    </main>
  );
}
