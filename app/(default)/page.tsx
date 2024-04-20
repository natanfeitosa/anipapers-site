import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { banners } from "@/lib/constants";
import { defineMetadata } from '@/helpers';
import Featured from "./components/Featured";

export const metadata = defineMetadata({
  title: {
    absolute: 'Anipapers, sua plataforma de papéis de parede.'
  }
})

export default function Home() {
  return (
    <>
      <div className="container py-2">
        <div className="mb-2 w-full h-fit relative text-white">
          <Image
            className="w-full object-cover aspect-[5/3] md:aspect-[19/8]"
            src={
              "/banners/" + banners[Math.floor(Math.random() * banners.length)]
            }
            alt="imagem banner"
            width="1200"
            height="1200"
            quality={50}
            priority
          />
          <div className="absolute inset-0 z-10 backdrop-blur-xs backdrop-brightness-75 h-center flex-col">
            {/* <Header isHome className="self-start" /> */}

            <div className="flex-1 v-center flex-col max-w-3xl w-10/12">
              <h1 className="text-white max-[560px]:hidden">
                Encontre os melhores papéis de parede de anime
              </h1>
              <form className="search-box" action="/search">
                <button type="submit" className="p-4" aria-label="pesquisar">
                  <FaSearch className="text-slate-500 size-4" />
                </button>

                <input
                  name="term"
                  className="focus:outline-none bg-transparent flex-1 p-1 text-slate-800"
                  placeholder="Pesquisar papeis de parede"
                />
              </form>
              <div className="p-1 mt-2 text-gray-100">
                <Link
                  href="/search?term=Naruto"
                  className="py-1 px-2.5 bg-green-700 rounded-full mx-1"
                >
                  <small className="font-semibold">Naruto</small>
                </Link>
                <Link
                  href="/search?term=One Piece"
                  className="py-1 px-2.5 bg-green-700 rounded-full mx-1"
                >
                  <small className="font-semibold">One Piece</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featured />
    </>
  );
}
