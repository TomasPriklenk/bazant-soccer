import AuthGuard from "@/app/components/AuthGuard";
import Link from "next/link";

export default function GamePage() {
  return (
    <AuthGuard>
      <div style={{ color: "white", padding: 40 }}>
        <h1>Game menu</h1>

        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <Link href="/team">👉 Tým</Link>
          <Link href="/obchod">🛒 Obchod</Link>
        </div>
      </div>
    </AuthGuard>
  );
}
