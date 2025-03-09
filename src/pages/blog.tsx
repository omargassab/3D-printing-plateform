import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar, User } from "lucide-react";

const BlogPage = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "Top 10 3D Printing Trends for 2023",
      excerpt:
        "Explore the latest innovations and trends shaping the 3D printing industry this year, from new materials to advanced techniques.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      date: "June 15, 2023",
      author: "Alex Johnson",
      category: "Industry Trends",
      readTime: "8 min read",
    },
    {
      id: "2",
      title: "How to Optimize Your 3D Models for Printing",
      excerpt:
        "Learn essential techniques to prepare your 3D models for successful printing, avoiding common pitfalls and ensuring quality results.",
      image:
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80",
      date: "May 28, 2023",
      author: "Maria Chen",
      category: "Design Tips",
      readTime: "12 min read",
    },
    {
      id: "3",
      title: "Success Story: How One Designer Made $50,000 Selling 3D Models",
      excerpt:
        "An inspiring case study of a designer who built a thriving business selling specialized 3D models through our platform.",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      date: "May 10, 2023",
      author: "James Wilson",
      category: "Success Stories",
      readTime: "10 min read",
    },
    {
      id: "4",
      title: "The Ultimate Guide to 3D Printing Materials",
      excerpt:
        "A comprehensive comparison of PLA, PETG, ABS, Resin, and Nylon - helping you choose the right material for your specific project needs.",
      image:
        "https://images.unsplash.com/photo-1570283626316-b0124b95d403?w=800&q=80",
      date: "April 22, 2023",
      author: "Sarah Patel",
      category: "Materials",
      readTime: "15 min read",
    },
    {
      id: "5",
      title: "Starting a Dropshipping Business with 3D Printed Products",
      excerpt:
        "A step-by-step guide to launching your own e-commerce store selling custom 3D printed products without inventory or equipment.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      date: "April 5, 2023",
      author: "Michael Brown",
      category: "Business",
      readTime: "14 min read",
    },
    {
      id: "6",
      title: "Sustainable 3D Printing: Reducing Waste and Environmental Impact",
      excerpt:
        "Discover eco-friendly practices and materials that can make your 3D printing projects more sustainable and environmentally responsible.",
      image:
        "https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?w=800&q=80",
      date: "March 18, 2023",
      author: "Emma Green",
      category: "Sustainability",
      readTime: "9 min read",
    },
  ];

  // Featured post (first post)
  const featuredPost = blogPosts[0];

  // Rest of the posts
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">3D Print Market Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and success stories from the world of 3D
              printing and design
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 md:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge className="mb-2">{featuredPost.category}</Badge>
                    <h2 className="text-2xl font-bold mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  <Button
                    className="self-start"
                    onClick={() =>
                      (window.location.href = `/blog/${featuredPost.id}`)
                    }
                  >
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant="outline"
              className="bg-primary text-white hover:bg-primary/90"
            >
              All Posts
            </Button>
            <Button variant="outline">Industry Trends</Button>
            <Button variant="outline">Design Tips</Button>
            <Button variant="outline">Success Stories</Button>
            <Button variant="outline">Materials</Button>
            <Button variant="outline">Business</Button>
            <Button variant="outline">Sustainability</Button>
          </div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = `/blog/${post.id}`)}
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="outline" size="icon">
                8
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="mb-6">
                Get the latest 3D printing tips, tutorials, and industry news
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md flex-grow text-gray-900"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
