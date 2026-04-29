import React, { useState, useEffect } from "react";
import axios from "axios";

const CountDown = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [freeDeliveryEndTime, setFreeDeliveryEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchFreeDeliveryTime = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getFreeDeliveryAmount`);

        if (response.data.success && response.data.data.freeDeliveryEndTime) {
          setFreeDeliveryEndTime(
            new Date(response.data.data.freeDeliveryEndTime),
          );
        }
      } catch (error) {
        console.error("Error fetching free delivery time:", error);
      }
    };
    fetchFreeDeliveryTime();
  }, []);

  useEffect(() => {
    if (!freeDeliveryEndTime) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = freeDeliveryEndTime.getTime() - now;
      if (distance < 0) {
        clearInterval(interval);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setRemainingTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [freeDeliveryEndTime]);

  if (
    !freeDeliveryEndTime ||
    (remainingTime.days === 0 &&
      remainingTime.hours === 0 &&
      remainingTime.minutes === 0 &&
      remainingTime.seconds === 0)
  ) {
    return null;
  }

  const units = [
    ...(remainingTime.days > 0
      ? [{ value: remainingTime.days, label: "দিন" }]
      : []),
    { value: remainingTime.hours, label: "ঘণ্টা" },
    { value: remainingTime.minutes, label: "মিনিট" },
    { value: remainingTime.seconds, label: "সেকেন্ড" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-green-900 via-emerald-900 to-emerald-800 py-7 px-4 md:px-5 font-serif">
      {/* Ambient glow top */}
      <div className="absolute -top-3/5 right-[-10%] w-[300px] h-[300px] rounded-full bg-emerald-500/20 pointer-events-none z-0 animate-pulse" />

      {/* Ambient glow bottom */}
      <div
        className="absolute -bottom-3/5 left-[-5%] w-[260px] h-[260px] rounded-full bg-emerald-600/25 pointer-events-none z-0 animate-pulse"
        style={{ animationDelay: "1.5s", animationDuration: "6s" }}
      />

      {/* Vertical line accent */}
      <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 text-center">
        {/* Badge */}
        <div className="mb-3.5">
          <span className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-emerald-300 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="animate-bounce inline-block">🚚</span>
            <span>অফার শেষ হওয়ার আগেই অর্ডার করুন</span>
          </span>
        </div>

        {/* Title */}
        <p className="text-sm md:text-base font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-600 via-amber-400 via-amber-200 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_2.5s_linear_infinite]">
            ফ্রি ডেলিভারি অফার শেষ হচ্ছে
          </span>
        </p>

        {/* Countdown boxes */}
        <div className="flex justify-center items-center gap-1 md:gap-2 flex-nowrap overflow-x-auto pb-1">
          {units.map((u, i) => (
            <React.Fragment key={u.label}>
              <div className="bg-green-950/60 backdrop-blur-xl border border-emerald-500/20 rounded-3xl py-3 px-4 md:py-3.5 md:px-5 min-w-[52px] md:min-w-[64px] text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                <div
                  className="text-xl md:text-2xl lg:text-4xl font-black text-red-500 leading-none animate-[flipIn_0.35s_ease]"
                  key={u.value}
                >
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-[11px] text-emerald-200/60 mt-1.5 tracking-wide">
                  {u.label}
                </div>
              </div>

              {/* Separator dots */}
              {i < units.length - 1 && (
                <div className="flex flex-col gap-1 -mt-2 flex-shrink-0">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                  <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="w-12 h-0.5 rounded-full mx-auto mt-4 bg-gradient-to-r from-emerald-400 to-amber-400" />
      </div>
    </div>
  );
};

export default CountDown;
