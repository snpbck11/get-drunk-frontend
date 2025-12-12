"use client";

import { IOrganization } from "@/entities/organization";
import { cn } from "@/shared/lib";
import { getMediaUrl } from "@/shared/lib/utils";
import { SpinnerLoader } from "@/shared/ui";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { StoryDescription } from "../../../widgets/story/ui/story-description";

interface IStoryProps {
  organization: IOrganization;
  isActive: boolean;
  initialStoryIndex?: number;
  onComplete?: () => void;
  onPrevious?: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

const IMAGE_DURATION = 5000;

export function Story({
  organization,
  isActive,
  initialStoryIndex = 0,
  onComplete,
  onPrevious,
  isMuted,
  onMuteToggle,
}: IStoryProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(IMAGE_DURATION);
  const [isVideoReady, setIsVideoReady] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStory = organization.stories?.[currentStoryIndex];
  const totalStories = organization.stories?.length || 0;

  const handleNext = useCallback(() => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onComplete?.();
      setProgress(100);
    }
  }, [currentStoryIndex, totalStories, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      onPrevious?.();
    }
  }, [currentStoryIndex, onPrevious]);

  useEffect(() => {
    if (!isActive || isPaused || !isVideoReady) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / duration) * 100;

        if (newProgress >= 100) {
          handleNext();
          return 0;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStoryIndex, isPaused, duration, handleNext, isActive, isVideoReady]);

  const handleVideoLoadedData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration * 1000;
    setDuration(videoDuration);
    setIsVideoReady(true);
  };

  useEffect(() => {
    if (currentStory?.type === "image") {
      setDuration(IMAGE_DURATION);
      setIsVideoReady(true);
    } else if (currentStory?.type === "video") {
      setIsVideoReady(false);
    }
  }, [currentStory?.type, currentStory?.id]);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setCurrentStoryIndex(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      if (!isActive) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } else if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused, isActive]);

  if (!currentStory) return null;

  // настроить высоту видео и картинок, всё идёт по пизде

  return (
    <div className="relative w-full h-full md:flex xl:grid xl:grid-cols-3 justify-center pt-3">
      {isActive && (
        <StoryDescription
          containerClassName="hidden xl:flex"
          name={organization.name}
          logoUrl={organization.logo}
          caption={currentStory.caption}
        />
      )}
      <div className="flex w-full h-full justify-center xl:justify-start xl:col-span-2 xl:col-start-2">
        <div className="w-full max-w-[458px] aspect-[9/16] self-center rounded-3xl overflow-hidden relative shadow-[0px_0px_46px_0px_rgba(255,_255,_255,_0.05)]">
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
            {organization.stories?.map((story, index) => (
              <div key={story.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentStoryIndex
                        ? "100%"
                        : index === currentStoryIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute top-8 right-4 z-20 mt-4">
            {currentStory?.type === "video" && (
              <button
                onClick={onMuteToggle}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition">
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            )}
          </div>
          {currentStory.type === "video" ? (
            <div className="relative w-full h-full">
              {!isVideoReady && currentStory.thumbnailUrl && (
                <Image
                  src={getMediaUrl(currentStory.thumbnailUrl)}
                  alt="loading"
                  fill
                  className="object-cover blur-xl scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {!isVideoReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 z-10">
                  <SpinnerLoader />
                  <p className="text-white/80 text-sm">Загрузка...</p>
                </div>
              )}
              <video
                ref={videoRef}
                key={currentStory.id}
                src={getMediaUrl(currentStory.mediaUrl)}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500",
                  !isVideoReady ? "opacity-0" : "opacity-100"
                )}
                autoPlay
                muted={isMuted}
                playsInline
                onLoadedData={handleVideoLoadedData}
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <Image
                key={currentStory.id}
                src={getMediaUrl(currentStory.mediaUrl)}
                alt={currentStory.caption || "Story"}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={isActive}
              />
            </div>
          )}
          <StoryDescription
            logoUrl={organization.logo}
            name={organization.name}
            caption={currentStory.caption}
            containerClassName="xl:hidden absolute bottom-0 left-0"
          />
        </div>
      </div>
      <div className="absolute inset-0 flex z-10 w-full">
        <div className="w-full cursor-pointer" onClick={handlePrevious} />
        <div
          className="min-w-[358px] cursor-pointer"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
        />
        <div className="w-full cursor-pointer" onClick={handleNext} />
      </div>
    </div>
  );
}
