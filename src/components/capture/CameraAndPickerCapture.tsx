"use client";

import { ImagePlus, Video } from "lucide-react";
import { useT } from "@/components/I18nProvider";
import { ShutterButton } from "./ShutterButton";
import type { CaptureProps } from "./types";
import { useFileInput } from "./useFileInput";

export function CameraAndPickerCapture({ onFiles, disabled, event }: CaptureProps) {
  const t = useT();
  // Separate photo and video cameras: a single "photo or video" input makes
  // Android show a chooser or the gallery instead of opening the camera.
  const camera = useFileInput(onFiles, { camera: true, multiple: false });
  const recorder = useFileInput(onFiles, { camera: true, multiple: false, video: "only" });
  const picker = useFileInput(onFiles, { camera: false, multiple: true, video: Boolean(event.videos) });
  return (
    <div className="flex flex-col items-center gap-3">
      {camera.input}
      {recorder.input}
      {picker.input}
      <ShutterButton onClick={camera.open} disabled={disabled} label={t("guest.takePhoto")} />
      <span className="text-base font-semibold text-accent-ink">{t("guest.takePhoto")}</span>
      {event.videos ? (
        <button
          type="button"
          onClick={recorder.open}
          disabled={disabled}
          className="mt-1 inline-flex h-11 items-center gap-2 rounded-lg border-2 border-accent-ink px-4 text-sm font-semibold text-accent-ink disabled:opacity-35"
        >
          <Video className="size-4" aria-hidden />
          Record a video
        </button>
      ) : null}
      <button
        type="button"
        onClick={picker.open}
        disabled={disabled}
        className="mt-2 inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium text-accent-ink underline decoration-accent-ink/40 underline-offset-4 hover:decoration-accent-ink disabled:opacity-35"
      >
        <ImagePlus className="size-4" aria-hidden />
        {t(event.videos ? "guest.pickMedia" : "guest.pickPhotos")}
      </button>
    </div>
  );
}
