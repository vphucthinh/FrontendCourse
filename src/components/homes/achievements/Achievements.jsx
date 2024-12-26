import React from "react";
import { schoolAchievement } from "../../../data/achievements";

export default function Achievements() {
  return (
    <section className="layout-pt-lg layout-pb-lg section-bg">
      <div className="section-bg__item bg-light-6"></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">School Achievements</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>
        </div>

        <div className="row pt-60">
          {schoolAchievement.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                <div className="infoCard__image">
                  <img src={elm.imageSrc} alt="image" />
                </div>
                <h5 className="infoCard__title text-24 lh-1 mt-25">
                  {elm.title}
                </h5>
                <p className="infoCard__text mt-5">{elm.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
