// import { FormHTMLAttributes, useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { FaSearch } from "react-icons/fa";
import SearchContainer from "./components/SearchContainer";
import { SSRPageProps } from "@/types";

const recomendations = [
  "Naruto",
  "One Piece",
  "Zinitsu",
  "Sword Art Online",
  "Violet",
  "Beta",
  "Kimetsu no Yaiba",
  "Hinata",
  "Luffy",
  "Shadow",
  "Kage no Jitsuryokusha",
  "Frieren",
];

export async function generateMetadata({
  searchParams,
}: SSRPageProps): Promise<Metadata> {
  const title = `Pesquisar: ${searchParams?.term ?? ""}`;
  return { title, openGraph: { title } };
}

export default async function Search({ searchParams }: SSRPageProps) {
  const term = (searchParams?.term ?? "") as string;

  return (
    <main className="container p-4">
      <div className="w-11/12 mx-auto max-w-screen-md">
        <h1 className="text-center">Que tal um wallpaper melhor?</h1>
        <form className="search-box my-4">
          <button type="submit" className="p-4" title="pesquisar">
            <FaSearch className="text-slate-500 size-4" />
          </button>

          <input
            defaultValue={term}
            name="term"
            className="focus:outline-none bg-transparent flex-1 p-1 text-slate-800"
            placeholder="Pesquisar papeis de parede"
          />
        </form>
      </div>

      {term ? (
        <SearchContainer />
      ) : (
        <div className="mx-auto w-fit my-6 min-h-[30vh] h-center">
          <h2 className="w-fit opacity-90">
            Por favor digite algo antes de executar a pesquisa
          </h2>
        </div>
      )}

      <div className="my-8 text-center">
        <h2 className="opacity-80">Você também pode gostar de pesquisar por</h2>
        <div className="v-center flex-wrap pt-2 text-gray-100">
          {recomendations.map((name, idx) => (
            <Link
              key={idx}
              className={
                "py-1 px-2 bg-green-700 rounded-full m-1" +
                (name == term ? " pointer-events-none" : "")
              }
              href={`/search?term=${name}`}
            >
              <small className="font-semibold">{name}</small>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
