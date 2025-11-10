"use client";

import { motion } from "framer-motion";
import Carousel from "./ui/testimonial-cards";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("TestimonialsSection");

  return (
    <section className="py-12 bg-gradient-to-b from-primary to-primary/90 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("content.title")}</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto whitespace-nowrap">
            {t("content.description")}
          </p>
        </motion.div>

        <Carousel />
      </div>
    </section>
  );
}
