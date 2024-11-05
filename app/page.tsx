import Link from "next/link";

const Homepage = () => {
  return (
    <main>
      <section className="mt-8">
        <h1 className="font-semibold text-[2.4rem]">
          모임 시간을 손 쉽게,
          <br />
          함께의 순간을 빠르게
        </h1>

        <article className="flex gap-5 justify-center mt-28">
          <Link href="./create">
            <div className="text-white bg-main-color w-[20rem] h-[10rem] rounded-md p-3 text-ls shadow-md">
              모임 만들기
            </div>
          </Link>

          <Link href="./join">
            <div className="text-dark-color bg-sub-color  w-[20rem] h-[10rem] rounded-md p-3 text-ls shadow-md">
              모임 참가하기
            </div>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default Homepage;
