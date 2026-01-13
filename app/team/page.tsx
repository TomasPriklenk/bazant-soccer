'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Card = {
  id: string;
  overall: number;
  image_url: string;
  is_goalkeeper: boolean;
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
  const [team, setTeam] = useState<Team | null>(null);
  const [cards, setCards] = useState<Record<string, Card>>({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: teamData } = await supabase
      .from('teams')
      .select('*')
      .eq('user_id', user!.id)
      .single();

    const ids = [
      teamData.gk_card_id,
      teamData.p1,
      teamData.p2,
      teamData.p3,
      teamData.p4,
      teamData.p5,
    ].filter(Boolean);

    const { data: cardsData } = await supabase
      .from('cards')
      .select('id, overall, image_url, is_goalkeeper')
      .in('id', ids);

    const map: any = {};
    cardsData?.forEach((c) => (map[c.id] = c));

    setTeam(teamData);
    setCards(map);
  }

  function renderSlot(cardId: string | null) {
    if (!cardId) {
      return <div className="slot empty">+</div>;
    }

    const c = cards[cardId];
    if (!c) return null;

    return (
      <div className="slot">
        <img src={c.image_url} />
        <div className="rating">{c.overall}</div>
      </div>
    );
  }

  if (!team) return null;

  return (
    <div className="pitch">
      <div className="row top">
        {renderSlot(team.p3)}
        {renderSlot(team.p4)}
        {renderSlot(team.p5)}
      </div>

      <div className="row bottom">
        {renderSlot(team.p1)}
        {renderSlot(team.p2)}
      </div>

      <div className="row gk">
        {renderSlot(team.gk_card_id)}
      </div>
    </div>
  );
}

