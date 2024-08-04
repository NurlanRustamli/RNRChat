import React, { useEffect, useState } from 'react'
import './detail.css'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'

function Detail() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
  const { currentUser } = useUserStore()
  const [chat, setChat] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSharedPhotos, setIsSharedPhotos] = useState(true);


  useEffect(() => {
    if (!chatId) {
      setIsLoading(false);
      return;
    }
    const unsub = onSnapshot(
      doc(db, "chats", chatId),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setChat(docSnapshot.data());
        } else {
          console.log("No such document!");
          setChat(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching document:", error);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) {
      return
    }

    const userDocRef = doc(db, "users", currentUser.id)
    console.log(userDocRef)
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className='detail'>
      <img src="./edit.png" alt="" onClick={()=>{
            const detailPage = document.querySelector(".detail")
            const chatPage = document.querySelector(".chat")
            detailPage.style.display ="none"
            chatPage.style.flex ="3"
            chatPage.style.display ="flex"
          }}/>
  
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Karabakh is Azerbaijan!</p>
      </div>
      <div className="info">

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={isSharedPhotos ? "./arrowDown.png" : "./arrowUp.png"} alt="" onClick={() => setIsSharedPhotos(!isSharedPhotos)} />
          </div>
          {isSharedPhotos ?
            <div className="photos">
              {chat?.messages.map((item, index) => {

                if (item.img) {
                  return (
                    <div key={index} className="photoItem">
                      <div className="photoDetail">
                        <img src={item.img} alt="" />
                        <span>{item.createdAt.seconds}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div> : null}

        </div>
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"}</button>
        <button className='logout' onClick={() => auth.signOut()}>Log out</button>
      </div>
    </div>
  )
}

export default Detail