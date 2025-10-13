"use client";

import { motion } from "framer-motion";

const Hero2 = () => {
  return (
    <div className="relative py-28 min-h-screen overflow-hidden bg-primary">
      {/* Gradient background with grain effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0"
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-primary to-primary/50"
        />
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-primary/80 to-primary/10"
        />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-primary/50 to-primary/20"
        />
      </motion.div>

      {/* Hero section */}
      <div className="relative container mx-auto mt-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-5xl font-bold text-white md:text-6xl lg:text-7xl"
        >
          Giải pháp Quản lý bán hàng toàn diện
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
        >
          MobiFone cung cấp giải pháp tiện lợi, toàn diện giúp bạn quản lý dễ dàng, bán hàng hiệu
          quả hơn với 1POS.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
          >
            Đăng ký dung thử miễn phí
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 rounded-full border border-white px-8 text-base font-medium text-white hover:bg-white/10"
          >
            Xem video giới thiệu
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative mx-auto my-20 w-full max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute inset-0 rounded shadow-lg bg-white blur-[10rem] bg-grainy"
          />

          {/* Hero Image */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            src="/images/hero-infor.png"
            alt="Hero Image"
            className="relative w-full h-auto shadow-md grayscale-100 rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export { Hero2 };
