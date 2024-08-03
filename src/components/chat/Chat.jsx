import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'

function Chat() {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    const endRef = useRef(null)
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji)
    }
    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Nurlan</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, et.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, possimus?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message ">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, possimus?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://www.publicdomainpictures.net/pictures/340000/velka/flag-of-azerbaijan-1588676171Dkl.jpg" alt="" />
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, possimus?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message ">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, possimus?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder='Type a message...' onChange={e => setText(e.target.value)} value={text} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>

                </div>
                <button className='sendBtn'>Send</button>
            </div>
        </div>
    )
}

export default Chat