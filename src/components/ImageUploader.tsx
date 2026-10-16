"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadCloud, Image as ImageIcon, X, RefreshCw, AlertCircle } from "lucide-react";
import { SUPPORTED_IMAGE_MIMES, MAX_IMAGE_SIZE_BYTES } from "@/lib/validation/listing-schema";

interface ImageUploaderProps {
  imageDataUrl: string;
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
}

export function ImageUploader({
  imageDataUrl,
  onChange,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);

    // Validate MIME type
    if (!SUPPORTED_IMAGE_MIMES.includes(file.type as any)) {
      setError("Please upload a valid JPEG, PNG, WebP, or AVIF image.");
      return;
    }

    // Validate Size
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setError(`Image size (${sizeMb}MB) exceeds the 5MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplaceClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-700 tracking-wide uppercase">
          Product Photo <span className="text-[#B8502A]">*</span>
        </label>
        <span className="text-[11px] text-stone-400">
          JPEG, PNG, WebP • Max 5MB
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={SUPPORTED_IMAGE_MIMES.join(",")}
        className="hidden"
        disabled={disabled}
        aria-label="Upload product image"
      />

      {imageDataUrl ? (
        <div className="relative group rounded-xl border border-stone-200 overflow-hidden bg-stone-100 aspect-square max-h-72 w-full flex items-center justify-center shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageDataUrl}
            alt="Uploaded product preview"
            className="w-full h-full object-contain p-2"
          />

          {/* Action overlay */}
          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleReplaceClick}
              disabled={disabled}
              className="px-3 py-1.5 rounded-lg bg-white/95 text-stone-800 text-xs font-semibold hover:bg-white flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-semibold hover:bg-red-600 flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleReplaceClick}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? "border-[#B8502A] bg-[#FDF4F0]"
              : "border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50/50"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#B8502A] flex items-center justify-center">
            {isDragging ? (
              <ImageIcon className="w-6 h-6 animate-bounce" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">
              {isDragging ? "Drop your image here" : "Click to upload or drag & drop"}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Clear product photo on neutral or simple background works best
            </p>
          </div>
          <button
            type="button"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors pointer-events-none"
          >
            Browse File
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
