"use client";

import AuthGuard from "../components/AuthGuard";
import Link from "next/link";

export default function GamePage() {
  return (
    <AuthGuard>
      <div style={{ color: "white", padding: 40 }}>
        <h1>Game menu</h1>

        <ul>
          <li>
            <Link href="/team">➡️ Tým</Link>
          </li>
          <li>
            <Link href="/obchod">🛒 Obchod</Link>
          </li>
        </ul>
      </div>
    </AuthGuard>
  );
}
