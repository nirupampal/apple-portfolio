"use client";

import { useEffect, useState } from "react";

export function IndiaClock({ location }: { location: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#7b7b7b]">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {location} · {time}
    </div>
  );
}
