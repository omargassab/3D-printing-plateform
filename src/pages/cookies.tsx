import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CookiesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                the website owners.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                2. How We Use Cookies
              </h2>
              <p>We use cookies for various purposes, including:</p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are
                  necessary for the website to function properly and cannot be
                  switched off in our systems. They are usually set in response
                  to actions made by you, such as setting your privacy
                  preferences, logging in, or filling in forms.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies allow us
                  to count visits and traffic sources so we can measure and
                  improve the performance of our site. They help us know which
                  pages are the most and least popular and see how visitors move
                  around the site.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> These cookies enable the
                  website to provide enhanced functionality and personalization.
                  They may be set by us or by third-party providers whose
                  services we have added to our pages.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> These cookies may be set
                  through our site by our advertising partners. They may be used
                  by those companies to build a profile of your interests and
                  show you relevant advertisements on other sites.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                3. Managing Cookies
              </h2>
              <p>
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience, as it will no longer be personalized to you.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                4. Our Cookies
              </h2>
              <p>
                Below is a list of the main cookies we use and what we use them
                for:
              </p>
              <table className="min-w-full border border-gray-300 my-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Cookie Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      session_id
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Maintains your session while browsing
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Session
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      auth_token
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Keeps you logged in
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      30 days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      cart_items
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Remembers items in your shopping cart
                    </td>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_ga</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Google Analytics - Used to distinguish users
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      2 years
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                5. Changes to This Cookie Policy
              </h2>
              <p>
                We may update our Cookie Policy from time to time. We will
                notify you of any changes by posting the new Cookie Policy on
                this page and updating the "Last updated" date.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please
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

export default CookiesPage;
