import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import type { DOMAttributes } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { IWallpaperItem, ISimplePayload } from "@/types";
import api from "@/lib/api";

function WallpaperItem(
  props: IWallpaperItem & { handleLike?: IWallpaperItem }
) {
  return (
    <div className="wallpaper-item">
      <Link
        className="wallpaper-item-link"
        href={`/wallpaper/${props.id}`}
        data-unanimated
      >
        <Image
          key={props.id}
          src={props.source}
          alt="wallpaper"
          loading="lazy"
          width={200}
          height={200}
          quality={50}
        />
      </Link>

      {/* <button
        className="wallpaper-item-like"
        onClick={onClickLikeButton}
        {...(session.status == 'unauthenticated' ? { title: "Precisa estar logado" } : {})}
      >
        {props.is_liked ? <FaHeart /> : <FaRegHeart />}
        <span className="sr-only">Curtir papel de parede</span>
      </button> */}

      <div className="wallpaper-item-footer">
        {props.tags.map((tag, idx) => (
          <Link
            key={idx}
            href={"/search?term=" + tag}
            className="px-1 font-bold text-white hover:text-gray-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(WallpaperItem);
