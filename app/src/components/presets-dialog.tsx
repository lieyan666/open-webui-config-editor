"use client";

import { useState } from "react";
import { usePresets } from "@/lib/presets-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings2, X, Plus } from "lucide-react";

export function PresetsDialog() {
  const {
    tags,
    owners,
    profileImages,
    addTag,
    removeTag,
    addOwner,
    removeOwner,
    addProfileImage,
    removeProfileImage,
  } = usePresets();

  const [newTag, setNewTag] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newImgLabel, setNewImgLabel] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 gap-1.5 text-muted-foreground hover:text-primary"
        >
          <Settings2 className="w-3 h-3" />
          Presets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold uppercase tracking-wider">
            Manage Presets
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="tags">
          <TabsList className="h-8 bg-muted/30 w-full">
            <TabsTrigger value="tags" className="text-xs flex-1">
              Tags
            </TabsTrigger>
            <TabsTrigger value="owners" className="text-xs flex-1">
              Owners
            </TabsTrigger>
            <TabsTrigger value="images" className="text-xs flex-1">
              Profile Images
            </TabsTrigger>
          </TabsList>

          {/* Tags */}
          <TabsContent value="tags" className="mt-3 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs gap-1 pr-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive transition-colors ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="New tag..."
                className="h-8 text-xs bg-input/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTag.trim()) {
                    addTag(newTag.trim());
                    setNewTag("");
                  }
                }}
              />
              <Button
                size="sm"
                variant="secondary"
                className="h-8 text-xs gap-1"
                onClick={() => {
                  if (newTag.trim()) {
                    addTag(newTag.trim());
                    setNewTag("");
                  }
                }}
              >
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>
          </TabsContent>

          {/* Owners */}
          <TabsContent value="owners" className="mt-3 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {owners.map((owner) => (
                <Badge
                  key={owner}
                  variant="secondary"
                  className="text-xs gap-1 pr-1"
                >
                  {owner}
                  <button
                    onClick={() => removeOwner(owner)}
                    className="hover:text-destructive transition-colors ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="New owner..."
                className="h-8 text-xs bg-input/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newOwner.trim()) {
                    addOwner(newOwner.trim());
                    setNewOwner("");
                  }
                }}
              />
              <Button
                size="sm"
                variant="secondary"
                className="h-8 text-xs gap-1"
                onClick={() => {
                  if (newOwner.trim()) {
                    addOwner(newOwner.trim());
                    setNewOwner("");
                  }
                }}
              >
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>
          </TabsContent>

          {/* Profile Images */}
          <TabsContent value="images" className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {profileImages.map((img) => (
                <div
                  key={img.url}
                  className="flex items-center gap-2 px-2 py-1.5 rounded border border-border bg-muted/20 group"
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-6 h-6 rounded object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="text-xs flex-1 truncate">{img.label}</span>
                  <button
                    onClick={() => removeProfileImage(img.url)}
                    className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newImgLabel}
                  onChange={(e) => setNewImgLabel(e.target.value)}
                  placeholder="Label (e.g. OpenAI)"
                  className="h-8 text-xs bg-input/50 w-32"
                />
                <Input
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  placeholder="Image URL..."
                  className="h-8 text-xs bg-input/50 flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newImgLabel.trim() && newImgUrl.trim()) {
                      addProfileImage(newImgLabel.trim(), newImgUrl.trim());
                      setNewImgLabel("");
                      setNewImgUrl("");
                    }
                  }}
                />
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 text-xs gap-1 w-full"
                onClick={() => {
                  if (newImgLabel.trim() && newImgUrl.trim()) {
                    addProfileImage(newImgLabel.trim(), newImgUrl.trim());
                    setNewImgLabel("");
                    setNewImgUrl("");
                  }
                }}
              >
                <Plus className="w-3 h-3" />
                Add Image
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
