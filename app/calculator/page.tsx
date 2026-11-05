"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { checkLogin } from "@/utils/login";

export default function Calculator() {

 const router = useRouter()
  useEffect(() => checkLogin(router, '/calculator'),[router])

  const debug = true;
  const [state, setState] = useState("first");
  const [display, setDisplay] = useState("0");
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [operator, setOperator] = useState("?");

  const init = () => {
    setState("first");
    setDisplay("0");
    setFirst(0);
    setSecond(0);
    setOperator("?");
  };

  const insertSeparator = (str: string | number, separator = ",", groupSize = 3) => {
    let resultString = "";
    let counter = 0;

    const parts = String(str).split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];

    for (let i = numberPart.length - 1; i >= 0; i--) {
      resultString = numberPart[i] + resultString;

      if (i !== 0 && counter % groupSize === groupSize - 1) {
        resultString = separator + resultString;
      }

      counter++;
    }

    if (decimalPart !== undefined) {
      resultString += "." + decimalPart;
    }

    return resultString;
  };

  const render = (newDisplay: string, s: string, f: number, sec: number, op: string) => {
    if (debug) {
      console.log(`[${s}]first: ${f}, second: ${sec}, operator: ${op}, display: ${newDisplay}`);
    }
  };

  const numberClick = (num: number | string) => {
    let newDisplay = display;
    let newState = state;

    switch (state) {
      case "first":
        if (display.length < 9) {
          newDisplay = display === "0" ? String(num) : display + String(num);
        }
        break;

      case "operator":
        newDisplay = String(num);
        newState = "second";
        break;

      case "second":
        if (display.length < 9) {
          newDisplay = display === "0" ? String(num) : display + String(num);
        }
        break;
    }

    setDisplay(newDisplay);
    setState(newState);
    render(newDisplay, newState, first, second, operator);
  };

  const operatorClick = (op: string) => {
    let newFirst = first;
    let newOperator = operator;
    let newState = state;
    let newDisplay = display;

    switch (state) {
      case "first":
        newFirst = Number(display);
        newOperator = String(op);
        newState = "operator";
        break;

      case "operator":
        newOperator = String(op);
        break;

      case "second": {
        const sec = Number(display);
        let calculated = first;

        if (operator === "+") {
          calculated = first + sec;
        } else if (operator === "-") {
          calculated = first - sec;
        }

        newFirst = calculated;
        newDisplay = String(calculated);
        newOperator = String(op);
        newState = "operator";
        break;
      }
    }

    setFirst(newFirst);
    setOperator(newOperator);
    setState(newState);
    setDisplay(newDisplay);
    render(newDisplay, newState, newFirst, second, newOperator);
  };

  const equlClick = () => {
    let newFirst = first;
    let newDisplay = display;
    let newState = state;

    switch (state) {
      case "first":
        if (operator !== "?") {
          let calculated = first;
          if (operator === "+") {
            calculated = first + second;
          } else if (operator === "-") {
            calculated = first - second;
          }
          newFirst = calculated;
          newDisplay = String(calculated);
        }
        break;

      case "operator": {
        const sec = first;
        let calculated = first;
        if (operator === "+") {
          calculated = first + sec;
        } else if (operator === "-") {
          calculated = first - sec;
        }
        setSecond(sec);
        newFirst = calculated;
        newDisplay = String(calculated);
        newState = "first";
        break;
      }

      case "second": {
        const sec = Number(display);
        let calculated = first;
        if (operator === "+") {
          calculated = first + sec;
        } else if (operator === "-") {
          calculated = first - sec;
        }
        setSecond(sec);
        newFirst = calculated;
        newDisplay = String(calculated);
        newState = "first";
        break;
      }
    }

    setFirst(newFirst);
    setDisplay(newDisplay);
    setState(newState);
    render(newDisplay, newState, newFirst, second, operator);
  };

  const ceClick = () => {
    init();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        ceClick();
      } else if (e.key === "Enter") {
        equlClick();
      } else if (e.key >= "0" && e.key <= "9") {
        numberClick(e.key);
      } else if (e.key === "-") {
        operatorClick("-");
      } else if (e.key === "+" || e.key === "=") {
        operatorClick("+");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <main className="flex flex-col items-center justify-center my-auto py-2 px-4">
      {/* Calculator Container */}
      <div className="w-[340px] border-2 border-gray-300 rounded-2xl p-3 bg-white shadow-xl">
        {/* Screen */}
        <div className="border border-gray-300 rounded-xl bg-[#f4fbfe] h-16 text-right px-4 flex items-center justify-end text-3xl font-bold mb-3 shadow-inner">
          {insertSeparator(display)}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-2">
          {/* Row 1 */}
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-semibold text-gray-400 text-lg flex items-center justify-center cursor-not-allowed" disabled>MC</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-semibold text-gray-400 text-lg flex items-center justify-center cursor-not-allowed" disabled>MR</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-semibold text-gray-400 text-lg flex items-center justify-center cursor-not-allowed" disabled>M+</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-semibold text-gray-400 text-lg flex items-center justify-center cursor-not-allowed" disabled>M-</button>
          <button className="h-14 bg-orange-400 hover:bg-orange-500 text-white border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={ceClick}>C</button>

          {/* Row 2 */}
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(7)}>7</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(8)}>8</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(9)}>9</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>&divide;</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>√</button>

          {/* Row 3 */}
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(4)}>4</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(5)}>5</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(6)}>6</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>&times;</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>1/x</button>

          {/* Row 4 */}
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(1)}>1</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(2)}>2</button>
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => numberClick(3)}>3</button>
          <button className="h-14 bg-[#a5d6a7] hover:bg-[#81c784] border border-gray-300 rounded-xl font-bold text-xl text-black flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => operatorClick('-')}>-</button>
          <button className="h-14 bg-[#c8e6c9] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>%</button>

          {/* Row 5 */}
          <button className="h-14 bg-[#bbdefb] hover:bg-blue-200 border border-gray-300 rounded-xl font-bold text-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer col-span-1" onClick={() => numberClick(0)}>0</button>
          <button className="h-14 bg-[#e3f2fd] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>.</button>
          <button className="h-14 bg-[#e3f2fd] border border-gray-300 rounded-xl font-bold text-xl text-gray-400 flex items-center justify-center cursor-not-allowed" disabled>+/-</button>
          <button className="h-14 bg-[#a5d6a7] hover:bg-[#81c784] border border-gray-300 rounded-xl font-bold text-xl text-black flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={() => operatorClick('+')}>+</button>
          <button className="h-14 bg-[#a5d6a7] hover:bg-[#81c784] border border-gray-300 rounded-xl font-bold text-xl text-black flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer" onClick={equlClick}>=</button>
        </div>
      </div>
    </main>
  );
}