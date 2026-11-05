"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Profile from "./pnghome/me.gif";
import { useRouter } from "next/navigation";
import { checkLogin } from '@/utils/login'

export default function Home() {
  const router = useRouter()
  useEffect(() => checkLogin(router, '/'),[router])
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-black font-sans px-4 py-8">
      {/* Main Card Container */}
      <div className="max-w-4xl w-full border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-lg flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Profile & Info */}
        <div className="w-full md:w-[320px] flex flex-col border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div className="w-full h-[280px] relative rounded-lg overflow-hidden mb-4 bg-gray-100">
            {/* รูปของคุณในโฟลเดอร์ pnghome */}
            <Image
              src={Profile} 
              alt="Chatchai Bunchuay"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="font-bold text-lg text-gray-950">
              ฉัตรชัย บุญช่วย 
            </h2>
            <p className="text-sm text-gray-700 font-medium">
              ID: 68086220
            </p>
            <p className="text-sm text-gray-700">
              Computer Science Student
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Sripatum University <span className="font-semibold">(SPU)</span>
            </p>

            {/* เป้าหมายสายงานที่อยากทำ */}
            <div className="border-t border-gray-100 pt-2 mt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Career Goal:
              </h3>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                🚀 Full-Stack Developer
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Innovative Web Project Ideas (English) */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl text-gray-900">
              Innovative Web Project Ideas & Vision
            </h1>

            <p className="text-sm text-gray-700 leading-relaxed">
              Exploring cutting-edge concepts to solve real-world challenges through modern web technologies, focusing on interactivity, user engagement, and smart data visualization:
            </p>

            <ul className="list-disc list-inside space-y-2.5 text-sm text-gray-800 leading-relaxed">
              <li>
                <span className="font-bold">AI-Powered UI Component Generator:</span> A smart developer tool that translates natural language prompts or rough sketches directly into responsive React & Tailwind components in real-time.
              </li>
              <li>
                <span className="font-bold">Gamified Algorithm Visualizer Hub:</span> An interactive learning platform that turns complex data structures (like graphs, sorting algorithms, and trees) into multiplayer puzzle games for computer science students.
              </li>
              <li>
                <span className="font-bold">Eco-Friendly Campus Resource Tracker:</span> A dashboard web app designed for universities to monitor indoor air quality, energy consumption, and campus sustainability metrics using live charts.
              </li>
              <li>
                <span className="font-bold">Real-Time Collaborative Code & Diagramming Workspace:</span> A lightweight web workspace combining live coding editors with instant Mermaid/Draw.io diagram rendering for seamless peer programming.
              </li>
            </ul>

            <p className="text-sm text-gray-700 italic mt-2">
              &quot;Building scalable, intuitive, and impactful digital solutions for the future.&quot;
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}