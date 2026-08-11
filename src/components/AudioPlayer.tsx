"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * duration;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (available === false) {
    return (
      <p className="rounded-xl border border-elevio-border bg-elevio-bg px-4 py-3 text-sm text-elevio-dark/50">
        Mostra audio urmează să fie adăugată aici.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-elevio-border bg-elevio-bg px-4 py-3">
      <audio
        ref={audioRef}
        src={available ? src : undefined}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />

      <button
        type="button"
        onClick={togglePlay}
        disabled={available === null}
        aria-label={isPlaying ? "Pauză" : "Redă"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-elevio-primary text-white transition-colors hover:bg-elevio-dark disabled:opacity-50"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="5" y="4" width="5" height="16" rx="1" />
            <rect x="14" y="4" width="5" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M7 4.5v15l13-7.5-13-7.5z" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        <div
          onClick={handleSeek}
          role="slider"
          aria-label="Progres redare"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          className="h-2 w-full cursor-pointer rounded-full bg-elevio-secondary/60"
        >
          <div
            className="h-2 rounded-full bg-elevio-accent transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs text-elevio-dark/45">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
