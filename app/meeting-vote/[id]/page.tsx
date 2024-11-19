"use client";

import { Meeting } from "@/app/types/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MeetingVote = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  // 시간을 분으로 변환하는 함수
  const changeMinute = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // 시간 블록을 생성하는 함수
  const generateTimeBlocks = (startTime: string, endTime: string) => {
    const startMinutes = changeMinute(startTime);
    const endMinutes = changeMinute(endTime);

    const blocks = [];
    for (let i = startMinutes; i < endMinutes; i += 20) {
      const hour = Math.floor(i / 60); // 시간을 계산
      const minute = i % 60; // 분을 계산

      // 시간을 "HH:mm" 형식으로 포맷
      const formattedTime = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
      blocks.push(formattedTime);
    }
    return blocks;
  };

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
  }, [id]);
  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  const filterMeeting = meetings.filter((meeting) => String(meeting.id) === id);

  return (
    <main>
      {filterMeeting
        .filter((meeting) => meeting.id === id)
        .map((meeting) => (
          <div key={meeting.id}>
            <h1 className="flex justify-center text-2xl font-bold">
              {meeting.meetingName}
            </h1>
          </div>
        ))}
      <div className="flex justify-end gap-3 p-3 h-16 drop-shadow-xl">
        <button className="text-white bg-main-color mx-3 px-3 rounded-md ">
          내 일정 선택하기
        </button>
        <img
          src="/images/share.png"
          className="bg-main-color rounded-lg cursor-pointer"
        />
      </div>

      <section className="border-solid border-2">
        <h2 className="m-9 font-bold text-2xl ">투표 현황</h2>
        {filterMeeting.map((meeting) => {
          const blocks = generateTimeBlocks(meeting.startTime, meeting.endTime);
          return (
            <div
              key={meeting.id}
              className="flex justify-center flex-col items-center p-16"
            >
              {meeting.date}

              {blocks.map((block, index) => (
                <div key={index} className="flex mr-3">
                  {block}
                  <p className="h-6 w-20  bg-gray-200 border border-black border-solid"></p>
                </div>
              ))}
            </div>
          );
        })}
      </section>

      <section className="border-solid border-2 mt-5">
        <h2 className="m-3 font-bold">최적 시간대 제안</h2>
      </section>
    </main>
  );
};

export default MeetingVote;
