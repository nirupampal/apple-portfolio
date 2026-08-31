"use client";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "@/firebase";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function safeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
}

export function uploadPortfolioImage(
  file: File,
  folder: string,
  onProgress?: (progress: number) => void,
) {
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Please choose an image file."));
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return Promise.reject(new Error("Images must be smaller than 10 MB."));
  }

  const filename = `${Date.now()}-${safeSegment(file.name)}`;
  const storageRef = ref(storage, `portfolio/${safeSegment(folder)}/${filename}`);
  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
    cacheControl: "public,max-age=31536000,immutable",
  });

  return new Promise<string>((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        onProgress?.(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      reject,
      async () => resolve(await getDownloadURL(task.snapshot.ref)),
    );
  });
}
