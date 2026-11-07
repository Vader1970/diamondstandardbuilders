"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(!reduce.matches);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    const play = video.play();
    if (play) play.catch(() => undefined);
  }, [showVideo]);

  return (
    <div className="ds-hero-media-wrap" aria-hidden="true">
      <Image
        src="/images/hero-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={85}
        className="ds-hero-media"
      />
      {showVideo ? (
        <video
          ref={videoRef}
          className="ds-hero-video"
          src="/videos/hero.mp4"
          poster="/images/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : null}
      <div className="ds-hero-shade-x" />
      <div className="ds-hero-shade-y" />
    </div>
  );
}
