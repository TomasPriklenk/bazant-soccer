import AuthGuard from "../components/AuthGuard";
import Link from "next/link";

export default function GamePage() {
  return (
    <AuthGuard>
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#111",
            padding: 40,
            borderRadius: 12,
            textAlign: "center",
            boxShadow: "0 0 20px rgba(0,255,0,0.2)",
          }}
        >
          <h1 style={{ marginBottom: 30 }}>🎮 Game menu</h1>

          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <Link href="/team">
              <button
                style={{
                  padding: "12px 24px",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                ⚽ Tým
              </button>
            </Link>

            <Link href="/obchod">
              <button
                style={{
                  padding: "12px 24px",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                🛒 Obchod
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
