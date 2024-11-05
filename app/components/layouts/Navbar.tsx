"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex py-3 text-lg justify-between">
      <Link
        href="/"
        className={clsx("none", {
          "text-main-color font-semibold": pathname === "/",
        })}
      >
        when to gather
      </Link>
      <div className="flex gap-2">
        <Link
          href="/create"
          className={clsx("none", {
            "text-main-color font-semibold": pathname === "/create",
          })}
        >
          모임 생성
        </Link>
        <Link
          href="/join"
          className={clsx("none", {
            "text-main-color font-semibold": pathname === "/join",
          })}
        >
          모임 참여
        </Link>
        <Link
          href="/my-meeting"
          className={clsx("none", {
            "text-main-color font-semibold": pathname === "/my-meeting",
          })}
        >
          내 모임
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
