import { screens } from "@/shared/config";
import { useEffect, useState } from "react";

export function useMediaQuery(bp: keyof typeof screens) {
  const query = `(min-width: ${screens[bp]})`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = () => setMatches(media.matches);
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
