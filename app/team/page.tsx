"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* =========================
   Typy
========================= */

type Card = {
  id: string;
  name: string;
  overall: number;
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

type SlotKey = keyof Team;

/* =========================
   Slot
========================= */

function Slot({
  label,
  card,
  onClick,
}: {
  label: string;
  card?: Card;
  onClick: () => void;
}) {
  return (
    <div className="slot" onClick={onClick}>
      {card ? (
        <>
          <div>{card.name}</div>
          <div>({card.overall})</div>
        </>
      ) : (
        label
      )}
    </div>
  );
}

/* =========================
   Page
========================= */

export default function TeamPage() {
  const [team, setTeam] = useState<Team>({
    gk_card_id: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
  });

  const [cards, setCards] = useState<Card[]>([]);
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null);

  /* =========================
     Načtení karet ze Supabase
  ========================= */

  useEffect(() => {
    async function loadCards() {
      const { data, error } = await supabase
        .from("cards")
        .select("id, name, overall, is_goalkeeper");

      if (error) {
        console.error(error);
        return;
      }

      setCards(data ?? []);
    }

    loadCards();
  }, []);

  /* =========================
     Pravidla výběru
  ========================= */

  const usedCardIds = Object.values(team).filter(Boolean);

  const selectableCards = cards.filter((card) => {
    // ❌ stejný hráč 2×
    if (usedCardIds.includes(card.id)) return false;

    // 🧤 GK pravidlo
    if (activeSlot === "gk_card_id") {
      return card.is_goalkeeper;
    }

    return !card.is_goalkeeper;
  });

  function selectCard(cardId: string) {
    if (!activeSlot) return;

    setTeam((prev) => ({
      ...prev,
      [activeSlot]: cardId,
    }));

    setActiveSlot(null);
  }

  function getCard(cardId: string | null) {
    return cards.find((c) => c.id === cardId);
  }

  /* =========================
     Render
  ========================= */

  return (
    <div className="team-page">
      <div className="pitch">
        <div className="row top">
          <Slot label="P3" card={getCard(team.p3)} onClick={() => setActiveSlot("p3")} />
          <Slot label="P4" card={getCard(team.p4)} onClick={() => setActiveSlot("p4")} />
          <Slot label="P5" card={getCard(team.p5)} onClick={() => setActiveSlot("p5")} />
        </div>

        <div className="row mid">
          <Slot label="P1" card={getCard(team.p1)} onClick={() => setActiveSlot("p1")} />
          <Slot label="P2" card={getCard(team.p2)} onClick={() => setActiveSlot("p2")} />
        </div>

        <div className="row gk">
          <Slot
            label="GK"
            card={getCard(team.gk_card_id)}
            onClick={() => setActiveSlot("gk_card_id")}
          />
        </div>
      </div>

      {activeSlot && (
        <div className="card-picker">
          <h3>Vyber kartu</h3>

          {selectableCards.map((card) => (
            <div
              key={card.id}
              className="card-option"
              onClick={() => selectCard(card.id)}
            >
              {card.name} – Overall {card.overall}
              {card.is_goalkeeper && " (GK)"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
