"use client";

import { motion } from "framer-motion";
import { VideoPlayer } from "./ui/video-thumbnail-player";

export function ProductShowcase() {
  return (
    <section className="py-20 bg-[url('/images/backgroud/product-showcase_bg.svg')] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">VÌ SAO CHỌN 1POS MOBIFONE</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Giải pháp quản lý bán hàng toàn diện với công nghệ hiện đại, giúp doanh nghiệp tối ưu
            hóa quy trình kinh doanh và gia tăng doanh thu
          </p>
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
            {/* <div className="w-full max-w-2xl mx-auto p-4"> */}
            <VideoPlayer
              thumbnailUrl="/images/1pos-thumbnail_10.jpg"
              videoUrl="https://www.youtube.com/embed/u_GVCK9h8Sg?si=CqgTyg2Cx-YAglGn"
              title="MobiFone 1POS"
              description="Giải pháp quản lý bán hàng toàn diện"
              className="rounded-xl"
            />
            {/* </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
