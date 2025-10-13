"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number;
}

interface IconProps {
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  card: CardData;
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

const cardData: CardData[] = [
  {
    id: 1,
    imageUrl: "https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg",
    title: "Giải pháp tuyệt vời cho doanh nghiệp",
    name: "Nguyễn Văn An",
    position: "Giám đốc Kinh doanh",
    company: "Công ty ABC",
    testimonial:
      "1POS đã giúp chúng tôi tối ưu hóa quy trình bán hàng và quản lý kho một cách hiệu quả. Giao diện thân thiện, dễ sử dụng.",
    rating: 5,
  },
  {
    id: 2,
    imageUrl: "https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg",
    title: "Tiết kiệm thời gian đáng kể",
    name: "Trần Thị Bình",
    position: "Chủ cửa hàng",
    company: "Cửa hàng XYZ",
    testimonial:
      "Việc quản lý nhiều chi nhánh trở nên dễ dàng hơn bao giờ hết. Báo cáo chi tiết giúp tôi đưa ra quyết định kinh doanh chính xác.",
    rating: 5,
  },
  {
    id: 3,
    imageUrl: "https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg",
    title: "Hỗ trợ khách hàng xuất sắc",
    name: "Lê Hoàng Minh",
    position: "Quản lý Cửa hàng",
    company: "Chuỗi bán lẻ DEF",
    testimonial:
      "Đội ngũ hỗ trợ rất nhiệt tình và chuyên nghiệp. Mọi vấn đề đều được giải quyết nhanh chóng và hiệu quả.",
    rating: 5,
  },
  {
    id: 4,
    imageUrl: "https://i.pinimg.com/736x/84/dc/62/84dc62de850a34a9d420c97f3a2d58f4.jpg",
    title: "Tính năng đa dạng và mạnh mẽ",
    name: "Phạm Thu Hà",
    position: "CEO",
    company: "Công ty GHI",
    testimonial:
      "1POS cung cấp đầy đủ tính năng chúng tôi cần: từ POS, quản lý kho, CRM đến báo cáo phân tích. Tất cả trong một nền tảng.",
    rating: 5,
  },
  {
    id: 5,
    imageUrl: "https://i.pinimg.com/1200x/be/c3/7e/bec37e2c43e703f922f887db2578ce2e.jpg",
    title: "Tăng doanh thu rõ rệt",
    name: "Hoàng Văn Khoa",
    position: "Giám đốc Marketing",
    company: "Thương hiệu JKL",
    testimonial:
      "Sau khi sử dụng 1POS, doanh thu của chúng tôi tăng 30%. Hệ thống khuyến mãi và chương trình khách hàng thân thiết rất hiệu quả.",
    rating: 5,
  },
  {
    id: 6,
    imageUrl: "https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg",
    title: "Dễ dàng mở rộng quy mô",
    name: "Đỗ Thị Mai",
    position: "Founder",
    company: "Startup MNO",
    testimonial:
      "Bắt đầu với một cửa hàng nhỏ, giờ chúng tôi đã có 5 chi nhánh. 1POS scale rất tốt theo sự phát triển của doanh nghiệp.",
    rating: 5,
  },
  {
    id: 7,
    imageUrl: "https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg",
    title: "Báo cáo chính xác và chi tiết",
    name: "Vũ Đức Nam",
    position: "Kế toán trưởng",
    company: "Tập đoàn PQR",
    testimonial:
      "Hệ thống báo cáo tài chính và kinh doanh rất chi tiết. Việc đối soát và lập báo cáo cuối tháng giờ đây chỉ mất vài phút.",
    rating: 5,
  },
  {
    id: 8,
    imageUrl: "https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg",
    title: "Tích hợp đa kênh hoàn hảo",
    name: "Bùi Thị Lan",
    position: "Trưởng phòng Vận hành",
    company: "E-commerce STU",
    testimonial:
      "Kết nối website, app, và cửa hàng offline trong một hệ thống. Quản lý đơn hàng đa kênh chưa bao giờ dễ dàng đến thế.",
    rating: 5,
  },
  {
    id: 9,
    imageUrl: "https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg",
    title: "Đáng tin cậy và ổn định",
    name: "Phan Văn Tùng",
    position: "CTO",
    company: "Công nghệ VWX",
    testimonial:
      "Hệ thống chạy rất ổn định, không bao giờ gặp sự cố trong giờ cao điểm. Bảo mật dữ liệu tuyệt đối, chúng tôi hoàn toàn yên tâm.",
    rating: 5,
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cardData.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 3000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
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
  }, [isPaused, activeIndex]);

  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
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
        <div className="relative flex w-full flex-col rounded-3xl p-4 pt-6 md:p-6">
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-visible pt-12">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
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
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
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
                src={card.imageUrl}
                alt={card.name}
                className="w-full h-full object-cover pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://placehold.co/100x100/3b82f6/ffffff?text=" + card.name.charAt(0);
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
                {card.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{card.position}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{card.company}</p>
            </div>
          </div>

          {/* Đánh giá sao */}
          <div className="flex gap-1 mb-3">
            {[...Array(card.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>

          {/* Tiêu đề đánh giá */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
            {card.title}
          </h3>

          {/* Nội dung đánh giá */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 flex-1">
            &ldquo;{card.testimonial}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
