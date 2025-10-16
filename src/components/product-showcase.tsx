"use client";

import { motion } from "framer-motion";
import { VideoPlayer } from "./ui/video-thumbnail-player";
import { useTranslations } from "next-intl";
import media from "@/data/media.json";

export function ProductShowcase() {
  const t = useTranslations("ProductShowcase");

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("content.title")}</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">{t("content.description")}</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Floating Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <VideoPlayer
              thumbnailUrl="/images/1pos-thumbnail_10.jpg"
              videoUrl={media.ProductShowcase.videoEmbedLink}
              title={t("video.title")}
              description={t("video.description")}
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
