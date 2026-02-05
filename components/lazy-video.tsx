"use client"

import React from "react"

type LazyVideoProps = {
  src: string
  className?: string
  poster?: string
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function LazyVideo({
  src,
  className,
  poster,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const hasLoadedRef = React.useRef(false)

  React.useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    // Ensure we don't preload by default
    videoEl.preload = "none"

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const [entry] = entries
      if (!videoEl) return

      if (entry.isIntersecting) {
        if (!hasLoadedRef.current) {
          // Set src lazily when it first becomes visible
          videoEl.src = src
          hasLoadedRef.current = true
        }
        // Try to play when visible
        videoEl
          .play()
          .catch(() => {
            // Autoplay may be blocked; ignore
          })
      } else {
        // Pause when out of view to save resources
        videoEl.pause()
      }
    }

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    })

    observer.observe(videoEl)

    return () => {
      observer.disconnect()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      // Do not set src initially; it'll be assigned on intersection
    />
  )
}


