"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface PresetsContextType {
  tags: string[];
  owners: string[];
  profileImages: { label: string; url: string }[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addOwner: (owner: string) => void;
  removeOwner: (owner: string) => void;
  addProfileImage: (label: string, url: string) => void;
  removeProfileImage: (url: string) => void;
}

const DEFAULT_OWNERS = [
  "openai",
  "anthropic",
  "google",
  "deepseek",
  "alibaba",
  "zhipu",
  "moonshot",
  "xai",
];

const DEFAULT_PROFILE_IMAGES = [
  { label: "OpenAI", url: "https://static.lieyan.work/img/ai-icon/openai.png" },
  { label: "Anthropic", url: "https://static.lieyan.work/img/ai-icon/anthropic.png" },
  { label: "Google", url: "https://static.lieyan.work/img/ai-icon/google.png" },
  { label: "DeepSeek", url: "https://static.lieyan.work/img/ai-icon/deepseek.png" },
  { label: "Alibaba/Qwen", url: "https://static.lieyan.work/img/ai-icon/qwen.png" },
  { label: "Zhipu/GLM", url: "https://static.lieyan.work/img/ai-icon/zhipu.png" },
  { label: "Moonshot/Kimi", url: "https://static.lieyan.work/img/ai-icon/moonshot.png" },
  { label: "xAI/Grok", url: "https://static.lieyan.work/img/ai-icon/xai.png" },
];

const PresetsContext = createContext<PresetsContextType | null>(null);

export function PresetsProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<string[]>([
    "DeepSeek",
    "OpenAI",
    "Anthropic",
    "Google",
    "MoE",
    "Reasoning",
    "Vision",
    "Aliyun",
  ]);
  const [owners, setOwners] = useState<string[]>(DEFAULT_OWNERS);
  const [profileImages, setProfileImages] = useState(DEFAULT_PROFILE_IMAGES);

  const addTag = useCallback((tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  }, []);

  const removeTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const addOwner = useCallback((owner: string) => {
    setOwners((prev) => (prev.includes(owner) ? prev : [...prev, owner]));
  }, []);

  const removeOwner = useCallback((owner: string) => {
    setOwners((prev) => prev.filter((o) => o !== owner));
  }, []);

  const addProfileImage = useCallback((label: string, url: string) => {
    setProfileImages((prev) => {
      if (prev.some((p) => p.url === url)) return prev;
      return [...prev, { label, url }];
    });
  }, []);

  const removeProfileImage = useCallback((url: string) => {
    setProfileImages((prev) => prev.filter((p) => p.url !== url));
  }, []);

  return (
    <PresetsContext.Provider
      value={{
        tags,
        owners,
        profileImages,
        addTag,
        removeTag,
        addOwner,
        removeOwner,
        addProfileImage,
        removeProfileImage,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
}

export function usePresets() {
  const ctx = useContext(PresetsContext);
  if (!ctx) throw new Error("usePresets must be used within PresetsProvider");
  return ctx;
}
