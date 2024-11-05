"use client";
import { useEffect, useState } from "react";
import { Meeting } from "../type";

const MyMeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">진행중인 모임</h2>
      <section>
        <article>
          <ul>
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className="border border-gray-300 rounded-md p-4 mb-4 shadow-md"
              >
                <h3 className="text-xl font-semibold">{meeting.meetingName}</h3>
                <p className="text-gray-600">{meeting.meetingDescription}</p>
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
