'use client';

import axios from "axios";
import { useState, useEffect } from "react";


function page() {
  const [isAcceptingMessage, setisAcceptingMessage] = useState<boolean>(false)
  

  return (
    <>
      <div className="mx-auto">
        <h1>Public Profile Link</h1>
      </div>
    </>
  )
}

export default page