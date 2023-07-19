export function GoogleSignIn({ text }: IButtonProps) {
  return (
    <button className=" px-3   flex items-center justify-between text-white text-[20px] h-[52px] w-full max-w-[400px] rounded-lg bg-darkgrey">
      <img className="w-[35px] h-[35px]" src="/assets/google.png" alt="" />
      {text}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19.495"
          height="14.492"
          viewBox="0 0 19.495 14.492"
        >
          <g
            id="Group_551"
            data-name="Group 551"
            transform="translate(-1111 -870.586)"
          >
            <path
              id="Path_7049"
              data-name="Path 7049"
              d="M1128-365l5.832,5.832L1128-353.336"
              transform="translate(-4.336 1237)"
              fill="none"
              stroke="#fefefe"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              id="Path_7050"
              data-name="Path 7050"
              d="M1129.5-357H1112"
              transform="translate(0 1234.832)"
              fill="none"
              stroke="#fefefe"
              stroke-linecap="round"
              stroke-width="2"
            />
          </g>
        </svg>
      </div>
    </button>
  );
}
