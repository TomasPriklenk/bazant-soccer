"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Team = {
  gk_card_id: string | null;
  gk_overall: number | null;

  p1_card_id: string | null;
  p1_overall: number | null;

  p2_card_id: string | null;
  p2_overall: number | null;

  p3_card_id: string | null;
  p3_overall: number | null;

  p4_card_id: string | null;
  p4_overall: number | null;

  p5_card_id: string | null;
  p5_overall: number | null;

  base_rating: number;
  team_rating: number;
};

export default function TeamPage() {
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    const { data, error } = await supabase
      .from("user_team_menu")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTeam(data);
  }

  if (!team) return <div>Loading…</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Tvůj tým</h1>
      <h2>Rating: {team.team_rating}</h2>

      <div className="pitch">
        <div className="row top">
          <Slot label="P3" overall={team.p3_overall} />
          <Slot label="P4" overall={team.p4_overall} />
          <Slot label="P5" overall={team.p5_overall} />
        </div>

        <div className="row mid">
          <Slot label="P1" overall={team.p1_overall} />
          <Slot label="P2" overall={team.p2_overall} />
        </div>

        <div className="row bottom">
          <Slot label="GK" overall={team.gk_overall} />
        </div>
      </div>
    </div>
  );
}

function Slot({ label, overall }: { label: string; overall: number | null }) {
  return (
    <div className="slot">
      {overall ? (
        <div className="card">
          <strong>{label}</strong>
          <div>{overall}</div>
        </div>
      ) : (
        <div className="empty">{label}</div>
      )}
    </div>
  );
}
