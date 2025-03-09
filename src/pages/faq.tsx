import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "designers", name: "For Designers" },
    { id: "dropshippers", name: "For Dropshippers" },
    { id: "orders", name: "Orders & Shipping" },
    { id: "returns", name: "Returns & Refunds" },
    { id: "technical", name: "Technical" },
  ];

  // FAQ data
  const faqs = [
    {
      id: "1",
      question: "What is 3D Print Market?",
      answer:
        "3D Print Market is a platform that connects designers who create 3D models with customers who want to purchase 3D printed products, and dropshippers who want to sell these products without handling inventory. We handle the printing, quality control, and shipping process.",
      category: "general",
    },
    {
      id: "2",
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button in the top right corner of the page. You'll need to provide your name, email address, and choose a password. You'll also need to select your account type (Designer, Dropshipper, or Customer).",
      category: "general",
    },
    {
      id: "3",
      question: "What file formats do you accept for 3D models?",
      answer:
        "We accept STL, OBJ, 3MF, and STEP files for 3D printing. Files should be properly prepared with appropriate wall thickness and support structures if needed. For best results, please check our design guidelines before uploading.",
      category: "designers",
    },
    {
      id: "4",
      question: "How do designers get paid?",
      answer:
        "Designers earn a commission (typically 70%) on each sale of their designs. Payments are processed monthly for all sales from the previous month, provided you've reached the minimum payout threshold of $50. You can receive payments via PayPal or direct bank transfer.",
      category: "designers",
    },
    {
      id: "5",
      question: "How does dropshipping work on your platform?",
      answer:
        "As a dropshipper, you can select designs from our marketplace, set your own prices, and sell them on your website or social media. When a customer places an order, you forward it to us, and we handle the printing and shipping directly to your customer with your branding.",
      category: "dropshippers",
    },
    {
      id: "6",
      question: "Can I customize the packaging for my dropshipping orders?",
      answer:
        "Yes, we offer white-label shipping for dropshippers. You can customize the packaging with your logo and branding. You can upload your logo and packaging preferences in your dropshipper dashboard settings.",
      category: "dropshippers",
    },
    {
      id: "7",
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days within the continental US. Express shipping is available for 2-3 business days delivery. International shipping varies by location and usually takes 7-14 business days. Please note that production time (1-5 days depending on complexity) is in addition to shipping time.",
      category: "orders",
    },
    {
      id: "8",
      question: "What materials do you offer for 3D printing?",
      answer:
        "We offer a variety of materials including PLA, PETG, ABS, Resin, and Nylon. Each material has different properties suitable for different applications. You can find detailed information about each material in our Materials Guide.",
      category: "general",
    },
    {
      id: "9",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for items that are defective or damaged during shipping. Custom or personalized items cannot be returned unless there is a defect. Please contact our customer support team with photos of the issue to initiate a return.",
      category: "returns",
    },
    {
      id: "10",
      question: "How do I track my order?",
      answer:
        "Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.",
      category: "orders",
    },
    {
      id: "11",
      question: "My 3D file won't upload. What should I do?",
      answer:
        "If you're having trouble uploading your file, please ensure it's in a supported format (STL, OBJ, 3MF, or STEP) and under the 50MB size limit. Try reducing the polygon count or compressing the file. If you still have issues, please contact our support team.",
      category: "technical",
    },
    {
      id: "12",
      question: "How do I become a featured designer?",
      answer:
        "Featured designers are selected based on the quality and popularity of their designs, as well as their overall contribution to the community. Consistently uploading high-quality designs, maintaining good reviews, and being active in the community will increase your chances of being featured.",
      category: "designers",
    },
  ];

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter((faq) => {
    // Filter by category
    if (activeCategory !== "all" && faq.category !== activeCategory) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our 3D printing marketplace
              and services
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setActiveCategory(category.id)}
                  className="mb-2"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* FAQ Accordion */}
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-white rounded-lg border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="text-left font-medium">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            <Separator className="my-12" />

            {/* Contact Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Please contact our
                support team.
              </p>
              <Button onClick={() => (window.location.href = "/contact")}>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
