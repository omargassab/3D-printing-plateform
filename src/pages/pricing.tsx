import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X } from "lucide-react";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Choose the plan that works best for your business needs, with no
              hidden fees or long-term commitments.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Designer Basic Plan */}
              <Card className="border-2 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Designer
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">Basic Plan</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-muted-foreground"> to join</span>
                  </div>
                  <CardDescription className="mt-4">
                    Perfect for designers just getting started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>60% commission on sales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Up to 10 active designs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Community support</span>
                    </li>
                    <li className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Featured placement</span>
                    </li>
                    <li className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-8"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Designer Pro Plan */}
              <Card className="border-2 border-blue-500 shadow-lg relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Designer
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">Pro Plan</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    For serious designers looking to grow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>70% commission on sales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Unlimited active designs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Featured placement in marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Custom designer profile page</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-8"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Dropshipper Plan */}
              <Card className="border-2 hover:border-purple-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-8">
                  <div className="mb-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      Dropshipper
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">Business Plan</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    For dropshippers and resellers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Set your own profit margins</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>White-label shipping</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>API access for store integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Order tracking dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Priority production queue</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-8"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Production Pricing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Production Pricing</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transparent pricing for 3D printing production. Prices vary
                based on material, size, and complexity.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-2">Material</th>
                          <th className="text-left py-4 px-2">
                            Small
                            <br />
                            (≤ 50g)
                          </th>
                          <th className="text-left py-4 px-2">
                            Medium
                            <br />
                            (51-150g)
                          </th>
                          <th className="text-left py-4 px-2">
                            Large
                            <br />
                            (151-300g)
                          </th>
                          <th className="text-left py-4 px-2">
                            X-Large
                            <br />
                            (301g+)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-medium">PLA</td>
                          <td className="py-4 px-2">$8.99</td>
                          <td className="py-4 px-2">$14.99</td>
                          <td className="py-4 px-2">$24.99</td>
                          <td className="py-4 px-2">$39.99+</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-medium">PETG</td>
                          <td className="py-4 px-2">$9.99</td>
                          <td className="py-4 px-2">$16.99</td>
                          <td className="py-4 px-2">$27.99</td>
                          <td className="py-4 px-2">$44.99+</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-medium">ABS</td>
                          <td className="py-4 px-2">$9.99</td>
                          <td className="py-4 px-2">$16.99</td>
                          <td className="py-4 px-2">$27.99</td>
                          <td className="py-4 px-2">$44.99+</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-2 font-medium">Resin</td>
                          <td className="py-4 px-2">$12.99</td>
                          <td className="py-4 px-2">$24.99</td>
                          <td className="py-4 px-2">$39.99</td>
                          <td className="py-4 px-2">$59.99+</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-2 font-medium">Nylon</td>
                          <td className="py-4 px-2">$14.99</td>
                          <td className="py-4 px-2">$29.99</td>
                          <td className="py-4 px-2">$49.99</td>
                          <td className="py-4 px-2">$79.99+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Prices are base production costs. Designers set their own
                    prices above these costs. Complexity and special features
                    may affect final pricing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Shipping Pricing */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shipping Options</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer multiple shipping options to meet your needs and
                timeline.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Standard Shipping</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$4.99</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">5-7 business days</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tracking included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Available nationwide</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl">Express Shipping</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$9.99</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">2-3 business days</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tracking included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Available nationwide</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">International</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$19.99+</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">7-14 business days</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tracking included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Available to most countries</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Customs forms handled</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Free standard shipping on all orders over $50
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Pricing FAQs
            </h2>

            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Are there any hidden fees?
                </h3>
                <p className="text-gray-600">
                  No, our pricing is completely transparent. The only additional
                  costs would be for shipping or any custom features you might
                  request for your designs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will take effect at the start of your next billing
                  cycle.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How and when do I get paid as a designer?
                </h3>
                <p className="text-gray-600">
                  Designers are paid monthly for all sales from the previous
                  month. Payments are made via PayPal or direct bank transfer on
                  the 15th of each month, provided you've reached the minimum
                  payout threshold of $50.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is there a minimum order quantity for dropshippers?
                </h3>
                <p className="text-gray-600">
                  No, there's no minimum order quantity. You can sell a single
                  item or thousands - we'll handle the production and
                  fulfillment regardless of order size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our platform today and start growing your 3D printing
              business.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
