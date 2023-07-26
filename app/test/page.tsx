import { SignIn } from "@/components/Action/Action";
import ChatCard from "@/components/ChatCard/ChatCard";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import ChatTextFeild from "@/components/ChatTextFeild/ChatTextFeild";
import SearchChats from "@/components/SearchChats/SearchChats";
import GoogleSignIn from "@/components/Google/Google";
import CurrentUser from "@/components/CurrentUser/CurrentUser";
import SignInComponent from "@/components/Authentication/Signin";

export default function Test() {
  return (
    <div className="max-w-[1440px] m-auto flex flex-col gap-8 items-center justify-center border p-2 bg-teal-100">
      <SignIn text="Sign in" />
      <GoogleSignIn text="Continue with Google Instead" />
      <ChatHeader
        firstName="Christiana"
        lastName="Beth"
        status="online"
        profileImage=""
      />
      <ChatTextFeild />
      <ChatCard
        firstName="Christiana"
        lastName="Beth"
        status="online"
        profileImage=""
        lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
        time="08:05 PM"
        typing={false}
      />
      <SearchChats />
      <CurrentUser firstName="Mason" lastName="Tyrell" profileImage="" />
      <SignInComponent />
    </div>
  );
}
