"use client";

import { useEffect, useState } from "react";

/**
 * Slot = jedno místo na hřišti
 * Zatím jen zobrazí cardId nebo label
 */
function Slot({
  label,
  cardId,
}: {
  label: string;
  cardId?: string | null;
}) {
  return (
    <div className="slot">
      {cardId ?? label}
    </div>
  );
}

type Team = {
  gk_card_id: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  p5: string | null;
};

export default function TeamPage() {
  // 🔹 zatím mock dat (později nahradíme Supabase)
  const [team, setTeam] = useState<Team>({
    gk_card_id: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
  });

  useEffect(() => {
    // jen test, že stránka renderuje
    console.log("TEAM PAGE LOADED");
  }, []);

  return (
    <div className="team-page">
      <div className="pitch">
        {/* horní řada */}
        <div className="row">
          <Slot label="P3" cardId={team.p3} />
          <Slot label="P4" cardId={team.p4} />
          <Slot label="P5" cardId={team.p5} />
        </div>

        {/* prostřední řada */}
        <div className="row">
          <Slot label="P1" cardId={team.p1} />
          <Slot label="P2" cardId={team.p2} />
        </div>

        {/* gólman */}
        <div className="row gk">
          <Slot label="GK" cardId={team.gk_card_id} />
        </div>
      </div>
    </div>
  );
}
