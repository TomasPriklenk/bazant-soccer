"use client";

import { useState } from "react";

/**
 * Slot = jedno místo na hřišti
 * zatím jen klik + label
 */
type SlotKey = "gk" | "p1" | "p2" | "p3" | "p4" | "p5";

function Slot({
  label,
  slotKey,
  active,
  onClick,
}: {
  label: string;
  slotKey: SlotKey;
  active: boolean;
  onClick: (slot: SlotKey) => void;
}) {
  return (
    <div
      className={`slot ${active ? "active" : ""}`}
      onClick={() => onClick(slotKey)}
    >
      {label}
    </div>
  );
}

export default function TeamPage() {
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null);

  function handleSlotClick(slot: SlotKey) {
    console.log("Klik na slot:", slot);
    setActiveSlot(slot);
  }

  return (
    <div className="team-page">
      <div className="pitch">
        {/* horní řada */}
        <div className="row">
          <Slot
            label="P3"
            slotKey="p3"
            active={activeSlot === "p3"}
            onClick={handleSlotClick}
          />
          <Slot
            label="P4"
            slotKey="p4"
            active={activeSlot === "p4"}
            onClick={handleSlotClick}
          />
          <Slot
            label="P5"
            slotKey="p5"
            active={activeSlot === "p5"}
            onClick={handleSlotClick}
          />
        </div>

        {/* prostřední řada */}
        <div className="row">
          <Slot
            label="P1"
            slotKey="p1"
            active={activeSlot === "p1"}
            onClick={handleSlotClick}
          />
          <Slot
            label="P2"
            slotKey="p2"
            active={activeSlot === "p2"}
            onClick={handleSlotClick}
          />
        </div>

        {/* gólman */}
        <div className="row">
          <Slot
            label="GK"
            slotKey="gk"
            active={activeSlot === "gk"}
            onClick={handleSlotClick}
          />
        </div>
      </div>

      {/* info */}
      {activeSlot && (
        <div className="info">
          Aktivní slot: <strong>{activeSlot.toUpperCase()}</strong>
        </div>
      )}
    </div>
  );
}
