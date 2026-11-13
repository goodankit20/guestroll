"use client";

import { Video } from "lucide-react";
import { useT } from "@/components/I18nProvider";
import { ShutterButton } from "./ShutterButton";
import type { CaptureProps } from "./types";
import { useFileInput } from "./useFileInput";

/** Default: one shutter button that opens the phone's camera. */
export function CameraCapture({ onFiles, disabled, event }: CaptureProps) {
  const t = useT();
  // Separate photo and video cameras: a single "photo or video" input makes
  // Android show a chooser or the gallery instead of opening the camera.
  const camera = useFileInput(onFiles, { camera: true, multiple: false });
  const recorder = useFileInput(onFiles, { camera: true, multiple: false, video: "only" });
  return (
    <div className="flex flex-col items-center gap-3">
      {camera.input}
      {recorder.input}
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
    </div>
  );
}
