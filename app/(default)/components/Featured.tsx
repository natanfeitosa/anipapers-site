"use client";

import useInfiniteRequest from "@/hooks/useInfiniteRequest";
import WallpapersList from "@/ui/components/WallpapersList";
import { IWallpaperItem } from "@/types";

export default function Featured() {
  const queryKey = `@featureds`;
  const response = useInfiniteRequest<IWallpaperItem>(queryKey, {
    url: "search/ ",
    params: { ordering: "MV" },
  });

  return (
    <div className="container px-4">
      <p className="font-semibold">EM DESTAQUE:</p>
      <WallpapersList {...response} />
    </div>
  );
}
