import React from "react";

import { HeaderExplore } from "../component/header-explore";
import { Link } from "react-router-dom";
export default function HeaderTen() {
  return (
    <header className="header -type-1 js-header">
      <div className="header__container">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo">
                <Link data-barba to="/">
                  <img src="/assets/img/general/logo.svg" alt="logo" />
                </Link>
              </div>

              <HeaderExplore
                allClasses={
                  "header__explore text-green-1 ml-60 xl:ml-30 lg:d-none"
                }
              />
            </div>
          </div>

          <div className="col-auto lg:d-none">
            <div className="text-20 lh-1 text-white fw-500">
              The Ultimate Drawing Course Beginner to Advanced
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__buttons">
                <a href="#" className="button -sm -rounded -white text-dark-1">
                  Back to Course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
