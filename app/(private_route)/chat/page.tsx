"use client";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import CurrentUser from "@/components/CurrentUser/CurrentUser";
import SearchChats from "../../../components/SearchChats/SearchChats";
import ChatCard from "@/components/ChatCard/ChatCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { RootState } from "@/store/userStore";
import { useSelector, useDispatch } from "react-redux";
import { getuser } from "@/features/user/getUser";
import ChatArea from "@/components/ChatArea/ChatArea";
import EditProfile from "@/components/EditProfile/EditProfile";
import Modal from "react-modal";
import Loading from "@/components/Loading/Loading";
import { ZIM } from "zego-zim-web";

export default function Chat() {
  const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APPID!);
  const { data: session } = useSession();
  const userData = useSelector((state: RootState) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const dispatch = useDispatch();
  ZIM.create({ appID });
  var zim = ZIM.getInstance();
  const handleSignIn = async () => {
    if (session && session.user && !userSignedIn) {
      setUserSignedIn(true);
      await getuser(session, dispatch, zim).then(() => {
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    handleSignIn();
  }, [session]);

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
  const loadingstyle = {
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
        <Modal isOpen={loading} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
          <Loading />
        </Modal>
      ) : (
        <>
          <div className="flex flex-col gap-[1.5em] h-screen pb-[3em] drop-shadow-md">
            <div className="">
              <CurrentUser
                username={userData.username}
                profileImage={userData.profileImage}
                sendOpenModal={openModal}
              />
            </div>
            <div className="">
              <SearchChats />
            </div>
            <div className="scroll w-full flex-grow  bg-white rounded-[30px] p-[1.5em] overflow-scroll ">
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
              <ChatCard
                firstName="Christiana"
                lastName="Beth"
                status="online"
                profileImage=""
                lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
                time="08:05 PM"
                typing={false}
              />
            </div>
          </div>
          <div className="flex flex-col drop-shadow-md pb-[3em]">
            <ChatHeader username="Christiana" status="online" profileImage="" />
            <div className="w-full h-full">
              <ChatArea />
            </div>
          </div>
          {/* <button onClick={}>signOut</button> */}
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
              zim={zim}
            />
          </Modal>
        </>
      )}
    </div>
  );
}
