"use client";

import { useEffect, useRef } from "react";
import type { DOMAttributes } from "react";
import Image from "next/image";

function getComputedHeight(elt: string | Element | null, defaultHeight = 0) {
  if (typeof elt == "string") {
    elt = document.querySelector(elt);
  }

  if (elt == null || elt == undefined) return defaultHeight;

  const computedStyle = getComputedStyle(elt).height;

  return Number(computedStyle.replace(/[^.\d]+/, ""));
}

export default function AnimeNotFound() {
  const notFoundInternalContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const notFoundContainer = document.querySelector<HTMLDivElement>("#nf");
    if (
      typeof window == "undefined" ||
      !notFoundInternalContainer.current ||
      !notFoundContainer
    ) {
      return;
    }

    const eventFunction = () => {
      const headerHeight = getComputedHeight("header", 0);
      const footerHeight = getComputedHeight("footer", 0);
      const notFoundHeight = getComputedHeight(
        notFoundInternalContainer.current,
        0
      );

      const height =
        window.innerHeight - (headerHeight + footerHeight);

      if(height < notFoundHeight) return

      notFoundContainer.style.height = `${height}px`;
    };

    eventFunction();

    document.addEventListener("DOMContentLoaded", eventFunction);
    window.addEventListener("resize", eventFunction);

    return () => {
      document.removeEventListener("DOMContentLoaded", eventFunction);
      window.removeEventListener("resize", eventFunction);
    };
  }, []);

  return (
    <div className="h-center justify-center" id="nf">
      <div className="p-2 m-2 h-fit w-fit" ref={notFoundInternalContainer}>
        <Image
          src="/spy-x-family-anya-crying.gif"
          alt="Anya Chorando"
          className="h-32 mx-auto"
          width={230}
          height={128}
        />

        <h1 className="mt-8 h4 w-fit opacity-80">
          Não consegui encontrar o anime que você queria
        </h1>
      </div>
    </div>
  );
}
