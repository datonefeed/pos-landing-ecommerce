"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary">404</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md space-y-4 mt-6"
      >
        <h2 className="text-2xl font-bold">Trang không tìm thấy</h2>
        <p className="text-muted-foreground">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>

        <div className="pt-4">
          <Button asChild>
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
