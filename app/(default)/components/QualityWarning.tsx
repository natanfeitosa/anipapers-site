"use client";

import { DOMAttributes, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { FaExclamationTriangle } from "react-icons/fa";
// import useLatestCallback from "use-latest-callback";

const key = "showWarning";

export default function QualityWarning() {
  const [show, setShow] = useState(true);
  const [neverShow, setNeverShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = show && !neverShow ? "hidden" : "";
  }, [show, neverShow]);

  useEffect(() => {
    const _neverShow = JSON.parse(getCookie(key) || "false");
    setNeverShow(_neverShow);

    if (_neverShow) {
      setShow(_neverShow);
    }
  }, []);

  if (!show || neverShow) {
    return null;
  }

  const hideModal: DOMAttributes<HTMLElement>["onClick"] = (event) => {
    if (typeof event.defaultPrevented != "undefined") {
      event.preventDefault();
    }

    if ((event.target as HTMLElement).classList.contains("close-modal")) {
      setShow(false);
    }
  };

  return (
    <div
      className="absolute z-20 top-0 right-0 bottom-0 left-0 h-center justify-center close-modal backdrop-blur-sm"
      onClick={hideModal}
    >
      <div className="py-4 px-6 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 w-[min(90%,380px)]">
        <FaExclamationTriangle className="mb-3 mx-auto h-12 w-12 text-yellow-500" />
        <p className="h4 leading-8 text-yellow-500 h-fit text-center">
          Por motivos de performance, as imagens no grid podem não estar com
          qualidade total, clique nelas para ver com a melhor qualidade
        </p>
        <div className="flex flex-col mt-5 pt-4 border-t border-slate-300 dark:border-slate-700 gap-y-1.5">
          <button
            className="px-1.5 py-1 hover:opacity-80"
            onClick={() => {
              setCookie(key, "true");
              setNeverShow(true);
            }}
            data-unanimated
          >
            Não mostrar da próxima vez
          </button>
          <button className="px-1.5 py-1 font-bold text-red-400 hover:text-red-500 close-modal">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
