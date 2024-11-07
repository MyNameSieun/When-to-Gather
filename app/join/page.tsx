const JoinPage = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mx-auto text-2xl font-bold">코드를 입력해주세요</h1>

      <form className="flex gap-4">
        <input
          type="text"
          placeholder="Type here"
          className="mx-auto input input-bordered w-full max-w-xs"
        />
        <button className="px-7  text-white bg-main-color rounded-md whitespace-nowrap">
          입장하기
        </button>
      </form>

      <section></section>
    </main>
  );
};

export default JoinPage;
