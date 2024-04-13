import { headers as headersHook } from "next/headers";

export function formatDisplayNumber(num: number | string) {
  if (typeof num == "string") {
    num = Number(num);
  }

  if (num >= 1e9) {
    return `${num / 1e9}B`;
  }

  if (num >= 1e6) {
    return `${num / 1e6}M`;
  }

  if (num >= 1e2) {
    return `${num / 1e2}k`;
  }

  return num;
}

export function generateNextImageUrl(
  src: string,
  width: number,
  quality = 75
): string {
  const encodedUrl = encodeURIComponent(src);
  // return `/_next/image?url=${encodedUrl}&w=${width}&q=${q}`;
  return `/_next/image?url=${encodedUrl}&w=${width}&q=${quality}${
    process.env.NEXT_DEPLOYMENT_ID
      ? `&dpl=${process.env.NEXT_DEPLOYMENT_ID}`
      : ""
  }`;
}

export function getNextPathRouteToRedirect(
  headers: ReturnType<typeof headersHook>,
  defaultRedirectTo: string = "/"
): string {
  if (headers.has("referer")) {
    return (
      new URL(headers.get("referer")!).searchParams.get("next") ??
      defaultRedirectTo
    );
  }

  return defaultRedirectTo;
}
