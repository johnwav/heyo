import Image from "next/image";

export default function CurrentUser({
  firstName,
  lastName,
  profileImage,
}: IChatHeaderProps) {
  return (
    <div className="flex items-center justify-start gap-[22px] text-[22px] w-full max-w-[635px]">
      <Image
        src="https://sp-images.summitpost.org/1038746.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=394ed8f3158db7ef966a1b238d293e8b"
        alt="Profile Image"
        width={72}
        height={72}
        className="rounded-full"
      />
      <h1 className="text-black font-[600]">{firstName} {lastName}</h1>
    </div>
  );
}
