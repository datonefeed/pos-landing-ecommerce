"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";

export function NewsSection() {
  const t = useTranslations("NewsSection");

  const articles = [
    {
      title: "Hướng dẫn sử dụng 1POS cho người mới bắt đầu",
      excerpt: "Tìm hiểu cách sử dụng các tính năng cơ bản của 1POS để quản lý cửa hàng hiệu quả",
      date: "15/03/2024",
      image: "/images/news-img1.jpg",
    },
    {
      title: "Giải pháp quản lý bán hàng đa kênh với 1POS",
      excerpt: "Khám phá cách 1POS giúp bạn quản lý bán hàng trên nhiều kênh một cách dễ dàng",
      date: "12/03/2024",
      image: "/images/news-img2.jpg",
    },
    {
      title: "Tối ưu hóa quy trình bán hàng với báo cáo thông minh",
      excerpt: "Sử dụng báo cáo và phân tích dữ liệu để đưa ra quyết định kinh doanh chính xác",
      date: "10/03/2024",
      image: "/images/news-img3.jpg",
    },
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="w-full text-3xl md:text-4xl font-bold text-foreground">
            {t("content.title")}
          </h2>
        </motion.div>

        {articles.length < 4 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    {t("cta.readMore")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {articles.map((article, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-xl overflow-hidden border"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          {t("cta.readMore")}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </motion.article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
