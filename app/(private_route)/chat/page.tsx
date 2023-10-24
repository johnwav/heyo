"use client";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import CurrentUser from "@/components/CurrentUser/CurrentUser";
import SearchChats from "../../../components/SearchChats/SearchChats";
import ChatCard from "@/components/ChatCard/ChatCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { RootState } from "@/store/userStore";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@/features/user/getUser";
import ChatArea from "@/components/ChatArea/ChatArea";
import EditProfile from "@/components/EditProfile/EditProfile";
import Modal from "react-modal";
import Loading from "@/components/Loading/Loading";
import { RtmClient } from "agora-rtm-sdk";

export default function Chat() {
  const { data: session } = useSession();
  const userData = useSelector((state: RootState) => {
    return state.user;
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const dispatch = useDispatch();
  const [Gclient, setGClient] = useState<RtmClient>();
  const [id, setId] = useState<string>();
  const [currentChatDetails, setCurrentChatDetails] = useState({
    username: "Christiana",
    status: "online",
    profileImage: "",
    id: "",
  });
  const [peer, setPeer] = useState("");

  const handleSignIn = async () => {
    if (session && session.user && !userSignedIn) {
      setUserSignedIn(true);
      await getUser(session, dispatch).then(({ token, user }) => {
        console.log("user id for agora is:", user.agoraId), setId(user.agoraId);
        setLoading(false);
        connectToAgoraRTM(user.agoraId, token);
      });
    }
  };

  useEffect(() => {
    handleSignIn();
  }, [session, handleSignIn]);

  useEffect(() => {
    console.log(peer);
  }, [peer]);

  async function connectToAgoraRTM(id: string, token: string) {
    const { default: AgoraRTM } = await import("agora-rtm-sdk");
    const client = AgoraRTM.createInstance(
      process.env.NEXT_PUBLIC_AGORA_APP_ID!
    );
    console.log("user id is :", id);
    await client.login({
      uid: id,
      token,
    });
    setGClient(client);
  }

  const sendMessage = (message: string) => {
    Gclient?.sendMessageToPeer({ text: message }, peer);
  };

  const divStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    padding: "1.5em",
    gap: "1.5em",
    height: "100%",
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      outline: "none",
      border: "none",
    },
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = (val: boolean) => {
    setModalIsOpen(val);
  };

  return (
    <div style={divStyle}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col gap-[1.5em] h-screen pb-[3em] drop-shadow-md">
            <div className="">
              <CurrentUser
                username={userData.username}
                profileImage={userData.profileImage}
                sendOpenModal={openModal}
                // id here is the id of the loggged in user
                id={id}
              />
            </div>
            <div className="">
              <SearchChats />
            </div>
            <div className="scroll w-full flex-grow  bg-white rounded-[30px] p-[1.5em] overflow-scroll ">
              <div
                onClick={() => {
                  setCurrentChatDetails({
                    username: "Christiana A2",
                    id: "2233",
                    profileImage: "",
                    status: "Online",
                  });
                  setPeer(currentChatDetails.id);
                }}
              >
                <ChatCard
                  firstName="Christiana A2"
                  lastName="Beth"
                  status="online"
                  profileImage=""
                  lastMessage="Lets go to the cinema this friday!"
                  time="08:05 PM"
                  typing={false}
                  id={currentChatDetails.id}
                />
              </div>
              <div
                onClick={() => {
                  setCurrentChatDetails({
                    username: "James A",
                    id: "832",
                    profileImage: "",
                    status: "Online",
                  });
                  setPeer(currentChatDetails.id);
                }}
              >
                <ChatCard
                  firstName="James A"
                  lastName="Franko"
                  status="online"
                  profileImage=""
                  lastMessage="Still Up for tonight?"
                  time="08:05 PM"
                  typing={false}
                  id={currentChatDetails.id}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col drop-shadow-md pb-[3em]">
            <ChatHeader
              {...currentChatDetails}
              // // id here is the id of the user you're interacting with
              // id={peerId}
            />
            <div className="w-full h-full">
              <ChatArea sendMessage={sendMessage} />
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => closeModal()}
            style={customStyles}
            ariaHideApp={false}
          >
            <EditProfile
              id={userData._id}
              email={userData.email}
              username={userData.username}
              about={userData.about}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

//TOdo : get the id of currrent chat
// use the agora id to fetch the messages in the current chat you're in
