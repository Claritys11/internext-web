import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format string tanggal ke format standar Indonesia (contoh: "19 September 2026")
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format waktu ke format jam standar Indonesia dengan zona waktu WIB (contoh: "09.30 WIB")
 */
export function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${hours}.${minutes} WIB`;
  } catch {
    return "";
  }
}

/**
 * Format tanggal dan jam lengkap standar Indonesia (contoh: "19 September 2026, 09.30 WIB")
 */
export function formatDateTime(dateStr: string, options?: { withWeekday?: boolean }): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const dateFormatted = d.toLocaleDateString("id-ID", {
      ...(options?.withWeekday ? { weekday: "long" } : {}),
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (dateStr.includes("T") || dateStr.includes(":") || dateStr.includes(" ")) {
      const hours = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return `${dateFormatted} • ${hours}.${minutes} WIB`;
    }
    return dateFormatted;
  } catch {
    return dateStr;
  }
}
