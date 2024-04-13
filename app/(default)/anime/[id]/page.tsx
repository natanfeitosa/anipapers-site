import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IAnimeItem, SSRPageProps } from "@/types";
import { generateNextImageUrl } from "@/lib/helpers";
import { defineMetadata } from "@/helpers";
import api from "@/lib/api";
import { BookmarkButton, WallpapersFromAnime } from "./components";

async function getAnime(animeId: string) {
  const res = await api.get<IAnimeItem>(`animes/${animeId}/`, {
    next: { revalidate: 60 * 60 * 24, tags: ["anime", `@id:${animeId}`] },
  });

  if (res.status != 200) return;
  // const { res } = await api.get<IAnimeItem>(`animes/${animeId}/`);
  return res.data;
}

export async function generateMetadata({
  params,
}: Required<SSRPageProps>): Promise<Metadata | undefined> {
  const data = await getAnime(params.id);
  if (data) {
    return defineMetadata({ title: `Anime: ${data.name}` });
  }
}

export default async function Anime({ params }: Required<SSRPageProps>) {
  const data = await getAnime(params.id);

  if (!data) notFound();
  const { name, alternative_names, cover, is_following } = data;
  const hasAlternatives = alternative_names.length > 0;

  return (
    <div className="container py-2 px-4">
      <div
        className="w-full pt-[30%] md:pt-[20%] bg-cover bg-center bg-repeat-y blur-[1px] brightness-90 rounded-md mb-2.5 shadow shadow-slate-400 dark:shadow-slate-600"
        style={{
          backgroundImage: `url('${generateNextImageUrl(cover, 1200, 50)}')`,
        }}
      />
      <div className="w-full h-center justify-between max-w-screen-xl">
        <h1 className={"leading-none " + (hasAlternatives ? "mb-0" : "mb-2")}>
          {name}
        </h1>
        {/* <BookmarkButton isFollowing={is_following} disabled={!session} /> */}
      </div>
      {hasAlternatives && (
        <h2 className="h5 opacity-70">{alternative_names.join(", ")}</h2>
      )}

      <WallpapersFromAnime animeId={params.id} />
    </div>
  );
}
