import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using 3D Print Market, you agree to be bound by
                these Terms of Service. If you do not agree to all the terms and
                conditions, you must not access or use our services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                2. User Accounts
              </h2>
              <p>
                When you create an account with us, you must provide accurate,
                complete, and current information. You are responsible for
                safeguarding your password and for all activities that occur
                under your account.
              </p>
              <p className="mt-2">
                We reserve the right to disable any user account if, in our
                opinion, you have violated any provision of these Terms.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                3. Designer Terms
              </h2>
              <p>
                If you register as a designer, you agree to the following
                additional terms:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>
                  You must own or have proper rights to all designs you upload
                </li>
                <li>
                  You grant us a non-exclusive license to display, reproduce,
                  and sell your designs
                </li>
                <li>
                  You will receive the agreed-upon commission for each sale of
                  your designs
                </li>
                <li>
                  We reserve the right to reject or remove any design that
                  violates our policies
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                4. Dropshipper Terms
              </h2>
              <p>
                If you register as a dropshipper, you agree to the following
                additional terms:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>
                  You are responsible for marketing and selling products to your
                  customers
                </li>
                <li>
                  We will handle production and shipping directly to your
                  customers
                </li>
                <li>
                  You must accurately represent the products and their
                  capabilities
                </li>
                <li>
                  You must comply with all applicable laws regarding e-commerce
                  and consumer protection
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p>
                The 3D Print Market platform, including its content, features,
                and functionality, is owned by us and is protected by copyright,
                trademark, and other intellectual property laws.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of or inability to use
                our services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                7. Changes to Terms
              </h2>
              <p>
                We may revise these Terms from time to time. The most current
                version will always be posted on our website. By continuing to
                use our services after revisions become effective, you agree to
                be bound by the revised terms.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> terms@3dprintmarket.com
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

export default TermsPage;
