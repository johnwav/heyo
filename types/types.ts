// interface for buttons
interface IButtonProps {
  text: string;
}

// chat header component
interface IChatHeaderProps {
  firstName: string;
  lastName: string;
  status: string;
  profileImage: string;
}

// chat card component

interface IChatCardProps {
  firstName: string;
  lastName: string;
  status?: string;
  profileImage: string;
  typing: boolean;
  time: string;
  lastMessage: string;
}
