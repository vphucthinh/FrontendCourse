import React, { useEffect, useState } from "react";
import { HeaderExplore } from "../component/header-explore";
import SearchToggle from "../component/SearchToggle";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import { Link } from "react-router-dom";
import MobileMenu from "../component/MobileMenu";
import { Constants } from "@/constants/constants.jsx";
import api from "@/api/api.jsx";
import {useUserProfile} from "@/context/Context.jsx";
import {useAuth} from "@/provider/authProvider.jsx";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const { token } = useAuth(); // Get the token from AuthContext
  const { profilePic, loadingProfile } = useUserProfile();

  return (
      <header className="header -type-1">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo">
                  <Link to="/">
                    <img src="/assets/img/general/logo.svg" alt="logo" />
                  </Link>
                </div>
                <HeaderExplore allClasses={"header__explore text-green-1 ml-60 xl:ml-30 xl:d-none"} />
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu setActiveMobileMenu={setActiveMobileMenu} activeMobileMenu={activeMobileMenu} />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  <SearchToggle />
                  <CartToggle parentClassess={"relative ml-30 xl:ml-20"} allClasses={"d-flex items-center text-white"} />
                  <div className="d-none xl:d-block ml-20">
                    <button onClick={() => setActiveMobileMenu(true)} className="text-white items-center" data-el-toggle=".js-mobile-menu-toggle">
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                  {loadingProfile ? ( // Show loading indicator
                      <div>Loading...</div>
                  ) : token ? (
                      <div className="header__logo ml-30 md:ml-20">
                        <Link to="/dshb-dashboard">
                          <img
                              src={`${Constants.API_ENDPOINTS.IMG_ROOT}/${profilePic }` || "@/assets/img/misc/user-profile.png"} // Use fallback if profilePic is null
                              alt="Profile"
                              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                          />
                        </Link>
                      </div>
                  ) : (
                      <>
                        <Link to="/login" className="button -underline text-white">
                          Log in
                        </Link>
                        <Link to="/signup" className="button -sm -white text-dark-1 ml-30">
                          Sign up
                        </Link>
                      </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
