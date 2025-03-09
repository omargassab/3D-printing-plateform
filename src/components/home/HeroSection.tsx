import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Upload, ShoppingBag } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  designerCta?: string;
  dropshipperCta?: string;
  backgroundImage?: string;
  onDesignerClick?: () => void;
  onDropshipperClick?: () => void;
}

const HeroSection = ({
  title = "3D Printing Marketplace & Fulfillment Platform",
  subtitle = "Connect with talented designers, sell unique 3D printed products, or find the perfect custom item - all in one place.",
  designerCta = "Upload Your Designs",
  dropshipperCta = "Start Dropshipping",
  backgroundImage = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1500&q=80",
  onDesignerClick = () => {
    // Check if user is logged in as designer, otherwise redirect to signup
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).role === "designer") {
      window.location.href = "/designer/upload";
    } else {
      window.location.href = "/signup";
    }
  },
  onDropshipperClick = () => {
    // Check if user is logged in as dropshipper, otherwise redirect to signup
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).role === "dropshipper") {
      window.location.href = "/dropshipper/dashboard";
    } else {
      window.location.href = "/signup";
    }
  },
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="3D Printing Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={onDesignerClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-lg flex items-center gap-2"
            >
              <Upload className="h-5 w-5" />
              {designerCta}
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onDropshipperClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-6 rounded-lg flex items-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {dropshipperCta}
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Floating 3D Objects Animation */}
        <div className="absolute right-10 bottom-0 opacity-70 hidden lg:block">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-32 h-32 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1612207841324-5f400b99b1af?w=300&q=80')",
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default HeroSection;
