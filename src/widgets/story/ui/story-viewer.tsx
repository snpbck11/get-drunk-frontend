"use client";

import { IOrganization } from "@/entities/organization";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrganizationStory } from "./organization-story";

interface StoryViewerProps {
  organizations: IOrganization[];
  initialStoryId?: string;
}

export function StoryViewer({ organizations, initialStoryId }: StoryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(3);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastOrgRef = useRef<HTMLDivElement>(null);

  const scrollToNextOrganization = useCallback(() => {
    if (!containerRef.current) return;
    if (activeIndex >= loadedCount - 1) return;

    const container = containerRef.current;
    const nextPosition = (activeIndex + 1) * container.clientHeight;

    container.scrollTo({
      top: nextPosition,
      behavior: "smooth",
    });
  }, [activeIndex, loadedCount]);

  const scrollToPreviousOrganization = useCallback(() => {
    if (!containerRef.current) return;
    if (activeIndex <= 0) return;

    const container = containerRef.current;
    const prevPosition = (activeIndex - 1) * container.clientHeight;

    container.scrollTo({
      top: prevPosition,
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < organizations.length) {
          setLoadedCount((prev) => Math.min(prev + 2, organizations.length));
        }
      },
      { threshold: 0.5 }
    );

    if (lastOrgRef.current) {
      observer.observe(lastOrgRef.current);
    }

    return () => observer.disconnect();
  }, [loadedCount, organizations.length]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar" // избавиться от етой хуеты что снизу
    >
      {organizations.slice(0, loadedCount).map((org, index) => {
        let storyIndex = 0;
        if (index === 0 && initialStoryId) {
          const foundIndex = org.stories?.findIndex((s) => s.id === initialStoryId);
          if (foundIndex !== undefined && foundIndex !== -1) {
            storyIndex = foundIndex;
          }
        }

        return (
          <div
            key={org.id}
            ref={index === loadedCount - 1 ? lastOrgRef : null}
            className="h-[97%] snap-start">
            <OrganizationStory
              organization={org}
              isActive={index === activeIndex}
              initialStoryIndex={index === 0 ? storyIndex : 0}
              onComplete={scrollToNextOrganization}
              onPrevious={scrollToPreviousOrganization}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
            />
          </div>
        );
      })}
    </div>
  );
}
