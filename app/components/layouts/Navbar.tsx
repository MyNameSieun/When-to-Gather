import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex py-3 text-[0.6rem] justify-between">
      <Link href="/">when to gather</Link>
      <div>
        <Link href="/create">모임 생성</Link>
        <Link href="/join">모임 참여</Link>
        <Link href="my-meeting">내 모임</Link>
      </div>
    </nav>
  );
};

export default Navbar;
