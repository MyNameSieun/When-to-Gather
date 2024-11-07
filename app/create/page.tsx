"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const CreatePage = () => {
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const router = useRouter();

  // 랜덤 코드 생성
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }
    return randomCode;
  };

  // 모임 생성
  const handleCreateMeeting = async () => {
    if (!meetingName) {
      return alert("모임 이름을 입력해주세요");
    }
    if (!meetingDescription) {
      return alert("모임 이름을 입력해주세요");
    }
    if (!date) {
      return alert("날짜를 선택해주세요.");
    }
    if (!startTime) {
      return alert("시작 시간을 선택해주세요.");
    }
    if (!endTime) {
      return alert("종료 시간을 선택해주세요.");
    }
    const randomCode = generateRandomCode();

    const meetingData = {
      id: uuid(),
      meetingName,
      meetingDescription,
      date,
      startTime,
      endTime,
      randomCode,
    };

    try {
      const response = await fetch("http://localhost:4000/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      });
      const result = await response.json();
      alert("모임이 성공적으로 등록되었습니다.");

      setMeetingName("");
      setMeetingDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");

      router.push("/my-meeting");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mt-6">
      {/* 모임 이름 입력 */}
      <label className="mb-5 form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">모임 이름</span>
        </div>
        <input
          type="text"
          placeholder="모임 이름"
          className="input input-bordered w-full max-w-xs"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
      </label>
      {/* 모임 내용 입력 */}
      <label className="mb-5 form-control">
        <div className="label">
          <span className="label-text">모임 내용</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="모임 내용"
          value={meetingDescription}
          onChange={(e) => setMeetingDescription(e.target.value)}
        ></textarea>
      </label>
      {/* 날짜 선택 */}
      <label className="mb-5 form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">날짜 선택</span>
        </div>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      {/* 시간 선택 */}
      <div className="flex">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">시작 시간</span>
          </div>
          <input
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label className="mb-9 form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">종료 시간</span>
          </div>
          <input
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={handleCreateMeeting}
        className="text-white bg-main-color px-6 py-3 rounded-md mt-9"
      >
        모임 생성
      </button>
    </main>
  );
};

export default CreatePage;
