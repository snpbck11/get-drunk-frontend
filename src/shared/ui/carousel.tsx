"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib";

interface ICarouselProps {
  links: string[];
  className?: string;
}

export function Carousel({ links, className }: ICarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (links.length === 0) return null;

  return (
    <div className="relative group">
      <div ref={containerRef} className="snap-x snap-mandatory flex overflow-x-auto no-scrollbar">
        {links.map((link, index) => (
          <div
            key={index}
            className={cn(
              "snap-center snap-always flex-shrink-0 w-[90%] relative",
              "h-64 md:h-75 mx-2 first:ml-0 last:mr-0",
              className
            )}>
            <Image src={link} alt="" fill className="object-cover object-center rounded-2xl" />
          </div>
        ))}
      </div>
      {links.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "bg-black/50 hover:bg-black/70 text-white rounded-full p-2",
              "transition-opacity opacity-0 group-hover:opacity-100"
            )}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "bg-black/50 hover:bg-black/70 text-white rounded-full p-2",
              "transition-opacity opacity-0 group-hover:opacity-100"
            )}>
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {links.map((link, index) => (
              <button
                key={link}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white w-8" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
