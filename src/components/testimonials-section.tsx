"use client";

import { motion } from "framer-motion";
import Carousel from "./ui/testimonial-cards";

export function TestimonialsSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ĐÁNH GIÁ CỦA KHÁCH HÀNG</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto whitespace-nowrap">
            Hàng nghìn doanh nghiệp đã tin tưởng và sử dụng 1POS để quản lý kinh doanh của họ
          </p>
        </motion.div>

        <Carousel />
      </div>
    </section>
  );
}
