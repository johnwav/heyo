"use client";
import { ChangeEvent, useEffect, useState } from "react";

export default function ChatTextFeild() {
  const [message, setMessage] = useState<string>("");

  function handleSubmit() {
    console.log(message);
  }

  useEffect(() => {
    const textarea = document.getElementById("textarea");
    if (textarea) {
      textarea.addEventListener("input", function (e) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    }
  });

  return (
    <div className="flex gap-4 items-end rounded-[18px] max-h-[200px] justify-between px-[32px] bg-white min-h-[72px] w-full max-w-[1146px]">
      <div className="flex gap-8 pb-[20px]">
        {/* emoji */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
          >
            <g
              id="Group_567"
              data-name="Group 567"
              transform="translate(-1 -1)"
            >
              <circle
                id="Ellipse_53"
                data-name="Ellipse 53"
                cx="10"
                cy="10"
                r="10"
                transform="translate(2 2)"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="Path_7061"
                data-name="Path 7061"
                d="M8,14a5.4,5.4,0,0,0,4,2,5.4,5.4,0,0,0,4-2"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <line
                id="Line_4"
                data-name="Line 4"
                x2="0.01"
                transform="translate(9 9)"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <line
                id="Line_5"
                data-name="Line 5"
                x2="0.01"
                transform="translate(15 9)"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </g>
          </svg>
        </button>
        {/* attach file */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.853"
            height="21.994"
            viewBox="0 0 21.853 21.994"
          >
            <path
              id="Path_7062"
              data-name="Path 7062"
              d="M21.44,11.05l-9.19,9.19a6,6,0,1,1-8.49-8.49l8.57-8.57A4.006,4.006,0,1,1,18,8.84L9.41,17.41a2,2,0,1,1-2.83-2.83L15.07,6.1"
              transform="translate(-1.002 -1.004)"
              fill="none"
              stroke="#2d2d2d"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <form className="flex-1 flex-grow" onSubmit={handleSubmit}>
        <textarea
          id="textarea"
          className="max-h-[200px] w-full flex justify-center items-center p-[20px] placeholder:-[10px] resize-none focus:outline-none"
          placeholder="Type something here..."
          rows={1}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </form>

      <div className="flex gap-8 pb-[8px]">
        {/* mircophone */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="22"
            viewBox="0 0 16 22"
          >
            <g
              id="Group_568"
              data-name="Group 568"
              transform="translate(-4 -1)"
            >
              <path
                id="Path_7063"
                data-name="Path 7063"
                d="M12,2A3,3,0,0,0,9,5v7a3,3,0,0,0,6,0V5A3,3,0,0,0,12,2Z"
                fill="#2d2d2d"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                id="Path_7064"
                data-name="Path 7064"
                d="M19,10v2A7,7,0,0,1,5,12V10"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <line
                id="Line_6"
                data-name="Line 6"
                y2="3"
                transform="translate(12 19)"
                fill="none"
                stroke="#2d2d2d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </g>
          </svg>
        </button>
        {/* send message */}
        <button onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 52 52"
          >
            <g
              id="Group_591"
              data-name="Group 591"
              transform="translate(-1784 -969)"
            >
              <circle
                id="Ellipse_54"
                data-name="Ellipse 54"
                cx="26"
                cy="26"
                r="26"
                transform="translate(1784 969)"
                fill="#49c4bc"
              />
              <g
                id="Group_569"
                data-name="Group 569"
                transform="translate(1797 984)"
              >
                <line
                  id="Line_7"
                  data-name="Line 7"
                  x1="11"
                  y2="11"
                  transform="translate(11 2)"
                  fill="none"
                  stroke="#fefefe"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_7065"
                  data-name="Path 7065"
                  d="M22,2,15,22l-4-9L2,9Z"
                  fill="none"
                  stroke="#fefefe"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
