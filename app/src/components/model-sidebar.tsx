"use client";

import { useState, useMemo } from "react";
import { ModelConfig } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Copy,
  Trash2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  models: ModelConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function ModelSidebar({
  models,
  selectedId,
  onSelect,
  onDelete,
  onDuplicate,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = useMemo(() => {
    return models.filter((m) => {
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.id.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "active" && m.is_active) ||
        (filter === "inactive" && !m.is_active);
      return matchSearch && matchFilter;
    });
  }, [models, search, filter]);

  const activeCount = models.filter((m) => m.is_active).length;
  const inactiveCount = models.length - activeCount;

  return (
    <aside className="w-72 border-r border-border bg-sidebar flex flex-col shrink-0">
      {/* Search */}
      <div className="p-3 space-y-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-sidebar-accent border-sidebar-border"
          />
        </div>
        <div className="flex gap-1">
          {(
            [
              ["all", `All ${models.length}`],
              ["active", `Active ${activeCount}`],
              ["inactive", `Off ${inactiveCount}`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "text-[10px] px-2 py-0.5 rounded transition-colors",
                filter === key
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Model List */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {filtered.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelect(model.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md transition-all group cursor-pointer",
                "hover:bg-sidebar-accent",
                selectedId === model.id
                  ? "bg-sidebar-accent border-l-2 border-primary"
                  : "border-l-2 border-transparent"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Circle
                      className={cn(
                        "w-2 h-2 shrink-0",
                        model.is_active
                          ? "fill-emerald-500 text-emerald-500"
                          : "fill-muted-foreground/30 text-muted-foreground/30"
                      )}
                    />
                    <span className="text-xs font-medium truncate block">
                      {model.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground truncate block mt-0.5 pl-3.5">
                    {model.id}
                  </span>
                  {model.meta?.tags && model.meta.tags.length > 0 && (
                    <div className="flex gap-1 mt-1 pl-3.5 flex-wrap">
                      {model.meta.tags.slice(0, 3).map((t) => (
                        <Badge
                          key={t.name}
                          variant="secondary"
                          className="text-[9px] h-4 px-1.5 bg-muted/50"
                        >
                          {t.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-muted rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(model.id);
                      }}
                    >
                      <Copy className="w-3.5 h-3.5 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(model.id);
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              No models found
            </p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
