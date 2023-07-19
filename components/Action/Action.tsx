interface IProps {
  text: string;
}

export function SignIn({ text }: IProps) {
  return (
    <button className="text-white text-[20px] py-1 w-full max-w-[400px] bg-green">
      {text}
    </button>
  );
}

export function SignUp({ text }: IProps) {
  return <button>{text}</button>;
}
