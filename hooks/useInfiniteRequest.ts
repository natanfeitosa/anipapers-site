import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { IApiResponse, RequestOptions } from "@types";
import api from "@/lib/api";

export default function useInfiniteRequest<R = unknown>(
  queryKey: string,
  { url, ...config }: Omit<RequestOptions, 'method'> & { url: string }
) {
  config.params ??= {};
  config.params.page_size ??= 30;

  const {
    data: responses,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [queryKey] as Readonly<Array<string>>,
    async queryFn({ pageParam: page }) {
      return await api.get<IApiResponse<R, true>>(url, {
        ...config,
        params: { ...config.params, page },
      });
    },
    getPreviousPageParam: ({ data }) => data.previous,
    getNextPageParam: ({ data }) => data.next,
    initialPageParam: 1,
  });

  const data = useMemo(() => {
    if (!responses || !responses.pages) return [];
    return responses.pages.flatMap((page) => page.data.results);
  }, [responses]);

  return {
    responses,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    hasPreviousPage,
    isRefetching,
    // refetchTotally
  };
}

export type useInfiniteRequestReturn<D> = ReturnType<
  typeof useInfiniteRequest<D>
>;
