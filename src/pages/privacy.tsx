import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                1. Introduction
              </h2>
              <p>
                3D Print Market ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or use our services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p>
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone
                  number, billing address, and payment information when you
                  register for an account or place an order.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our
                  website, including pages visited, time spent on pages, and
                  actions taken.
                </li>
                <li>
                  <strong>Device Data:</strong> Information about your device,
                  such as IP address, browser type, and operating system.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p>
                We may use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and sending order confirmations</li>
                <li>
                  Responding to your inquiries and customer service requests
                </li>
                <li>
                  Sending you marketing communications (with your consent)
                </li>
                <li>Improving our website and services</li>
                <li>
                  Protecting against fraudulent or unauthorized transactions
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                4. Sharing Your Information
              </h2>
              <p>
                We may share your information with third parties in certain
                situations, such as:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>
                  With service providers who perform services on our behalf
                </li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                5. Your Rights
              </h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including the right to:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Rectify inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>
                  Restrict or object to processing of your personal information
                </li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@3dprintmarket.com
                <br />
                <strong>Address:</strong> 123 Print Street, Design City, DC
                12345
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
