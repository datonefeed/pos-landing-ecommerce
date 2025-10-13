"use client";

import { Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const footerLinks = t.raw("links");

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className=" text-white pt-16 pb-8 bg-gradient-to-b from-primary to-primary/90"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <a href="#">
                <img
                  src="images/LOGO_SVG_1POS_WHITE.svg"
                  alt={t("company.logoAlt")}
                  className="h-10"
                />
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-slate-300 mb-6 leading-relaxed"
            >
              {t("company.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{t("company.address")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>{t("company.phone")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>{t("company.email")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">{t("links.product.title")}</h3>
            <ul className="space-y-3">
              {footerLinks.product.items.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">{t("links.company.title")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.items.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">{t("links.support.title")}</h3>
            <ul className="space-y-3">
              {footerLinks.support.items.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-400 pt-8 mb-8"
        >
          <div className="max-w-md">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="font-semibold text-lg mb-3"
            >
              {t("newsletter.title")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-sm text-slate-300 mb-4"
            >
              {t("newsletter.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder={t("newsletter.emailPlaceholder")}
                className="bg-gray-50 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button className="bg-primary border-2 hover:bg-primary/90">
                {t("newsletter.subscribe")}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-gray-400 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-slate-400"
          >
            {t("bottom.copyright")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label={t("bottom.social.facebook")}
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label={t("bottom.social.youtube")}
            >
              <Youtube className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label={t("bottom.social.linkedin")}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
