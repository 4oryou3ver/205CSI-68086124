'use client'

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";
import FieldImage from "./png/BG.jpg";
import BSKball from "./png/basketball.png";
import FTball from "./png/football.png";
import Vllball from "./png/vollayball.png";
import Profile from "./png/me.gif";

export default function AnimationPage({
  feildWidth = 640,
  feildHeight = 480,
  ballRadius = 50,
  ballVelocity = 200,
}: {
  feildWidth?: number;
  feildHeight?: number;
  ballRadius?: number;
  ballVelocity?: number;
}) {
  const router = useRouter();

  // ตรวจสอบการเข้าสู่ระบบ
  useEffect(() => {
    checkLogin(router, '/animation');
  }, [router]);

  const _fieldWidth = feildWidth;
  const _fieldHeight = feildHeight;
  const _ballRadius = ballRadius;

  const _ballDiameter = 2 * _ballRadius;
  const maxX = _fieldWidth - _ballDiameter - 10;
  const maxY = _fieldHeight - _ballDiameter - 10;
  const xVelocity = Math.round(ballVelocity * Math.sqrt(2));
  const yVelocity = Math.round(ballVelocity * Math.sqrt(2));
  const frameRate = 25;
  const frameTime = 1 / frameRate;

  const ballRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [ballType, setBallType] = useState("none");
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [moveLeft, setMoveLeft] = useState(true);
  const [moveDown, setMoveDown] = useState(true);
  const [rotations, setRotations] = useState(0);
  const [keyEvent, setKeyEvent] = useState<{ key: string } | null>(null);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyEvent({ key: e.key });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!keyEvent) return;
    if (keyEvent.key === " ") setRunning((prev) => !prev);
    else if (keyEvent.key === "0") setBallType("none");
    else if (keyEvent.key === "1") setBallType("Basketball");
    else if (keyEvent.key === "2") setBallType("Football");
    else if (keyEvent.key === "3") setBallType("Volleyball");
    else if (keyEvent.key === "4") setBallType("Face");
  }, [keyEvent]);

  // เปลี่ยนรูปบอลตามที่ import เข้ามา
  useEffect(() => {
    if (!ballRef.current) return;
    if (ballType === "none") {
      ballRef.current.style.backgroundImage = "";
    } else if (ballType === "Basketball") {
      ballRef.current.style.backgroundImage = `url(${BSKball.src})`;
    } else if (ballType === "Football") {
      ballRef.current.style.backgroundImage = `url(${FTball.src})`;
    } else if (ballType === "Volleyball") {
      ballRef.current.style.backgroundImage = `url(${Vllball.src})`;
    } else if (ballType === "Face") {
      ballRef.current.style.backgroundImage = `url(${Profile.src})`;
    }
  }, [ballType]);

  useEffect(() => {
    if (running) {
      timer.current = setTimeout(() => {
        calculateNextFrame();
      }, frameTime * 1000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  });

  const calculateNextFrame = () => {
    if (moveLeft) {
      setX((prevX) => {
        const nextX = prevX + xVelocity / frameRate;
        if (nextX >= maxX) {
          setMoveLeft(false);
          return maxX;
        }
        return nextX;
      });
      setRotations((prev) => prev + 20);
    } else {
      setX((prevX) => {
        const nextX = prevX - xVelocity / frameRate;
        if (nextX <= 0) {
          setMoveLeft(true);
          return 0;
        }
        return nextX;
      });
      setRotations((prev) => prev - 20);
    }

    if (moveDown) {
      setY((prevY) => {
        const nextY = prevY + yVelocity / frameRate;
        if (nextY >= maxY) {
          setMoveDown(false);
          return maxY;
        }
        return nextY;
      });
    } else {
      setY((prevY) => {
        const nextY = prevY - yVelocity / frameRate;
        if (nextY <= 0) {
          setMoveDown(true);
          return 0;
        }
        return nextY;
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[75vh] bg-white text-black font-sans px-4 py-4">
      {/* Container */}
      <div className="mx-auto mt-3 flex flex-col items-center w-fit">
        {/* Field */}
        <div
          className="border-2 border-black rounded-lg relative overflow-hidden bg-cover bg-center shadow-md"
          style={{
            width: `${_fieldWidth}px`,
            height: `${_fieldHeight}px`,
            backgroundImage: `url(${FieldImage.src})`,
          }}
        >
          {/* Ball */}
          <div
            className="border border-black rounded-full absolute bg-gray-300 bg-cover bg-center shadow"
            style={{
              width: `${_ballDiameter}px`,
              height: `${_ballDiameter}px`,
              top: `${y}px`,
              left: `${x}px`,
              transform: `rotate(${rotations}deg)`,
            }}
            ref={ballRef}
          ></div>
        </div>

        {/* Button Row */}
        <div className="flex justify-between items-center w-full gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg font-bold text-white shadow transition-colors cursor-pointer ${
              running ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => setRunning(!running)}
          >
            {running ? <span>Pause</span> : <span>Run</span>}
          </button>

          {/* Ball Type Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1.5 border border-gray-400 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => setBallType("none")}
            >
              None
            </button>
            <button
              className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => setBallType("Basketball")}
            >
              Basketball
            </button>
            <button
              className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => setBallType("Football")}
            >
              Football
            </button>
            <button
              className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => setBallType("Volleyball")}
            >
              Volleyball
            </button>
            <button
              className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => setBallType("Face")}
            >
              Face
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}