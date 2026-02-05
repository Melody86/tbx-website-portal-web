"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { getStaticUrl } from "@/lib/static"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Slide =
  | {
      type: "video"
      thumbnail?: string
      title: string
      description: string
      videoUrl: string
    }
  | {
      type: "image"
      image: string
      title: string
      description: string
      link?: string
    }

interface HeroCarouselProps {
  slides: Slide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPlaying) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
          {slide.type === "image" ? (
            <img
              src={getStaticUrl(slide.image) || ""}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={slide.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-balance">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">{slide.description}</p>
                  {slide.type === "image" && slide.link && (
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link href={slide.link}>了解更多</Link>
                    </Button>
                  )}
                  {slide.type === "video" && (
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      播放视频
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">上一张</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">下一张</span>
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`跳转到第 ${index + 1} 张`}
          />
        ))}
      </div>

    </div>
  )
}
