'use client';

export default function TeamPage() {
  function Slot({ label }: { label: string }) {
    return (
      <div className="slot">
        <div style={{ color: "white", textAlign: "center", marginTop: 45 }}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="pitch">
      <div className="row top">
        <Slot label="P3" />
        <Slot label="P4" />
        <Slot label="P5" />
      </div>

      <div className="row bottom">
        <Slot label="P1" />
        <Slot label="P2" />
      </div>

      <div className="row gk">
        <Slot label="GK" />
      </div>
    </div>
  );
}
