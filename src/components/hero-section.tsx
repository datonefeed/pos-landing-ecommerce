"use client";
import React from "react";
import { motion } from "framer-motion";
import { Hero2 } from "./ui/hero";

export function HeroSection() {
  return (
    <section className="relative">
      <motion.div
        className="min-h-screen w-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* <Hero> */}
        <Hero2 />
      </motion.div>
    </section>
  );
}
