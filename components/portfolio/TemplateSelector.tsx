"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: string;
}

const TEMPLATES: Template[] = [
  {
    id: "modern",
    name: "Modern Dark",
    description: "Sleek dark theme with gradient accents. Perfect for tech roles.",
    preview: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    colors: "from-purple-500 to-indigo-500",
  },
  {
    id: "minimal",
    name: "Clean Minimal",
    description: "White, elegant, and distraction-free. Great for professionals.",
    preview: "bg-white border-2 border-gray-100",
    colors: "from-gray-900 to-gray-600",
  },
  {
    id: "bold",
    name: "Bold & Vibrant",
    description: "Colorful gradients that make an unforgettable first impression.",
    preview: "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600",
    colors: "from-orange-500 to-pink-500",
  },
];

interface TemplateSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Choose Template</label>
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 group ${
              selected === template.id
                ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/40 hover:scale-[1.01]"
            }`}
          >
            {/* Preview */}
            <div className={`h-24 w-full ${template.preview} flex items-center justify-center relative`}>
              {/* Fake content blocks */}
              <div className="absolute inset-0 p-2 flex flex-col gap-1 justify-center">
                <div className="h-2 w-12 bg-white/30 rounded-full" />
                <div className="h-1.5 w-20 bg-white/20 rounded-full" />
                <div className="h-1.5 w-16 bg-white/20 rounded-full" />
              </div>
              {selected === template.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
            {/* Label */}
            <div className="p-3 bg-card text-left">
              <p className="font-bold text-foreground text-xs">{template.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
