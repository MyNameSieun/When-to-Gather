"use client";
import { useEffect, useState } from "react";
import { Meeting } from "../type";

const MyMeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();

  // 로드
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

  // 삭제
  const handleDeleteButton = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/meetings/${id}`, {
        method: "DELETE",
      });

      const deleteConfirm = window.confirm("모임에서 탈퇴하시겠습니까?");
      if (deleteConfirm) {
        const result = meetings.filter((meeting) => meeting.id !== id);
        setMeetings(result);
        alert("탈퇴 완료!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-4">
      <section>
        <article>
          <h2 className="text-2xl font-bold mb-4">진행중인 모임</h2>
          <ul>
            {meetings
              .filter(
                (meeting) =>
                  new Date(`${meeting.date}T${meeting.endTime}`) > currentDate
              )
              .map((meeting) => (
                <li
                  key={meeting.id}
                  className="border border-gray-300 rounded-md p-4 mb-4 shadow-md cursor-pointer"
                >
                  <div className="flex">
                    <h3 className="text-xl font-semibold">
                      {meeting.meetingName}
                    </h3>
                    <button
                      onClick={() => handleDeleteButton(meeting.id)}
                      className="flex ml-auto text-white bg-main-color px-2
                    text-center rounded-md"
                    >
                      x
                    </button>
                  </div>

                  <p className="mt-3 text-gray-600">
                    {meeting.meetingDescription}
                  </p>
                  <p className="text-gray-500">날짜: {meeting.date}</p>
                </li>
              ))}
          </ul>
        </article>

        <article>
          <h2 className="text-2xl font-bold mt-24 mb-4">종료된 모임</h2>

          <ul>
            {meetings
              .filter(
                (meeting) =>
                  new Date(`${meeting.date}T${meeting.endTime}`) < currentDate
              )
              .map((meeting) => (
                <li
                  key={meeting.id}
                  className="border border-gray-300 rounded-md p-4 mb-4 shadow-md cursor-pointer"
                >
                  <div className="flex">
                    <h3 className="text-xl font-semibold">
                      {meeting.meetingName}
                    </h3>
                    <button
                      onClick={() => handleDeleteButton(meeting.id)}
                      className="flex ml-auto text-white bg-main-color px-2
                    text-center rounded-md"
                    >
                      x
                    </button>
                  </div>

                  <p className="mt-3 text-gray-600">
                    {meeting.meetingDescription}
                  </p>
                  <p className="text-gray-500">날짜: {meeting.date}</p>
                </li>
              ))}
          </ul>
        </article>
      </section>
    </main>
  );
};

export default MyMeetingPage;
