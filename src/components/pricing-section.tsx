"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "1POS",
      subtitle: "Gói phần mềm quản lý bán hàng cơ bản",
      price: "4.140.000",
      originalPrice: "3.600.000",
      period: "VNĐ/năm",
      features: [
        "Quản lý bán hàng cơ bản",
        "Quản lý kho hàng",
        "Báo cáo doanh thu",
        "Hỗ trợ 24/7",
        "1 chi nhánh",
      ],
      highlighted: false,
    },
    {
      name: "1POS",
      subtitle: "Gói phần mềm quản lý bán hàng nâng cao",
      price: "720.000",
      originalPrice: "660.000",
      period: "VNĐ/tháng",
      features: [
        "Tất cả tính năng gói cơ bản",
        "Quản lý nhân viên",
        "Quản lý khách hàng",
        "Tích hợp đa kênh",
        "Không giới hạn chi nhánh",
      ],
      highlighted: true,
    },
    {
      name: "1POS",
      subtitle: "Gói phần mềm quản lý bán hàng chuyên nghiệp",
      price: "1.296.000",
      originalPrice: "1.176.000",
      period: "VNĐ/tháng",
      features: [
        "Tất cả tính năng gói nâng cao",
        "API tích hợp",
        "Tùy chỉnh giao diện",
        "Đào tạo chuyên sâu",
        "Hỗ trợ ưu tiên",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">MỌI DOANH NGHIỆP</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative h-full rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-primary text-white shadow-2xl scale-105"
                  : "bg-white border-2 border-border shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-sm font-semibold">
                  Phổ biến nhất
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm whitespace-nowrap ${plan.highlighted ? "text-blue-100" : "text-muted-foreground"}`}
                >
                  {plan.subtitle}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-lg line-through ${plan.highlighted ? "text-blue-200" : "text-muted-foreground"}`}
                  >
                    {plan.originalPrice}
                  </span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-muted-foreground"}`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-white" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${plan.highlighted ? "text-white" : "text-foreground"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-primary/10 hover:text-white "
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
              >
                Đăng ký ngay
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
