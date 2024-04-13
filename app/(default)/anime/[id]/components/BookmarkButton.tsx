"use client";

import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton(
  props: Record<"disabled" | "isFollowing", boolean>
) {
  const [isFollowing, setIsFollowing] = useState(props.isFollowing);

  return (
    <form>
      <button
        className="p-2 h-center gap-x-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md"
        {...(props.disabled ? { title: "Precisa estar logado" } : {})}
      >
        {isFollowing ? (
          <FaBookmark className="size-4 md:size-6" />
        ) : (
          <FaRegBookmark className="size-4 md:size-6" />
        )}
        <span>{isFollowing ? "Não seguir" : "Seguir"}</span>
      </button>
    </form>
  );
}
