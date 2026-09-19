"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: "square" | "video" | "wide";
  helperText?: string;
}

export function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = "Unggah file gambar atau tempel URL...",
  aspectRatio = "video",
  helperText,
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 8MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengunggah gambar");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      setUploadError(err.message || "Terjadi kesalahan saat upload gambar");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-mono text-xs text-[#94A3B8]">{label}</label>
        {helperText && (
          <span className="text-[10px] font-mono text-[#64748B]">{helperText}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 items-start">
        {/* URL Input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F59E0B]"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-white"
              title="Hapus URL"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 text-xs font-semibold text-[#F59E0B] hover:text-[#EA580C] flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Mengunggah...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah Gambar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {uploadError && (
        <p className="text-[11px] text-[#EF4444] font-mono">{uploadError}</p>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative mt-2 p-1.5 bg-black/40 rounded-xl border border-white/10 inline-flex items-center gap-3">
          <div
            className={`relative rounded-lg overflow-hidden bg-white/5 border border-white/10 ${
              aspectRatio === "square"
                ? "w-14 h-14"
                : aspectRatio === "wide"
                ? "w-24 h-10"
                : "w-20 h-12"
            }`}
          >
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("/uploads/")}
            />
          </div>
          <div className="pr-3 text-[11px] font-mono text-[#94A3B8]">
            <span className="text-white block font-medium">Pratinjau Gambar</span>
            <span className="text-[10px] text-[#64748B] truncate max-w-[200px] block">
              {value}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
