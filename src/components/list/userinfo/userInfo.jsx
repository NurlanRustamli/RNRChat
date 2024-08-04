import React from 'react'
import './userinfo.css'
import { useUserStore } from '../../../lib/userStore'

function UserInfo() {

const {currentUser} = useUserStore()

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser? currentUser.avatar:"./avatar.png"} alt="" />
            <h2>{currentUser.username}</h2>
        </div>
       
    </div>
  )
}

export default UserInfo