"use client";

import { motion } from "framer-motion";
import { LandingAccordionItem } from "./ui/interactive-image-accordion";
import { useTranslations } from "next-intl";

export function SupportSection() {
  const t = useTranslations("SupportSection");
  return (
    <section id="support" className="py-20">
      <div className="container px-4  max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("content.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:whitespace-nowrap">
            {t("content.description")}
          </p>
        </motion.div>

        <div className="grid gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <LandingAccordionItem />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
