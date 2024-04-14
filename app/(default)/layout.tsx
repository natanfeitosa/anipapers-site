import Link from "next/link";
import { FaHeart, FaSearch } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";
import Image from "next/image";

import Logo from "@/ui/icons/Logo";
import Input from "@/ui/components/Input";
import QualityWarning from "./components/QualityWarning";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="p-4 flex max-[440px]:flex-wrap justify-center container gap-y-4 gap-x-3 bg-slate-200 dark:bg-slate-900 shadow shadow-slate-400 dark:shadow-slate-600 max-[440px]:flex-col min-[440px]:items-center min-[440px]:justify-between">
        <Link
          href="/"
          className="block justify-self-start"
          aria-label="Anipapers logo"
        >
          <Logo className="h-10 lg:h-16" />
        </Link>

        <form
          action={"/search"}
          className="basis-full sm:basis-7/12 md:basis-1/2 lg:basis-2/5 xl:basis-1/3 h-full"
        >
          <Input
            name="term"
            placeholder="Pesquisar por..."
            wrapperClass="rounded-full bg-slate-200 m-0 py-0 pr-0"
            className="!text-slate-800 placeholder:text-current dark:placeholder:text-current placeholder:opacity-70 placeholder:italic"
            right={
              <button type="submit" className="p-2.5 mr-1" title="pesquisar">
                <FaSearch className="text-slate-500 size-4" />
              </button>
            }
          />
        </form>
      </header>
      <QualityWarning />
      {children}
      <footer className="container bg-green-700 text-gray-100">
        <div className="h-center justify-between p-4 gap-y-6 max-sm:flex-col">
          <Link href="/" className="w-fit block">
            <Logo className="h-12 lg:h-16" aria-label="Anipapers logo" />
          </Link>
          <div>
            <p className="font-semibold">Baixe o app em</p>
            <a
              href="https://apkpure.com/p/com.natanapps.anipapers"
              target="_blank"
            >
              <Image
                src="/apkpure-logo.webp"
                alt="ApkPure logo"
                className="h-10 w-auto"
                width={130}
                height={130}
              />
            </a>
          </div>
        </div>

        <div className="py-2 px-4 bg-green-800 h-center justify-between font-semibold">
          <Link
            className="hover:underline block w-fit"
            href="/termos-de-uso-e-privacidade"
          >
            Termos de uso e privacidade
          </Link>
          <div className="m-2 h-center gap-2">
            <span>Com</span> <FaHeart className="text-red-500" title="Amor" /> e{" "}
            <BiSolidCoffeeBean fill="#846358" title="Feijão de café" />{" "}
            <span>|</span>{" "}
            <span>
              {(new Date().getFullYear() > 2024 ? "2024 - " : "") +
                new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
