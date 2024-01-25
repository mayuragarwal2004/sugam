import React, { useState } from "react";
import PhoneNumber from "./PhoneNumber";

const Newtry = () => {
  const [num, setnum] = useState({ phone: "91", valid: false });
  function handleNumNewChange(val) {
    setnum(val)
  }
  return <PhoneNumber value={num} setValue={handleNumNewChange} inputProps={{name:"hi"}} />;
  // return <div />;
};

export default Newtry;
