import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import "./css/home.css";

const Home = () => {
  const [menu, setmenu] = useOutletContext();
  useEffect(() => {
    setmenu(false);
  }, []);

  const [img, setimg] = useState(1);
  function plusSlides(v) {
    console.log("clicked");
    if (img + v > 3) {
      setimg(1);
    } else if (img + v < 1) {
      setimg(3);
    } else {
      setimg(img + v);
    }
  }
  function currentSlide(v) {
    setimg(v);
  }
  return (
    <>
      <div className="home-previous-events section-container">
        <div className="home-max-width max-content-container">
          <div className="home-heading-container">
            <h1 className="home-text heading2">
              <span>
                S<span className="greencolor">.</span>U
                <span className="greencolor">.</span>G
                <span className="greencolor">.</span>A
                <span className="greencolor">.</span>M
              </span>
            </h1>
            <span className="home-text02" id="sugamabbv">
              <span className="greencolor">S</span>trategic identification of{" "}
              <span className="greencolor">U</span>rban garbage with{" "}
              <span className="greencolor">G</span>eospatial{" "}
              <span className="greencolor">A</span>nalysis and{" "}
              <span className="greencolor">M</span>onitoring
            </span>
          </div>
        </div>
        <div className="slideshow-container">
          <div
            className="mySlides fade"
            style={{ display: img === 1 ? "block" : "none" }}
          >
            <div className="numbertext">1 / 3</div>
            <img
              src="playground_assets/2.jpg"
              style={{ width: "100%" }}
              alt="img"
            />
          </div>
          <div
            className="mySlides fade"
            style={{ display: img === 2 ? "block" : "none" }}
          >
            <div className="numbertext">2 / 3</div>
            <img
              src="playground_assets/2.jpg"
              style={{ width: "100%" }}
              alt="img"
            />
          </div>
          <div
            className="mySlides fade"
            style={{ display: img === 3 ? "block" : "none" }}
          >
            <div className="numbertext">3 / 3</div>
            <img
              src="playground_assets/3.jpg"
              style={{ width: "100%" }}
              alt="img"
            />
          </div>
          <span className="prev" onClick={() => plusSlides(-1)}>
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M250 176l92-90 426 426-426 426-92-90 338-336z"></path>
            </svg>
          </span>
          <span className="next" onClick={() => plusSlides(1)}>
            <svg viewBox="0 0 1024 1024" className="home-icon2">
              <path d="M250 176l92-90 426 426-426 426-92-90 338-336z"></path>
            </svg>
          </span>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <span
            className={img === 1 ? "dot" : "dot active"}
            onClick={() => currentSlide(1)}
          ></span>
          <span
            className={img === 2 ? "dot" : "dot active"}
            onClick={() => currentSlide(2)}
          ></span>
          <span
            className={img === 3 ? "dot" : "dot active"}
            onClick={() => currentSlide(3)}
          ></span>
        </div>
      </div>
      {/* <div
        className="home-agenda section-container"
        style={{
          backgroundColor: "rgba(144, 149, 167, 0.08)",
          paddingTop: "75px",
        }}
      >
        <div className="home-max-width2 max-content-container">
          <div className="home-heading-container1">
            <h1 className="home-text11 heading2">View Analytics</h1>
          </div>
          <div style={{ height: "400px", width: "75%" }}>
            <img
              src="playground_assets/analyticsgraphics.gif"
              alt="Computer man"
              style={{ height: "100%", margin: "auto" }}
            />
            <Link to="/analytics">
              <button className="button button-md button-outline">
                View Analytics {">"}
              </button>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="home-workshops">
        <div className="home-content-container1">
          <div className="home-container1">
            <h1 className="home-text12">
              <span className="home-text13">Complain</span>
              <br />
              <span>Here</span>
              <br />
            </h1>
            <span className="home-text17">
              Please report open garbage dumps near you
            </span>
            <span className="home-text18">
              Your Complaints will reach the required person in charge.
              Appropriate actions will be taken as soon as possible. The is no
              limit to your complaints. We are here to hear you.
            </span>
            <Link to="/form">
              <button className="button button-md button-outline">
                Complaint Here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
