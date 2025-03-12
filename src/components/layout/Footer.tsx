import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import TopDesigners from "./TopDesigners";
import ContactInfo from "./ContactInfo";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-1">🖨️</span> 3D Print Tunisia
            </div>
            <p className="text-gray-400 max-w-xs">
              Connect with talented Tunisian designers, sell unique 3D printed
              products, or find the perfect custom item made in Tunisia.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-800"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-800"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-800"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-800"
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/marketplace"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/marketplace";
                  }}
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="/designers"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/designers";
                  }}
                >
                  Designers
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/how-it-works";
                  }}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/pricing";
                  }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/blog";
                  }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Top Designers */}
          <div>
            <TopDesigners />
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/help";
                  }}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/contact";
                  }}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/faq";
                  }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/shipping";
                  }}
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/terms";
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <ContactInfo />
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 3D Print Tunisia. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 text-sm hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/privacy";
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 text-sm hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/terms";
              }}
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-gray-400 text-sm hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/cookies";
              }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
