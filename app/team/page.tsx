"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Card = {
  id: string;
  overall: number;
  image_url: string;
};

type Team = {
  gk_card_id: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  p5: string | null;
};

export default function TeamPage() {
  const [cards, setCards] = useState<Record<string, Card>>({});
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: teamData } = await supabase
      .from("teams")
      .select("gk_card_id,p1,p2,p3,p4,p5")
      .eq("user_id", user.id)
      .single();

    setTeam(teamData);

    const ids = Object.values(teamData).filter(Boolean);

    const { data: cardData } = await supabase
      .from("cards")
      .select("id,overall,image_url")
      .in("id", ids);

    const map: any = {};
    cardData?.forEach((c) => (map[c.id] = c));
    setCards(map);
  }

  function Slot({ cardId, label }: { cardId?: string | null; label: string }) {
    const c = cardId ? cards[cardId] : null;

    return (
      <div className="slot">
        {c ? (
          <>
            <img src={c.image_url} />
            <div className="rating">{c.overall}</div>
          </>
        ) : (
          <div style={{ color: "white", marginTop: 40 }}>{label}</div>
        )}
      </div>
    );
  }

  if (!team) return null;

  return (
    <div className="pitch">
      <div className="row top">
        <Slot label="P3" cardId={team.p3} />
        <Slot label="P4" cardId={team.p4} />
        <Slot label="P5" cardId={team.p5} />
      </div>

      <div className="row bottom">
        <Slot label="P1" cardId={team.p1} />
        <Slot label="P2" cardId={team.p2} />
      </div>

      <div className="row gk">
        <Slot label="GK" cardId={team.gk_card_id} />
      </div>
    </div>
  );
}
