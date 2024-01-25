import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import FormQuestionSingle from "./FormComponents/FormQuestionSingle";
import options from "./FormComponents/options.json";
import FormLocation from "./FormComponents/FormLocation";
import FormImageInput from "./FormComponents/FormImageInput";
import PhoneNumber from "./PhoneNumber";
import "./css/form.css";
import { auth, app } from "./base";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useAuth } from "./context/auth/AuthState";
import {geohashForLocation} from "geofire-common"

const animatedComponents = makeAnimated();

function RenderCount() {
  let renders = 0;
  return <span>{++renders}</span>;
}

function Form() {
  <RenderCount />;
  let { currentUser } = useAuth();
  // let currentUser;
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({
    phone: "+91",
    valid: false,
  });
  const [loc, setloc] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    country: "",
    state: "",
    city: "",
    postalcode: "",
  });
  const [userImage, setUserImage] = useState("");
  const [majorcomp, setmajorcomp] = useState({
    majorComponents: [],
    majorComponentsNumber: 0,
  });
  const [siteClean, setSiteClean] = useState("");
  const [percentRecycle, setPercentRecycle] = useState("");
  const [overflowingWaste, setOverflowingWaste] = useState("");
  const [dustbin, setdustbin] = useState("");
  const [dustbinFilled, setDustbinFilled] = useState("NA");
  const [PMCCollecting, setPMCCollecting] = useState("");
  const [garbageCollected, setGarbageCollected] = useState("NA");
  const [siteCategory, setsiteCategory] = useState([]);

  const handleChangeFullname = (event) => {
    const value = event.target.value;
    setFullname(value);
  };

  // const handleChangephoneNumber = (event) => {
  //   const value = event.target.value;
  //   setPhoneNumber(value);
  // };

  const handleChangephoneNumber = (val) => {
    setPhoneNumber(val);
    setotpreq(false);
    setphnostatus({ msg: "", type: true });
  };

  const handleChangesiteClean = (event) => {
    const value = event.target.value;
    setSiteClean(value);
  };

  const handleChangePercentRecycle = (event) => {
    const value = event.target.value;
    setPercentRecycle(value);
  };

  const handleChangeOverFlowingWaste = (event) => {
    const value = event.target.value;
    setOverflowingWaste(value);
  };

  const handleChangeDustbin = (event) => {
    const value = event.target.value;
    setdustbin(value);
  };

  const handleChangeDustbinFilled = (event) => {
    const value = event.target.value;
    setDustbinFilled(value);
  };

  const handleChangePMCCollecting = (event) => {
    const value = event.target.value;
    setPMCCollecting(value);
  };

  const handleChangeGarbageCollected = (event) => {
    const value = event.target.value;
    setGarbageCollected(value);
  };

  const handleChangeSiteCategory = (event) => {
    const value = event.target.value;
    setsiteCategory(value);
  };

  const [phnostatus, setphnostatus] = useState({ msg: "", type: true });
  const [submit, setsubmit] = useState({
    state: false,
    success: false,
    msg: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setsubmit((prev) => ({ ...prev, state: true }));
    if (currentUser) {
      let j = 0;
      const tempdata = [
        fullname,
        phoneNumber.phone,
        loc.latitude,
        loc.longitude,
        loc.accuracy,
        loc.country,
        loc.state,
        loc.city,
        loc.postalcode,
        userImage,
        majorcomp.majorComponentsNumber,
        majorcomp.majorComponents,
        siteClean,
        percentRecycle,
        overflowingWaste,
        dustbin,
        dustbinFilled ? dustbinFilled : "NA",
        PMCCollecting,
        garbageCollected ? garbageCollected : "NA",
        siteCategory,
      ];
      for (const i in tempdata) {
        const val = tempdata[i];
        if (!Boolean(val) || val.length === 0) {
          console.log(
            "Cannot Submit|",
            i,
            "|",
            val,
            "|",
            !Boolean(val),
            "|",
            val === []
          );
          setsubmit((prev) => ({
            ...prev,
            msg: "Looks like you have missed something, please fill all the fields and try again",
          }));
          j = 1;
          break;
        }
      }
      if (j === 0) {
        try {
          const db = getFirestore(app);
          const docRef = await addDoc(collection(db, "Complaints"), {
            fullname: fullname,
            phoneNumber: phoneNumber.phone,
            ...loc,
            geohash: geohashForLocation([loc.latitude, loc.longitude]),
            userImage: userImage,
            ...majorcomp,
            siteClean: siteClean,
            percentRecycle: percentRecycle,
            overflowingWaste: overflowingWaste,
            dustbin: dustbin,
            dustbinFilled: dustbinFilled ? dustbinFilled : "NA",
            PMCCollecting: PMCCollecting,
            garbageCollected: garbageCollected ? garbageCollected : "NA",
            siteCategory: siteCategory,
            timestampOfComplaint: Date.now(),
            useruid: currentUser.uid,
          });
          setsubmit((prev) => ({
            ...prev,
            success: true,
            msg: "Your Complaint is successfully registered.",
          }));
        } catch (e) {
          setsubmit((prev) => ({
            ...prev,
            success: false,
            msg: "Error adding document: " + e,
          }));
          console.error("Error adding document: ", e);
        }
      }
    } else {
      setsubmit((prev) => ({ ...prev, msg: "Please Login" }));
    }
  }

  // const locdatamemo = useMemo(() => ({latitude: data.latitude, longitude: data.longitude, accuracy: data.accuracy, postalcode:data.postalcode, city:data.city, state:data.state, country: data.country}), [data.latitude, data.longitude, data.accuracy, data.postalcode, data.city, data.state, data.country]);
  // const userImagememo = useMemo(() => ({userImage: data.userImage}), [data.userImage]);

  const [loginstate, setloginstate] = useState(false);

  function handlesignout() {
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }

  useEffect(() => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setloginstate(true);
      setPhoneNumber({ phone: currentUser.phoneNumber, valid: true });
      if (!fullname) {
        setFullname(currentUser.displayName);
      }
      // ...
    } else {
      // User is signed out
      // ...
      setloginstate(false);
    }
  }, [currentUser]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  
  const [otp, setotp] = useState("");
  const [otpreq, setotpreq] = useState(false);
  function requestOTP(e) {
    setphnostatus({ msg: "Verifying phone number", type: true });
    if (phoneNumber.valid) {
      setphnostatus({ msg: "OTP is being sent...", type: true });
      if (!window.recaptchaVerifier) {
        generateRecaptcha();
      }
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber.phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setphnostatus({
            msg: "OTP is sent. Please Check you messages.",
            type: true,
          });
          setotpreq(true);
        })
        .catch((err) => {
          setphnostatus({
            msg: "Error Occured: "+err.code,
            type: true,
          });
        });
    } else {
      if (phoneNumber.phone.length === 10) {
        setphnostatus({ msg: "Please add country code (+91)", type: false });
      } else {
        setphnostatus({ msg: "Phone Number in wrong format", type: false });
      }
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setotp(otp);

    if (otp.length === 6 && phoneNumber.valid) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const currentUser = result.user;
          setotpreq(false);
          setphnostatus({ msg: "OTP verified successfully!", type: true });
          setTimeout(() => {
            setphnostatus({ msg: "", type: true });
          }, 10000);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setphnostatus({
            msg: "Wrong OTP verified! Please check the OTP  recived by the given phone number",
            type: false,
          });
        });
    }
  };

  return (
    <>
      <div className="container">
        <form className="home-form">
          <div className="field" id="namediv">
            <label htmlFor="fullname">
              Full Name<span className="required-star">*</span>
            </label>
            <br />
            <input
              type="text"
              maxLength="30"
              name="fullname"
              onChange={handleChangeFullname}
              value={fullname}
              id="fullname"
              placeholder="Full Name..."
              autoFocus
              required
            />
          </div>
          <div className="field">
            <label htmlFor="phoneNumber">
              Phone Number<span className="required-star">*</span>
            </label>
            <br />
            <PhoneNumber
              value={phoneNumber}
              setValue={handleChangephoneNumber}
              inputProps={{
                name: "phoneNumber",
                disabled: loginstate,
                required: true,
              }}
            />

            {!otpreq && !loginstate && (
              <button type="button" id="otpbutton" onClick={requestOTP}>
                Request OTP
              </button>
            )}
            {loginstate && (
              <button type="button" id="signoutbutton" onClick={handlesignout}>
                Sign Out
              </button>
            )}
            {otpreq && (
              <input
                type="number"
                value={otp}
                onChange={verifyOTP}
                placeholder="Enter OTP"
              />
            )}
            <span style={{ color: phnostatus.type ? "green" : "red" }}>
              {phnostatus.msg}
            </span>
          </div>
          <div id="recaptcha-container"></div>
          <FormLocation loc={loc} setloc={setloc} />
          <div className="field">
            <FormImageInput userImage={userImage} setUserImage={setUserImage} />
          </div>
          <div className="field">
            <label htmlFor="majorComponents" id="majorcid">
              Select the major component of garbage (Select atleast 1 option)
              <span className="required-star">*</span>
            </label>
            <br />
            <Select
              isMulti
              name="majorComponents"
              options={options.majorComponents}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              components={animatedComponents}
              onChange={(val) => {
                setmajorcomp((values) => ({
                  ...values,
                  majorComponentsNumber: val.length,
                  majorComponents: val.map((a) => a.value),
                }));
              }}
            />
          </div>
          <FormQuestionSingle
            name="siteClean"
            set={setSiteClean}
            question="How often do you see the site clean?"
          />
          <FormQuestionSingle
            name="percentRecycle"
            set={setPercentRecycle}
            question="How much percent of garbage can be recycled?"
          />
          <FormQuestionSingle
            name="overflowingWaste"
            set={setOverflowingWaste}
            question="Since when are you seeing this site overflowing with waste?"
          />
          <div className="field">
            <label htmlFor="dustbin">
              Is there a Dustbin nearby?<span className="required-star">*</span>
            </label>
            <br />
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="dustbin"
              options={options.dustbin}
              onChange={(val) => {
                if (val.value === "No") {
                  setDustbinFilled("NA");
                } else {
                  setDustbinFilled("");
                }
                setdustbin(val.value);
              }}
            />
          </div>
          {dustbin === "Yes" && (
            <div className="field">
              <label htmlFor="dustbinFilled">
                Is the dustbin filled?<span className="required-star">*</span>
              </label>
              <br />
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="dustbinFilled"
                options={options.dustbinFilled}
                onChange={(val) => setDustbinFilled(val.value)}
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="PMCCollecting">
              Do you see PMC collecting garbage in this site?
              <span className="required-star">*</span>
            </label>
            <br />
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="PMCCollecting"
              options={options.PMCCollecting}
              onChange={(val) => {
                if (val.value === "No") {
                  setGarbageCollected("NA");
                } else {
                  setGarbageCollected("");
                }
                setPMCCollecting(val.value);
              }}
            />
          </div>
          {PMCCollecting === "Yes" && (
            <div className="field">
              <label htmlFor="garbagecollected">
                How often garbage maybe collected?
                <span className="required-star">*</span>
              </label>
              <br />
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="garbagecollected"
                options={options.garbageCollected}
                onChange={(val) => setGarbageCollected(val.value)}
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="siteCategory">
              Into which category does this site fit in?
              <span className="required-star">*</span>
            </label>
            <br />
            <Select
              isMulti
              name="siteCategory"
              options={options.siteCategory}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              components={animatedComponents}
              onChange={(val) => setsiteCategory(val.map((a) => a.value))}
            />
          </div>
          <div style={{ display: submit.state ? "block" : "none" }}>
            {submit.msg}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            value="submit"
            id="submitbtn"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
