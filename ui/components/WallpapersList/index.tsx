"use client";

import { memo, useMemo, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import dynamic from "next/dynamic";
import Masonry from "@/ui/components/Masonry";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useInfiniteRequestReturn } from "@/hooks/useInfiniteRequest";
import { IWallpaperItem } from "@types";
import { WallpapersListSkeletonProps } from "./types";
import WallpaperItem from "./WallpaperItem";

type WallpapersListProps = WallpapersListSkeletonProps &
  Omit<useInfiniteRequestReturn<IWallpaperItem>, "reponses">;

function WallpapersList(props: WallpapersListProps) {
  const target = useRef<HTMLDivElement | null>(null);
  const isFirstLoading = useMemo(
    () => props.isLoading && props.data.length < 1,
    [props]
  );

  useIntersectionObserver({
    enabled: props.hasNextPage,
    target,
    // root,
    rootMargin: "30px",
    onIntersect() {
      if (isFirstLoading || props.isFetchingNextPage) return;
      props.fetchNextPage();
    },
  });

  if (isFirstLoading) {
    const Skeleton = dynamic(() => import("./Skeleton"));
    return <Skeleton />;
  }

  return (
    <>
      <Masonry
        className="flex w-full gap-2 md:gap-3 lg:gap-4 mt-3"
        columnClassName="masonry-col"
      >
        {props.data.map((wallpaper) => (
          <WallpaperItem key={wallpaper.id} {...wallpaper} />
        ))}
      </Masonry>

      <div ref={target} className="p-4 m-1 w-full text-center font-bold">
        <BottomElement
          isFetchingNextPage={props.isFetchingNextPage}
          hasData={props.data.length > 0}
        />
      </div>
    </>
  );
}

const BottomElement = ({
  isFetchingNextPage,
  hasData,
}: Record<"isFetchingNextPage" | "hasData", boolean>) => {
  if (isFetchingNextPage) {
    return (
      <div className="h-center flex-col font-normal">
        <FaSpinner className="h-8 w-8 animate-spin m-2" />
        <p>Carregando mais</p>
      </div>
    );
  }

  if (!isFetchingNextPage && hasData) {
    return <p>Não há mais o que carregar</p>;
  }

  return <p>Não foi possível encontrar nada por enquanto</p>;
};

export default memo(WallpapersList);
