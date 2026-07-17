"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ISepecification } from "@/types/products";

interface ProductAccordionsProps {
  description: string;
  specifications: ISepecification;
  moreInfo?: string;
}

const sections = ["description", "specification", "more"] as const;
type Section = (typeof sections)[number];

export default function ProductAccordions({
  description,
  specifications,
  moreInfo="",
}: ProductAccordionsProps) {
  const [openSection, setOpenSection] = useState<Section>("description");

  const toggle = (section: Section) => {
    setOpenSection(section);
  };

  return (
    <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
      <AccordionItem
        title="Product Description"
        isOpen={openSection === "description"}
        onToggle={() => toggle("description")}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </AccordionItem>

      <AccordionItem
        title="Product Specification"
        isOpen={openSection === "specification"}
        onToggle={() => toggle("specification")}
      >
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.keys(specifications).map((key) => (
            <div key={key} className="text-sm">
              <dt className="text-gray-500 capitalize">{[key]}</dt>
              <dd className="font-medium text-gray-900">{specifications[key]}</dd>
            </div>
          ))}
        </dl>
      </AccordionItem>

      <AccordionItem
        title="More Information"
        isOpen={openSection === "more"}
        onToggle={() => toggle("more")}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{moreInfo}</p>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
