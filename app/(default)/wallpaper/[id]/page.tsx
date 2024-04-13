import Image from "next/image";
import Link from "next/link";
import {
  FaHashtag,
  FaEye,
  FaHeart,
  FaDownload,
  FaRegHeart,
} from "react-icons/fa";
// import useRequest from "@/hooks/useRequest";
import api from "@/lib/api";
import { IWallpaperItem, SSRPageProps } from "@/types";
import { formatDisplayNumber } from "@/lib/helpers";
import DownloadButton from "./components/DownloadButton";

export default async function Wallpaper({
  params: { id: wallpaperId },
}: Required<SSRPageProps>) {
  // const queryKey = `@wallpapers:id=${wallpaperId}`
  // const { data, isLoading } = useRequest<IWallpaperItem>(queryKey, { url: `wallpapers/${wallpaperId}/` })
  const { data } = await api.get<IWallpaperItem>(`wallpapers/${wallpaperId}/`);
  // const data: Omit<IWallpaperItem, "added_at" | "id"> = {
  //   source:
  //     "https://i.pinimg.com/564x/dd/a0/f2/dda0f24e72b5cf31a56fa231df674122.jpg",
  //   likes_count: 10,
  //   views: 10,
  //   anime: 1,
  //   downloads: 2,
  //   is_liked: false,
  //   tags: ["Solo Leveling", "Sung", "Sombra"],
  // };

  return (
    <main className="container p-4">
      {/* <h1>Wallpaper do anime: {data.anime}</h1> */}
      <div className="w-4/5 max-[430px]:w-full mx-auto md:max-lg:w-full max-md:flex-col flex bg-slate-300 dark:bg-slate-700 rounded-2xl shadow p-1">
        <div className="rounded-[inherit] grow-1 shrink-0 basis-full md:basis-[47%] lg:basis-1/2">
          <Image
            className="max-w-full rounded-[inherit]"
            alt="wallpaper"
            src={data.source}
            quality={100}
            width={1000}
            height={1000}
          />
        </div>
        <div className="mx-2.5 h-max flex-1">
          <div className="p-2 m-1 mb-0 font-semibold">
            {">"}
            <Link
              href={`/anime/${data.anime}`}
              className="[&:not(:hover)]:underline m-2"
            >
              Veja mais do mesmo anime
            </Link>
          </div>
          <table className="border-collapse h5 border-y w-full border-slate-600">
            <tbody>
              <tr className="">
                <td className="px-3 py-2">
                  <FaHashtag />
                </td>
                <td className="px-3 py-2 text-green-600">Tags</td>
                <td className="px-3 py-2">
                  {data.tags.map((tag, idx) => (
                    <>
                      {idx != 0 && ", "}
                      <Link
                        key={idx}
                        href={"/search?term=" + tag}
                        className="py-1 font-bold hover:underline hover:scale-105"
                      >
                        {tag}
                      </Link>
                    </>
                  ))}
                </td>
              </tr>
              <tr className="">
                <td className="px-3 py-2">
                  <FaHeart />
                </td>
                <td className="px-3 py-2 text-green-600">Likes</td>
                <td className="px-3 py-2">
                  {formatDisplayNumber(data.likes_count)}
                </td>
              </tr>
              <tr className="">
                <td className="px-3 py-2">
                  <FaEye />
                </td>
                <td className="px-3 py-2 text-green-600">Visualizações</td>
                <td className="px-3 py-2">{formatDisplayNumber(data.views)}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <FaDownload />
                </td>
                <td className="px-3 py-2 text-green-600">Downloads</td>
                <td className="px-3 py-2">
                  {formatDisplayNumber(data.downloads)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 pb-3 -mt-1 dark:text-white flex justify-around">
            {/* <button
              data-unanimated
              className="h-center justify-center px-2 py-1 w-5/12 rounded-lg border-2 border-rose-500 transition-all hover:bg-red-600/20"
            >
              {data.is_liked ? (
                <>
                  <FaHeart className="text-3xl" />{" "}
                  <span className="font-semibold p-2">Retirar like</span>
                </>
              ) : (
                <>
                  <FaRegHeart className="text-3xl" />{" "}
                  <span className="font-semibold p-2">Curtir</span>
                </>
              )}
            </button> */}

            <DownloadButton
              imageLink={data.source}
              animeId={data.anime}
              wallpaperId={wallpaperId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
