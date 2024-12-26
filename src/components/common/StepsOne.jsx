import React from "react";
import { stepsTwo } from "../../data/steps";

export default function StepsOne() {
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">How it works?</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-40">
          {stepsTwo.map((elm, i) => (
            <React.Fragment key={i}>
              <div className="col-xl-2 col-lg-3 col-md-6">
                <div className="d-flex flex-column items-center text-center">
                  <div className="relative size-120 d-flex justify-center items-center rounded-full bg-light-4">
                    <img src={elm.imageSrc} alt="image" />
                    <div className="side-badge">
                      <div className="size-35 d-flex justify-center items-center rounded-full bg-dark-1 -dark-bg-purple-1">
                        <span className="text-14 fw-500 text-white">
                          0{elm.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-17 fw-500 text-dark-1 mt-30">
                    {elm.text}
                  </div>
                </div>
              </div>

              {i === 0 && (
                <div className="col-auto xl:d-none">
                  <div className="pt-30">
                    <img src="/assets/img/misc/lines/1.svg" alt="icon" />
                  </div>
                </div>
              )}
              {i === 1 && (
                <div className="col-auto xl:d-none">
                  <div className="pt-30">
                    <img src="/assets/img/misc/lines/2.svg" alt="icon" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
