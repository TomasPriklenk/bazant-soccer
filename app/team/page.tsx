"use client";

import { useState } from "react";

type SlotKey = "gk" | "p1" | "p2" | "p3" | "p4" | "p5";

type Card = {
  id: string;
  name: string;
  overall: number;
};

const FAKE_CARDS: Card[] = [
  { id: "c1", name: "Hráč A", overall: 10 },
  { id: "c2", name: "Hráč B", overall: 10 },
  { id: "c3", name: "Hráč C", overall: 11 },
  { id: "c4", name: "Hráč D", overall: 9 },
  { id: "c5", name: "Gólman", overall: 10 },
];

function Slot({
  label,
  card,
  onClick,
}: {
  label: string;
  card: Card | null;
  onClick: () => void;
}) {
  return (
    <div className="slot" onClick={onClick}>
      {card ? `${card.name} (${card.overall})` : label}
    </div>
  );
}

export default function TeamPage() {
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null);
  const [team, setTeam] = useState<Record<SlotKey, Card | null>>({
    gk: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
  });

  function selectCard(card: Card) {
    if (!activeSlot) return;

    setTeam((prev) => ({
      ...prev,
      [activeSlot]: card,
    }));

    setActiveSlot(null);
  }

  return (
    <div className="team-page">
      <div className="pitch">
        <div className="row">
          <Slot label="P3" card={team.p3} onClick={() => setActiveSlot("p3")} />
          <Slot label="P4" card={team.p4} onClick={() => setActiveSlot("p4")} />
          <Slot label="P5" card={team.p5} onClick={() => setActiveSlot("p5")} />
        </div>

        <div className="row">
          <Slot label="P1" card={team.p1} onClick={() => setActiveSlot("p1")} />
          <Slot label="P2" card={team.p2} onClick={() => setActiveSlot("p2")} />
        </div>

        <div className="row">
          <Slot label="GK" card={team.gk} onClick={() => setActiveSlot("gk")} />
        </div>
      </div>

      {activeSlot && (
        <div className="card-picker">
          <h3>Vyber kartu pro {activeSlot.toUpperCase()}</h3>

          <div className="cards">
            {FAKE_CARDS.map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => selectCard(card)}
              >
                <strong>{card.name}</strong>
                <div>Overall: {card.overall}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
