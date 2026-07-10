"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endsAt: string;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(endsAt: string): TimeLeft {
  const diff = Math.max(new Date(endsAt).getTime() - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export default function CountdownTimer({ endsAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <p className="text-sm font-medium text-gray-800 mb-3">Special Price Ends In</p>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <TimeBlock value={pad(timeLeft.days)} label="D" />
        <span className="text-gray-400">:</span>
        <TimeBlock value={pad(timeLeft.hours)} label="H" />
        <span className="text-gray-400">:</span>
        <TimeBlock value={pad(timeLeft.minutes)} label="M" />
        <span className="text-gray-400">:</span>
        <TimeBlock value={pad(timeLeft.seconds)} label="S" />
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="bg-gray-900 text-white px-2 py-1 rounded min-w-[2rem] text-center">
        {value}
      </span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
