import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ObchodPage() {
  const { data: cards } = await supabase.from("cards").select("*");

  return (
    <div style={{ padding: 40 }}>
      <h1>🛒 Obchod s kartami</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {cards?.map((card) => (
          <div
            key={card.id}
            style={{
              background: "#111",
              padding: 15,
              borderRadius: 12,
              width: 200,
              color: "white",
            }}
          >
            <img
              src={`https://cxmzsoahiocyqysvtpty.supabase.co/storage/v1/object/public/cards/${encodeURIComponent(card.image_path)}`}
              style={{ width: "100%", borderRadius: 10 }}
            />

            <p>⭐ Rating: {card.overall}</p>
            <p>💰 Cena: {card.price}</p>

            <button
              style={{
                width: "100%",
                background: "gold",
                border: "none",
                padding: 10,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Koupit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
