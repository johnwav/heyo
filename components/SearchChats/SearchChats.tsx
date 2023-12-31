"use client";
import { FormEvent, useState } from "react";

export default function SearchChats() {
  const [query, setQuery] = useState<string>("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query);
  };

  return (
    <div className="flex items-center gap-2 px-[20px] justify-between w-full h-[67px] bg-white  rounded-[34px]">
      {/* search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24.613 24.585"
      >
        <g
          id="Group_563"
          data-name="Group 563"
          transform="translate(-1.5 -1.5)"
        >
          <circle
            id="Ellipse_48"
            data-name="Ellipse 48"
            cx="9.923"
            cy="9.923"
            r="9.923"
            transform="translate(3 3)"
            fill="none"
            stroke="#828181"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <line
            id="Line_1"
            data-name="Line 1"
            x1="3.813"
            y1="3.785"
            transform="translate(20.178 20.178)"
            fill="none"
            stroke="#828181"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>

      <form
        className="flex flex-grow h-[90%]"
        action="submit"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Search"
          className=" px-[20px] outline-none focus:outline-none w-full"
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </form>

      {/* plus icon */}
      <button className="rounded-full bg-green w-[54px] h-[54px] flex justify-center items-center hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
