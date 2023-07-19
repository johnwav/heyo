interface IProps {
  text: string;
}

export function SignIn({ text }: IProps) {
  return <button>{text}</button>;
}

export function SignUp({ text }: IProps) {
  return <button>{text}</button>;
}
