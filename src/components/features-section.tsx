"use client";

import { motion } from "framer-motion";
import { FeatureSteps } from "@/components/ui/feature";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("FeaturesSection");
  const features = t.raw("features");
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("content.description")}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FeatureSteps features={features} autoPlayInterval={4000} imageHeight="h-[500px]" />
      </motion.div>
    </section>
  );
}
