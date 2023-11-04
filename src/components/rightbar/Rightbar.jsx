import React from 'react'
import './rightbar.css'
import RighBarAdd from '../rightBarAdds/RighBarAdd'
import OnlineFriend from '../onlineFriends/OnlineFriend'
// import UserContext from '../../Contexts/User/UserContext'
// import { useContext } from 'react'
// import { useEffect } from 'react'

export default function Rightbar() {
  // const context = useContext(UserContext);
  // let {fetchFriendDetails} = context;

  // useEffect(() => {
  //   fetchFriendDetails()
  //   // eslint-disable-next-line
  // }, []);
  return (
    <div className='rightBar'>
      <RighBarAdd/>
      <h6 style={{margin:"20px, 0px"}}>Still has to be Implemented</h6>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
      <OnlineFriend/>
    </div>
  )
}
