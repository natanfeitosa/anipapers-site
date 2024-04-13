"use client";

import Masonry from "@/ui/components/Masonry";
import { WallpapersListSkeletonProps } from "./types";

export default function Skeleton(props: WallpapersListSkeletonProps) {
  return (
    <div className="animate-pulse">
      <Masonry
        className="flex w-full gap-2 md:gap-3 lg:gap-4 mt-3"
        columnClassName="masonry-col"
        breakpointCols={props.breakpointCols}
      >
        {new Array(12).fill(null).map((_, idx) => (
          <div key={idx} className="w-full aspect-[9/16] bg-slate-600" />
        ))}
      </Masonry>
      <div className="my-3 mx-auto h-5 w-[168px] bg-slate-600" />
    </div>
  );
}
