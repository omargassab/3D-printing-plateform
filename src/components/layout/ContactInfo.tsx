import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3 text-gray-400">
          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p>Technopole El Ghazala</p>
            <p>Ariana 2088, Tunisia</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-400">
          <Phone className="h-5 w-5 flex-shrink-0" />
          <p>+216 71 123 456</p>
        </div>

        <div className="flex items-center space-x-3 text-gray-400">
          <Mail className="h-5 w-5 flex-shrink-0" />
          <p>contact@3dprinttunisia.tn</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
