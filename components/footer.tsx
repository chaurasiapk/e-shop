import { categories } from "@/lib/data";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const customerServices = [
  "FAQ",
  "Terms & Conditions",
  "Privacy Policy",
  "Return & Refund Policy",
  "Report Infringement",
  "Grievance Redressal",
  "E-Waste Policy",
  "Cancellation & Return Policy",
  "Shipping & Delivery Policy",
  "ShopLocator",
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-footer text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-white/90">
              {categories.map((item) => (
                <li key={item.category_id}>
                  <Link href={`/${item.category_id}`} className="hover:text-white hover:underline">
                    {item.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Services</h3>
            <ul className="space-y-2 text-sm text-white/90">
              {customerServices.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium">Whats App</p>
                  <p className="text-white/80">+1 202-918-2132</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-white/80">+1 202-918-2132</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-semibold mb-3">Download App</p>
              <div className="flex gap-3">
                <button className="bg-black text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                  App Store
                </button>
                <button className="bg-black text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                  Google Play
                </button>
              </div>
            </div>
          </div>

        
        </div>
      </div>

      <div className="bg-footer-dark text-white/70 text-sm text-center py-4">
        <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
}
