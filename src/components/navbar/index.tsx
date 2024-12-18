import Link from "next/link";
import { WalletButton } from "../wallet-button";
import { SITE_NAME } from "@/constants/site-info";
export const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-7 mx-auto">
      <Link href="/" className="flex gap-1 px-6">
        <span className="hidden text-2xl font-bold sm:block">
          <span className="text-gray-900">{SITE_NAME}</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6">
        <WalletButton />
      </div>
    </nav>
  );
};
