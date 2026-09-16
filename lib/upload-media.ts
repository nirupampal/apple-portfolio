"use client";

import { supabase, PORTFOLIO_STORAGE_BUCKET } from "@/lib/supabase";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function safeSegment(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image"
  );
}

export async function uploadPortfolioImage(
  file: File,
  folder: string,
  onProgress?: (progress: number) => void,
) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Images must be smaller than 10 MB.");
  }

  onProgress?.(30);
  const filename = `${Date.now()}-${safeSegment(file.name)}`;
  const filePath = `${safeSegment(folder)}/${filename}`;

  const { data, error } = await supabase.storage
    .from(PORTFOLIO_STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: true,
    });

  if (error) {
    console.error("Supabase storage upload error:", error);
    if (error.message?.toLowerCase().includes("not found") || (error as { statusCode?: string }).statusCode === "404") {
      throw new Error("Supabase storage bucket 'portfolio' not found. Please create a public bucket named 'portfolio' in your Supabase dashboard, or paste an image URL directly.");
    }
    throw new Error(error.message || "Failed to upload image to Supabase.");
  }

  onProgress?.(100);

  const { data: publicUrlData } = supabase.storage
    .from(PORTFOLIO_STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
