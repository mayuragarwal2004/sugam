/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/auth/AuthState";
import "./css/style.css";
import "./css/headerfooter.css";

const Layout = () => {
  const [menu, setmenu] = useState(false);
  function handleClick() {
    setmenu((prev) => !prev);
  }
  const location = useLocation();

  const { currentUser } = useAuth();

  useEffect(() => {
    // runs on location, i.e. route, change
    setmenu(false);
  }, [location]);
  console.log(currentUser);
  return (
    <>
      <header data-role="Header" className="navigation-header">
        <div className="navigation-max-width">
          <Link to="/">
            <img
              alt="logo"
              width="300"
              src="/playground_assets/logo-1500h.png"
            />
          </Link>
          <div className="navigation-nav">
            <nav className="navigation-links-nav navigation-links-root-class-name17">
              <span className="navigation-links-text navigation-Link">
                <Link to="/">
                  <span>Home</span>
                </Link>
              </span>
              <span className="navigation-links-text1 navigation-Link">
                <Link to="/about">
                  <span>About</span>
                </Link>
              </span>
              <span className="navigation-links-text2 navigation-Link">
                <Link to="/analytics">
                  <span>Analytics</span>
                </Link>
              </span>
              {currentUser ? (
                <span className="navigation-links-text2 navigation-Link">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </span>
              ) : (
                <span className="navigation-links-text2 navigation-Link">
                  <Link to="/auth">
                    <span>Login/SignUp</span>
                  </Link>
                </span>
              )}
            </nav>
            <Link to="/form">
              <button className="navigation-register button-primary button button-md">
                <span>Complain</span>
              </button>
            </Link>
          </div>
          <div
            data-type="BurgerMenu"
            className="navigation-burger-menu"
            onClick={handleClick}
          >
            <svg viewBox="0 0 1024 1024" className="navigation-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div
            data-type="MobileMenu"
            className="navigation-mobile-menu"
            style={{ transform: !menu && "translateX(100%)" }}
          >
            <div className="navigation-nav1">
              <div className="navigation-container">
                <Link to="/">
                  <img
                    alt="image"
                    width="300"
                    src="/playground_assets/logo-1500h.png"
                  />
                </Link>
                <div
                  data-type="CloseMobileMenu"
                  className="navigation-close-mobile-menu"
                  onClick={handleClick}
                >
                  <svg viewBox="0 0 1024 1024" className="navigation-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav className="navigation-links-nav navigation-links-root-class-name18">
                <span className="navigation-links-text navigation-Link">
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </span>
                <span className="navigation-links-text1 navigation-Link">
                  <Link to="/about">
                    <span>About</span>
                  </Link>
                </span>
                <span className="navigation-links-text2 navigation-Link">
                  <Link to="/analytics">
                    <span>Analytics</span>
                  </Link>
                </span>
                {currentUser ? (
                  <span className="navigation-links-text2 navigation-Link">
                    <Link to="/dashboard">
                      <span>Dashboard</span>
                    </Link>
                  </span>
                ) : (
                  <span className="navigation-links-text2 navigation-Link">
                    <Link to="/auth">
                      <span>Login/SignUp</span>
                    </Link>
                  </span>
                )}
              </nav>
              <button className="navigation-register1 button-primary button button-md">
                <Link to="/form">
                  <span>Complain</span>
                </Link>
              </button>
            </div>
            <div>
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="navigation-icon04"
              >
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="navigation-icon06"
              >
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="navigation-icon08"
              >
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <Outlet context={[menu, setmenu]} />

      <footer className="footer-footer section-container footer-root-class-name">
        <div className="footer-max-width max-content-container">
          <div className="footer-bottom-container">
            <div className="footer-left-side">
              <img
                alt="image"
                src="playground_assets/logo-white-1200w.png"
                className="footer-image"
              />
              <span className="footer-text06">
                Complain about garbage dumps near you. Our team will clean it as
                soon as possible.
              </span>
              <div className="footer-social-media">
                <span className="footer-text07">Follow S.U.G.A.M</span>
                <div className="footer-container">
                  <svg viewBox="0 0 1024 1024" className="footer-icon">
                    <path d="M384 384h177.106v90.782h2.532c24.64-44.194 84.958-90.782 174.842-90.782 186.946 0 221.52 116.376 221.52 267.734v308.266h-184.61v-273.278c0-65.184-1.334-149.026-96.028-149.026-96.148 0-110.82 70.986-110.82 144.292v278.012h-184.542v-576z"></path>
                    <path d="M64 384h192v576h-192v-576z"></path>
                    <path d="M256 224c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 42.981-96 96-96s96 42.981 96 96z"></path>
                  </svg>
                  <svg viewBox="0 0 1024 1024" className="footer-icon04">
                    <path d="M512 92.2c136.8 0 153 0.6 206.8 3 50 2.2 77 10.6 95 17.6 23.8 9.2 41 20.4 58.8 38.2 18 18 29 35 38.4 58.8 7 18 15.4 45.2 17.6 95 2.4 54 3 70.2 3 206.8s-0.6 153-3 206.8c-2.2 50-10.6 77-17.6 95-9.2 23.8-20.4 41-38.2 58.8-18 18-35 29-58.8 38.4-18 7-45.2 15.4-95 17.6-54 2.4-70.2 3-206.8 3s-153-0.6-206.8-3c-50-2.2-77-10.6-95-17.6-23.8-9.2-41-20.4-58.8-38.2-18-18-29-35-38.4-58.8-7-18-15.4-45.2-17.6-95-2.4-54-3-70.2-3-206.8s0.6-153 3-206.8c2.2-50 10.6-77 17.6-95 9.2-23.8 20.4-41 38.2-58.8 18-18 35-29 58.8-38.4 18-7 45.2-15.4 95-17.6 53.8-2.4 70-3 206.8-3zM512 0c-139 0-156.4 0.6-211 3-54.4 2.4-91.8 11.2-124.2 23.8-33.8 13.2-62.4 30.6-90.8 59.2-28.6 28.4-46 57-59.2 90.6-12.6 32.6-21.4 69.8-23.8 124.2-2.4 54.8-3 72.2-3 211.2s0.6 156.4 3 211c2.4 54.4 11.2 91.8 23.8 124.2 13.2 33.8 30.6 62.4 59.2 90.8 28.4 28.4 57 46 90.6 59 32.6 12.6 69.8 21.4 124.2 23.8 54.6 2.4 72 3 211 3s156.4-0.6 211-3c54.4-2.4 91.8-11.2 124.2-23.8 33.6-13 62.2-30.6 90.6-59s46-57 59-90.6c12.6-32.6 21.4-69.8 23.8-124.2 2.4-54.6 3-72 3-211s-0.6-156.4-3-211c-2.4-54.4-11.2-91.8-23.8-124.2-12.6-34-30-62.6-58.6-91-28.4-28.4-57-46-90.6-59-32.6-12.6-69.8-21.4-124.2-23.8-54.8-2.6-72.2-3.2-211.2-3.2v0z"></path>
                    <path d="M512 249c-145.2 0-263 117.8-263 263s117.8 263 263 263 263-117.8 263-263c0-145.2-117.8-263-263-263zM512 682.6c-94.2 0-170.6-76.4-170.6-170.6s76.4-170.6 170.6-170.6c94.2 0 170.6 76.4 170.6 170.6s-76.4 170.6-170.6 170.6z"></path>
                    <path d="M846.8 238.6c0 33.91-27.49 61.4-61.4 61.4s-61.4-27.49-61.4-61.4c0-33.91 27.49-61.4 61.4-61.4s61.4 27.49 61.4 61.4z"></path>
                  </svg>
                  <svg viewBox="0 0 1024 1024" className="footer-icon08">
                    <path d="M920.021 283.179c12.245 65.237 19.115 140.587 18.645 218.667 0.811 65.195-5.248 139.392-18.645 214.229-2.432 8.875-6.4 17.195-11.605 24.533-9.685 13.696-23.808 24.107-40.491 28.8-25.771 6.869-91.989 11.733-165.419 14.549-95.147 3.669-190.507 3.669-190.507 3.669s-95.36 0-190.507-3.627c-73.429-2.816-139.648-7.637-164.949-14.421-8.747-2.432-16.896-6.315-24.149-11.435-13.269-9.387-23.509-22.869-28.587-39.381-12.16-65.109-18.944-140.203-18.475-218.027-0.896-65.707 5.163-140.459 18.645-215.893 2.432-8.875 6.4-17.195 11.605-24.533 9.685-13.696 23.808-24.107 40.491-28.8 25.771-6.869 91.989-11.733 165.419-14.549 95.147-3.627 190.507-3.627 190.507-3.627s95.36 0 190.549 3.328c73.344 2.56 140.032 6.955 164.523 12.928 9.344 2.688 17.963 7.040 25.515 12.757 13.099 9.899 22.955 23.936 27.435 40.875zM1003.093 263.552c-9.259-36.949-30.635-67.84-59.008-89.301-15.915-12.032-33.963-21.077-53.291-26.667-38.315-9.387-115.029-13.781-185.259-16.213-96.725-3.371-193.536-3.371-193.536-3.371s-96.939 0-193.749 3.712c-70.059 2.688-147.2 7.467-184.192 17.365-37.291 10.539-67.456 32.853-88.064 61.867-11.52 16.256-20.011 34.603-25.045 54.101-0.256 1.024-0.469 2.091-0.64 3.029-14.635 80.981-21.291 161.835-20.309 233.856-0.512 82.091 6.869 163.456 20.352 234.752 0.256 1.323 0.555 2.645 0.896 3.755 10.453 36.693 32.853 66.859 61.909 87.381 15.232 10.752 32.299 18.859 50.389 23.936 37.504 10.027 114.603 14.805 184.661 17.493 96.853 3.712 193.792 3.712 193.792 3.712s96.939 0 193.749-3.712c70.059-2.688 147.157-7.467 184.192-17.365 37.248-10.539 67.456-32.853 88.021-61.867 11.52-16.256 20.053-34.603 25.045-54.059 0.256-1.067 0.512-2.133 0.64-3.029 14.507-80.384 21.163-160.64 20.309-232.107 0.512-82.133-6.869-163.541-20.352-234.837-0.171-0.853-0.341-1.707-0.512-2.432zM458.667 567.509v-132.352l116.352 66.176zM437.077 677.931l245.333-139.52c20.48-11.648 27.648-37.717 16-58.197-3.968-6.997-9.643-12.459-16-16l-245.333-139.52c-20.48-11.648-46.549-4.48-58.197 16-3.84 6.741-5.632 14.080-5.589 21.077v279.040c0 23.552 19.115 42.667 42.667 42.667 7.765 0 15.019-2.091 21.077-5.589z"></path>
                  </svg>
                  <svg viewBox="0 0 1024 1024" className="footer-icon10">
                    <path d="M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 41-29.4 76.6-66.4 104.8-108.6z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="footer-links">
              <div
                className="footer-container1"
                style={{ visibility: "hidden" }}
              >
                <span className="footer-text08">Product</span>
                <span className="footer-link">ABOUT</span>
                <span className="footer-link">Agenda</span>
                <span className="footer-link">Register</span>
                <span className="footer-link">Speakers</span>
                <span className="footer-link">Location</span>
                <span className="footer-text14 footer-link">Workshops</span>
              </div>
              <div className="footer-container2">
                <span className="footer-text15">
                  <span>Quick Links</span>
                  <br />
                  <span></span>
                </span>
                <span className="footer-link">HOME</span>
                <span className="footer-link">ABOUT US</span>
                <span className="footer-link">COMPLAIN</span>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <span className="footer-text23">
              <span>
                <span>© All rights reserved </span>
                <span>{new Date().getFullYear()}</span>
              </span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
