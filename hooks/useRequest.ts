import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { RequestOptions } from "@/types";

export default function useRequest<R = unknown>(
  queryKey: string,
  { url, ...config }: RequestOptions & { url: string }
) {
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn() {
      return api.get<R>(url, config);
    },
  });

  return { response, isLoading, refetch, data: response?.data };
}

export type useRequestReturn<D> = ReturnType<typeof useRequest<D>>;
