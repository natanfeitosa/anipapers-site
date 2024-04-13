"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV != "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      document.querySelector("body")!.oncontextmenu = (e) => e.preventDefault();
    }, []);
  }

  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
