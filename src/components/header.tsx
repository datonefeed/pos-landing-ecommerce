"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import media from "@/data/media.json";

export function Header() {
  const t = useTranslations("Header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.solutions"), href: "#solutions" },
    { label: t("nav.support"), href: "#support" },
    { label: t("nav.news"), href: "#news" },
    { label: t("nav.aboutUs"), href: "#footer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* init Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-sm mt-6 border-2 rounded-full border-border max-w-7xl mx-auto"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <Image src={media.logo.white} height="90" width="120" alt={t("logo.alt")} />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 text-white">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="rounded-full hover:text-primary">
                {t("cta.signUp")}
              </Button>
              <Button size="sm" className="bg-white hover:bg-gray-100 text-primary rounded-full">
                {t("cta.signIn")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-white"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <LanguageSwitcher />
                  <Button variant="ghost" size="sm" className="rounded-full">
                    {t("cta.signUp")}
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                    {t("cta.signIn")}
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Sticky Header - xuất hiện khi cuộn xuống */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
                {/* Logo */}
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                  <Image src={media.logo.color} height="90" width="120" alt={t("logo.alt")} />
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  <LanguageSwitcher />
                  <Button variant="ghost" size="sm" className="rounded-full">
                    {t("cta.signUp")}
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                    {t("cta.signIn")}
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu for Sticky Header */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden border-t border-border bg-white"
                >
                  <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    <div className="flex flex-col gap-2 pt-4 border-t border-border">
                      <LanguageSwitcher />
                      <Button variant="ghost" size="sm" className="rounded-full">
                        {t("cta.signUp")}
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                        {t("cta.signIn")}
                      </Button>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
