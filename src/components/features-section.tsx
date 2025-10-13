"use client";

import { motion } from "framer-motion";
import { FeatureSteps } from "@/components/ui/feature";

export function FeaturesSection() {
  const features = [
    {
      step: "Tính năng 1",
      title: "Quản lý bán hàng thông minh",
      content:
        "Giao diện thu ngân thân thiện, xử lý đơn hàng nhanh chóng với tính năng tính toán tự động và áp dụng khuyến mãi linh hoạt.",
      image: "/images/1pos-thumbnail_7.png",
    },
    {
      step: "Tính năng 2",
      title: "Quản lý kho hàng hiệu quả",
      content:
        "Theo dõi tồn kho real-time, cảnh báo hết hàng tự động và quản lý nhập xuất kho với báo cáo chi tiết.",
      image: "/images/1pos-thumbnail_10.jpg",
    },
    {
      step: "Tính năng 3",
      title: "Báo cáo và phân tích doanh thu",
      content:
        "Dashboard trực quan với biểu đồ, báo cáo doanh thu theo thời gian thực và phân tích xu hướng kinh doanh chi tiết.",
      image: "/images/1pos-thumbnail_1.png",
    },
    // {
    //   step: "Tính năng 4",
    //   title: "CRM và chăm sóc khách hàng",
    //   content:
    //     "Quản lý thông tin khách hàng toàn diện với chương trình tích điểm và hệ thống marketing tự động.",
    //   image: "/images/1pos-thumbnail_3.png",
    // },
    // {
    //   step: "Tính năng 5",
    //   title: "Đa nền tảng và thanh toán",
    //   content:
    //     "Hoạt động mượt mà trên mọi thiết bị, hỗ trợ đa dạng hình thức thanh toán từ tiền mặt đến ví điện tử.",
    //   image: "/images/1pos-thumbnail_5.jpg",
    // },
  ];
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
            TÍNH NĂNG NỔI BẬT CỦA 1POS
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Khám phá những tính năng mạnh mẽ giúp doanh nghiệp của bạn quản lý bán hàng hiệu quả và
            tăng trưởng bền vững
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
