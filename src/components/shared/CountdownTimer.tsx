"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

export function CountdownTimer({ targetDate, label = "Menuju Kelulusan" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#94A3B8]">
        <Clock className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
        <span>Memuat hitung mundur...</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#111827]/80 border border-white/[0.1] shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 rounded-lg">
        <Clock className="w-3.5 h-3.5" />
        <span className="font-semibold uppercase tracking-wider">{label}</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 text-center font-mono">
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl px-2.5 py-1.5 min-w-[50px]">
          <span className="block text-base sm:text-lg font-bold text-white leading-none">
            {timeLeft.days}
          </span>
          <span className="text-[10px] text-[#64748B] uppercase">Hari</span>
        </div>
        <span className="text-white/40 font-bold">:</span>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl px-2.5 py-1.5 min-w-[50px]">
          <span className="block text-base sm:text-lg font-bold text-white leading-none">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-[#64748B] uppercase">Jam</span>
        </div>
        <span className="text-white/40 font-bold">:</span>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl px-2.5 py-1.5 min-w-[50px]">
          <span className="block text-base sm:text-lg font-bold text-white leading-none">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-[#64748B] uppercase">Menit</span>
        </div>
        <span className="text-white/40 font-bold">:</span>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl px-2.5 py-1.5 min-w-[50px]">
          <span className="block text-base sm:text-lg font-bold text-[#06B6D4] leading-none">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-[#64748B] uppercase">Detik</span>
        </div>
      </div>
    </div>
  );
}
