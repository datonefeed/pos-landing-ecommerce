import React, { useState } from "react";

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: "Trợ lý hỗ trợ khách hàng 1POS",
    imageUrl: "https://www.volantesystems.com/wp-content/uploads/2023/07/team-2.png",
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng tính năng bán hàng",
    imageUrl: "https://giaiphapmobifone.vn/wp-content/uploads/2024/07/1pos-post.png",
  },
  {
    id: 3,
    title: "Chatbot tư vấn & xử lý sự cố nhanh",
    imageUrl: "https://bimpos.com/sites/default/files/images/posts/960x0.jpg",
  },
  {
    id: 4,
    title: "Hỗ trợ kỹ thuật và quản lý thiết bị",
    imageUrl: "https://www.vitalpos.com/images/vital-family.jpg",
  },
  // {
  //   id: 5,
  //   title: "Phân tích dữ liệu & gợi ý cải thiện kinh doanh",
  //   imageUrl:
  //     "https://koronapos.com/wp-content/uploads/2024/10/Side_Images_Hardware-Image-1024x568.png",
  // },
];

// --- Accordion Item Component ---
const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
}: {
  item: (typeof accordionItems)[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[450px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${
          isActive
            ? "w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px]"
            : "w-[40px] sm:w-[50px] md:w-[60px]"
        }
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/400x450/2d3748/ffffff?text=Image+Error";
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 rotate-0" // Active state: horizontal, bottom-center
              : // Inactive state: vertical, positioned at the bottom, for all screen sizes
                "w-auto text-left bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 rotate-90"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="container bg-transparent font-sans mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight tracking-tighter">
            Liên hệ với chúng tôi ngay
          </h2>

          {/* Contact Form */}
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 max-w-xl mx-auto lg:mx-0">
            {/* Name */}
            <div>
              <label htmlFor="name" className="blocktext-sm font-medium text-gray-700 mb-1">
                Tên của bạn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập tên của bạn"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Nhập tin nhắn của bạn"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>

        {/* Right Side: Image Accordion */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          {/* Changed flex-col to flex-row to keep the layout consistent */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto p-2 sm:p-4">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => handleItemHover(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
