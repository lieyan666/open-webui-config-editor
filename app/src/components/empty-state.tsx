"use client";

import { Terminal } from "lucide-react";

export function EmptyState({ hasModels }: { hasModels: boolean }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
      <div className="relative">
        <div className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center mb-4">
          <Terminal className="w-8 h-8 text-primary/40" />
        </div>
        <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl" />
      </div>
      <p className="text-sm mt-2">
        {hasModels
          ? "Select a model to edit"
          : "Import a JSON config to get started"}
      </p>
      <p className="text-xs text-muted-foreground/60 mt-1">
        {hasModels
          ? "Click any model from the sidebar"
          : "Use the Import button in the header"}
      </p>
    </div>
  );
}
