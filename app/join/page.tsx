"use client";

import { useEffect, useState } from "react";
import { Meeting } from "../types/type";
import { useRouter } from "next/navigation";

const JoinPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [enteredCode, setEnteredCode] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:4000/meetings");
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);
  if (loading) {
    return <p>로딩중...</p>;
  }

  const handleJoin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (enteredCode === "") {
      return alert("코드를 입력해주세요.");
    }

    const matchedMeeting = meetings.find(
      (meeting) => meeting.randomCode === enteredCode
    );

    if (matchedMeeting) {
      router.push(`/meeting-vote/${matchedMeeting.id}`);
    } else {
      alert("코드가 존재하지 않습니다.");
    }
  };
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="mx-auto text-2xl font-bold mt-20 mb-16">
        코드를 입력해주세요
      </h1>

      <form className="flex gap-4">
        <input
          type="text"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
          placeholder="VXNIF1"
          className="mx-auto input input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleJoin}
          className="px-7  text-white bg-main-color rounded-md whitespace-nowrap"
        >
          입장하기
        </button>
      </form>

      <section></section>
    </main>
  );
};

export default JoinPage;
