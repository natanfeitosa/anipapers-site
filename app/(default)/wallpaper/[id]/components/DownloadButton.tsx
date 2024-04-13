"use client";

import { FaDownload } from "react-icons/fa";

interface DownloadButtonProps {
  imageLink: string;
  animeId: number | string;
  wallpaperId: number | string;
}

const event = ({ action, category, label, value }: any) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default function DownloadButton({
  imageLink,
  ...props
}: DownloadButtonProps) {
  function onClickButton() {
    const now = new Date()
      .toLocaleString()
      .replace(/\:|\//g, "_")
      .replace(/\s/, "-");

    var link = document.createElement("a");
    link.download = `anipapers_${now}.png`;
    link.href = imageLink;

    document.body.appendChild(link);
    link.click();
    (window as any).gtag("event", "download", props);

    document.body.removeChild(link);
  }

  return (
    <button
      data-unanimated
      className="h-center justify-center px-2 py-1 w-5/12 rounded-lg border-2 border-rose-500 transition-all hover:bg-red-600/20"
      onClick={onClickButton}
    >
      <FaDownload /> <span className="font-semibold p-2">Baixar</span>
    </button>
  );
}
