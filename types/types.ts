// interface for buttons
export interface IButtonProps {
  text: string;
  loading?: boolean;
}

// chat header component
export interface IChatHeaderProps {
  username: string;
  status?: string;
  profileImage: string;
  sendOpenModal?: (val:boolean) => void
}

// chat card component

export interface IChatCardProps {
  firstName: string;
  lastName: string;
  status?: string;
  profileImage: string;
  typing: boolean;
  time: string;
  lastMessage: string;
}

export type TSignInInputs = {
  email: string;
  password: string;
};

export type TSignUpInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export interface IUserProfile {
  email: string;
  username: string;
  password: string;
}

export interface IAlertProps {
  value: string
}