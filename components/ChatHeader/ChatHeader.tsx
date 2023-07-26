import { IChatHeaderProps } from "@/types/types";
import Image from "next/image";

export default function ChatHeader({firstName, lastName, status, profileImage}: IChatHeaderProps) {
  return (
    <div className="bg-white w-full flex items-center justify-between rounded-t-[30px] min-h-[101px] px-[44px] max-w-[1176px]">
      <div className="user flex gap-2 ">
        <Image
          src="https://sp-images.summitpost.org/1038746.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=394ed8f3158db7ef966a1b238d293e8b"
          width={72}
          height={72}
          alt="Profile Image"
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-center ">
          <h1 className="text-[25px] text-black font-[600]">{firstName} {lastName}</h1>
          <p className="text-[15px] text-lightgrey ">{status}</p>
        </div>
      </div>

      <div className="flex gap-[50px]">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24.613"
            height="24.585"
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
                stroke="#494949"
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
                stroke="#494949"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </g>
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.725"
            height="21.768"
            viewBox="0 0 21.725 21.768"
          >
            <path
              id="Path_7059"
              data-name="Path 7059"
              d="M23.836,18.3v3.277a2.185,2.185,0,0,1-2.381,2.185,21.617,21.617,0,0,1-9.427-3.353,21.3,21.3,0,0,1-6.554-6.554,21.617,21.617,0,0,1-3.353-9.47A2.185,2.185,0,0,1,4.294,2H7.571A2.185,2.185,0,0,1,9.756,3.879a14.025,14.025,0,0,0,.765,3.069,2.185,2.185,0,0,1-.492,2.3L8.642,10.64A17.477,17.477,0,0,0,15.2,17.194l1.387-1.387a2.185,2.185,0,0,1,2.3-.492,14.025,14.025,0,0,0,3.069.765A2.185,2.185,0,0,1,23.836,18.3Z"
              transform="translate(-2.112 -2)"
              fill="#49c4bc"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="26"
            viewBox="0 0 6 26"
          >
            <g
              id="Group_565"
              data-name="Group 565"
              transform="translate(-1844 -74)"
            >
              <circle
                id="Ellipse_49"
                data-name="Ellipse 49"
                cx="3"
                cy="3"
                r="3"
                transform="translate(1844 74)"
                fill="#494949"
              />
              <circle
                id="Ellipse_50"
                data-name="Ellipse 50"
                cx="3"
                cy="3"
                r="3"
                transform="translate(1844 84)"
                fill="#494949"
              />
              <circle
                id="Ellipse_51"
                data-name="Ellipse 51"
                cx="3"
                cy="3"
                r="3"
                transform="translate(1844 94)"
                fill="#494949"
              />
            </g>
          </svg>
        </button>
      </div>

    </div>
  );
}
