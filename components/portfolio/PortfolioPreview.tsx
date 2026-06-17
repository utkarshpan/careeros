"use client";

import React, { useRef } from "react";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PortfolioPreviewProps {
  html: string;
  onRegenerate?: () => void;
  isLoading?: boolean;
}

export default function PortfolioPreview({ html, onRegenerate, isLoading }: PortfolioPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-portfolio.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Portfolio downloaded!", { description: "Open the HTML file in any browser" });
  };

  const openInNewTab = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <div className="bg-background rounded-lg px-3 py-1 text-xs text-muted-foreground border border-border ml-2">
            my-portfolio.html
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Regenerate
            </button>
          )}
          <button
            onClick={openInNewTab}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <ExternalLink className="w-3 h-3" /> Preview
          </button>
          <button
            onClick={downloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all"
          >
            <Download className="w-3 h-3" /> Download
          </button>
        </div>
      </div>

      {/* iframe Preview */}
      <div className="relative" style={{ height: "600px" }}>
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-muted-foreground font-medium">Generating your portfolio...</p>
            <p className="text-xs text-muted-foreground mt-1">This may take 15-30 seconds</p>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            srcDoc={html}
            className="w-full h-full border-0"
            title="Portfolio Preview"
            sandbox="allow-same-origin"
          />
        )}
      </div>
    </div>
  );
}
