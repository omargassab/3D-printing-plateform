import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Truck, Package, Clock, ShieldCheck } from "lucide-react";

const ShippingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>

            <div className="prose max-w-none">
              <section>
                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-primary" />
                  Shipping Information
                </h2>
                <p className="mb-4">
                  At 3D Print Market, we strive to deliver your custom 3D
                  printed items as quickly and efficiently as possible. All
                  items are printed on demand after your order is placed.
                </p>

                <h3 className="font-medium mt-6 mb-2">Shipping Options</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Shipping Method</th>
                        <th className="text-left py-2">Estimated Delivery</th>
                        <th className="text-left py-2">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Standard Shipping</td>
                        <td className="py-3">5-7 business days</td>
                        <td className="py-3">$4.99</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Express Shipping</td>
                        <td className="py-3">2-3 business days</td>
                        <td className="py-3">$9.99</td>
                      </tr>
                      <tr>
                        <td className="py-3">International Shipping</td>
                        <td className="py-3">7-14 business days</td>
                        <td className="py-3">$19.99+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-100">
                  <strong>
                    Free standard shipping on all orders over $50!
                  </strong>{" "}
                  Discount automatically applied at checkout.
                </p>

                <h3 className="font-medium mt-6 mb-2">Production Time</h3>
                <p>
                  Please note that all items are printed on demand after your
                  order is placed. Production typically takes:
                </p>
                <ul className="list-disc pl-6 my-3">
                  <li>Small items (≤ 50g): 1-2 business days</li>
                  <li>Medium items (51-150g): 2-3 business days</li>
                  <li>Large items (151-300g): 3-4 business days</li>
                  <li>X-Large items (301g+): 4-5 business days</li>
                </ul>
                <p>
                  Production time is in addition to shipping time. During peak
                  seasons or for custom orders, production may take longer.
                </p>

                <h3 className="font-medium mt-6 mb-2">Tracking Your Order</h3>
                <p>
                  Once your order ships, you will receive a confirmation email
                  with tracking information. You can also track your order by
                  logging into your account and viewing your order history.
                </p>
              </section>

              <Separator className="my-8" />

              <section>
                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary" />
                  Return Policy
                </h2>
                <p className="mb-4">
                  We want you to be completely satisfied with your purchase. If
                  for any reason you're not happy with your order, we offer a
                  30-day return policy under the following conditions:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Return Conditions:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Items must be returned in their original condition</li>
                    <li>
                      Custom or personalized items cannot be returned unless
                      there is a defect
                    </li>
                    <li>Buyer is responsible for return shipping costs</li>
                    <li>
                      Refunds will be processed within 5-7 business days after
                      we receive the returned item
                    </li>
                  </ul>
                </div>

                <h3 className="font-medium mt-6 mb-2">
                  How to Initiate a Return
                </h3>
                <ol className="list-decimal pl-6 my-3 space-y-2">
                  <li>
                    Log into your account and navigate to your order history
                  </li>
                  <li>
                    Select the order containing the item you wish to return
                  </li>
                  <li>Click on "Request Return" and follow the instructions</li>
                  <li>Print the provided return shipping label</li>
                  <li>
                    Package the item securely and attach the shipping label
                  </li>
                  <li>
                    Drop off the package at your nearest shipping carrier
                    location
                  </li>
                </ol>

                <p className="mt-4">
                  Alternatively, you can contact our customer support team at{" "}
                  <strong>returns@3dprintmarket.com</strong> with your order
                  number and reason for return.
                </p>
              </section>

              <Separator className="my-8" />

              <section>
                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                  Quality Guarantee
                </h2>
                <p className="mb-4">
                  We stand behind the quality of our 3D printed products. If
                  your item arrives damaged or defective, please contact us
                  within 7 days of receipt, and we will provide a replacement or
                  refund at no additional cost.
                </p>

                <p>
                  To report a quality issue, please email{" "}
                  <strong>quality@3dprintmarket.com</strong> with:
                </p>
                <ul className="list-disc pl-6 my-3">
                  <li>Your order number</li>
                  <li>A description of the issue</li>
                  <li>Photos clearly showing the defect or damage</li>
                </ul>

                <p className="bg-green-50 p-3 rounded-md border border-green-100 mt-4">
                  Our quality team will review your submission and respond
                  within 1-2 business days with next steps.
                </p>
              </section>

              <Separator className="my-8" />

              <section>
                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">
                      Do you ship internationally?
                    </h3>
                    <p className="text-gray-600">
                      Yes, we ship to most countries worldwide. International
                      shipping rates and delivery times vary by location.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">
                      Can I change my shipping address after placing an order?
                    </h3>
                    <p className="text-gray-600">
                      Address changes may be possible if the order hasn't
                      entered production. Please contact customer service
                      immediately.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">
                      What if my package is lost or stolen?
                    </h3>
                    <p className="text-gray-600">
                      If your tracking shows delivery but you haven't received
                      your package, please contact us within 7 days. We'll work
                      with the carrier to resolve the issue.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">
                      Can I expedite an order that's already been placed?
                    </h3>
                    <p className="text-gray-600">
                      In some cases, we may be able to upgrade shipping on
                      existing orders. Additional fees will apply. Contact
                      customer service for assistance.
                    </p>
                  </div>
                </div>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Need More Help?</h3>
                <p>
                  If you have any other questions about shipping or returns,
                  please visit our{" "}
                  <a href="/faq" className="text-primary hover:underline">
                    FAQ page
                  </a>{" "}
                  or{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    contact our support team
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;
