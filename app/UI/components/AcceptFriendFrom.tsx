'use client';

import { getUnacceptedFriends } from "@/app/_backend/actions/get-unaccepted-friends"
import { useEffect, useState } from "react";

export default function AcceptFriendForm(){

  // const unacceptedFriends = await getUnacceptedFriends();


  return <div>
    <button onClick={async () => {
      console.log(await getUnacceptedFriends())
    }}>
      get unaccepted friends
    </button>
    <ul>
      
    </ul>
  </div>
}