"use client";

import { supabase } from "./lib/supabase";

export default function Home() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">Bazanťák ⚽</h1>
        <p>Přihlas se Google účtem a hraj</p>
        <button
          onClick={signIn}
          className="rounded bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200"
        >
          Přihlásit se Googlem
        </button>
      </div>
    </div>
  );
}
