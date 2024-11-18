"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';

export const siteRoutes = [
  { href: '/', label: 'Inicio' },
  { href: '/cadastrarSala', label: 'Cadastrar Sala' },
  { href: '/alocarTurmaSala', label: 'Alocar Turma Sala' },
]

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center py-1 px-5 sm:10 border-b shadow-md bg-blue-600">
      <Link href="/" className="flex items-center">

        <div className="flex items-center">
          <img src="./femasslogo.jpg" className="h-[60px] w-[80px] rounded-md" />
          <div className="font-bold ml-2 text-xl">Desenvolvimento de Sistemas 1</div>
        </div>
      </Link>
      <ul className="hidden gap-x-2 sm:flex text-sm">
        {siteRoutes.map((siteRoute) => (
          <li key={siteRoute.href}>
            <Link
              href={siteRoute.href}
              className={`text-white  ${pathname === siteRoute.href ? "text-zinc-900 font-bold" : ""}`}
            >
              <div className="p-3 hover:bg-blue-700 rounded-lg hover:text-white">{siteRoute.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}