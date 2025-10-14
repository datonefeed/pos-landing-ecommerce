"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

// --- Data for the image accordion ---
const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
}: {
  item: { id: number; title: string; imageUrl: string };
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
              ? "bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 rotate-0"
              : "w-auto text-left bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 rotate-90"
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
  const t = useTranslations("SupportSection");
  const accordionItems = t.raw("accordion"); // Sử dụng t.raw để truy cập mảng accordion
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
            {t("content.formTitle")}
          </h2>

          {/* Contact Form */}
          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 max-w-xl mx-auto lg:mx-0">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                {t("form.name.label")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("form.name.placeholder")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                {t("form.email.label")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("form.email.placeholder")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                {t("form.message.label")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("form.message.placeholder")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
            >
              {t("form.submit")}
            </button>
          </form>
        </div>

        {/* Right Side: Image Accordion */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
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
