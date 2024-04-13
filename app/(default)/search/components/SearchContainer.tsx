"use client";

import type { ReactNode, SelectHTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WallpapersList from "@/ui/components/WallpapersList";
import useInfiniteRequest from "@/hooks/useInfiniteRequest";
import { WallpapersOrdering, IWallpaperItem } from "@/types";

export default function SearchContainer() {
  const router = useRouter();
  const sparams = useSearchParams();

  const term = sparams.get("term")!;
  const [ordering, setOrdering] = useState<WallpapersOrdering>(
    () => sparams.get("ordering") as WallpapersOrdering
  );

  const queryKey = `@search:${term}:${ordering}`;
  const response = useInfiniteRequest<IWallpaperItem>(queryKey, {
    url: "search/",
    params: { text: term, ordering },
  });

  useEffect(() => {
    const query = new URLSearchParams();

    if (term) {
      query.append("term", term);
    }

    if (ordering) {
      query.append("ordering", ordering);
    }

    const squery = `${query}`;
    if (squery) {
      router.push("?" + squery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, ordering]);

  const selectOrdering: SelectHTMLAttributes<HTMLSelectElement>["onChange"] = ({
    target,
  }) => {
    setOrdering(
      target.options[target.selectedIndex].value as WallpapersOrdering
    );
  };

  const HeaderSerchContainer = useMemo(() => {
    const Container = ({ children }: { children: ReactNode }) => (
      <div
        className={
          "wallpapers-list-header" +
          (response.isLoading ? " animate-pulse" : "")
        }
      >
        {children}
      </div>
    );

    if (response.isLoading) {
      return (
        <Container>
          <div className="h-[24px] w-[168px] bg-slate-600" />
          <div className="h-[36px] w-[225px] bg-slate-600" />
        </Container>
      );
    }

    return (
      <Container>
        <p className="font-semibold m-0">
          {response.data.length} image{response.data.length != 1 ? "ns" : "m"}{" "}
          encontrada{response.data.length != 1 ? "s" : ""}
        </p>

        <div className="h-center">
          <small className="pr-2" id="o-label">
            Ordenação:
          </small>
          <select
            onChange={selectOrdering}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full px-1.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            defaultValue={ordering}
            aria-labelledby="o-label"
          >
            <option value={""}>Aleatório</option>
            <option value="ML">Mais curtidos</option>
            <option value="MV">Mais vistos</option>
            <option value="AD">Data de adição</option>
          </select>
        </div>
      </Container>
    );
  }, [response.isLoading, response.data.length, ordering]);

  return (
    <div className="px-4">
      {HeaderSerchContainer}
      <WallpapersList {...response} />
    </div>
  );
}
