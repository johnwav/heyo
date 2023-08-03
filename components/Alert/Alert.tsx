import { IAlertProps } from "@/types/types";

export default function Alert({ value }: IAlertProps) {
  return (
    <div className="px-5 py-2 text-white bg-red-500 rounded-md">{value}</div>
  );
}
