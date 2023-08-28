type TMessage = "them" | "you";
interface Props {
  type: TMessage;
  message: string;
}

export default function Message({ type, message }: Props) {
  const bgcolor = type === "them" ? "white" : "#49C4BC";
  const textColor = type === "them" ? "#828181" : "white";
  const postion = type === "them" ? "flex-start" : "flex-end";
  const style = {
    backgroundColor: bgcolor,
    color: textColor,
  };

  return (
    <div
      style={{ justifyContent: postion }}
      className="w-full flex justify-end"
    >
      <div
        style={style}
        className="font-[500] rounded-[10px] pt-[12px] px-[15px] inline-flex flex-col gap-[8px]"
      >
        <div className="flex flex-col justify-between w-full">
          <div className="flex-shrink">
            <p className="text-[15px] bold">{message}</p>
          </div>
          <div className="text-right text-[10px] pl-[150px]">
            08:25 PM
          </div>
        </div>
      </div>
    </div>
  );
}
