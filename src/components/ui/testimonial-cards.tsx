"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";
import media from "@/data/media.json";

interface IconProps {
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  card: any;
  index: number;
  activeIndex: number;
  totalCards: number;
}

const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}
  >
    {children}
  </div>
);

export default function Carousel() {
  const t = useTranslations("TestimonialsSection");
  const cardsI18n = t.raw("cards") || [];
  const cards = cardsI18n.map((item) => ({
    ...item,
    imageUrl: media.TestimonialsSection[item.id as keyof typeof media.TestimonialsSection],
  }));
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 3000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, cards.length]);

  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + cards.length) % cards.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  return (
    <section className="w-full flex-col items-center justify-center font-sans overflow-hidden">
      <div
        className="w-full max-w-5xl mx-auto p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full flex-col rounded-3xl p-4 pt-6 md:p-6">
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-visible pt-12">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {Array.isArray(cards) &&
                cards.map((card: any, index: number) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    activeIndex={activeIndex}
                    totalCards={cards.length}
                  />
                ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {Array.isArray(cards) &&
                cards.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => changeSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                      activeIndex === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                    }`}
                    aria-label={t(`ariaLabels.goToSlide`, { index: index + 1 })}
                  />
                ))}
            </div>

            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card, index, activeIndex, totalCards }: CardProps) {
  const t = useTranslations("TestimonialsSection");
  const cards = t.raw("cards") || [];
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }

  const isVisible = Math.abs(offset) <= 1;

  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 30 },
  };

  return (
    <motion.div
      className="absolute w-1/2 md:w-1/3 h-[95%]"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-neutral-800">
        <div className="flex flex-col h-full p-6">
          {/* Avatar và thông tin người đánh giá */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600">
              <img
                src={cards[index]?.imageUrl || "https://placehold.co/100x100/3b82f6/ffffff?text=U"}
                alt={cards[index]?.name || "User"}
                className="w-full h-full object-cover pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://placehold.co/100x100/3b82f6/ffffff?text=" +
                    (cards[index]?.name?.charAt(0) || "U");
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
                {cards[index]?.name || "Unknown"}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {cards[index]?.position || ""}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                {cards[index]?.company || ""}
              </p>
            </div>
          </div>

          {/* Đánh giá sao */}
          <div className="flex gap-1 mb-3">
            {[...Array(cards[index]?.rating || 0)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>

          {/* Tiêu đề đánh giá */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
            {cards[index]?.title || ""}
          </h3>

          {/* Nội dung đánh giá */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 flex-1">
            &ldquo;{cards[index]?.testimonial || ""}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
