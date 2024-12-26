import React from "react";
import { footerLinks } from "../../../data/footerLinks";
import { Link } from "react-router-dom";
export default function FooterLinksTwo({ allClasses, parentClass }) {
  return (
    <>
      {footerLinks.slice(0, 3).map((elm, i) => (
        <div key={i} className={parentClass || "col-xl-4 col-lg-4 col-md-6 "}>
          <div className={`${allClasses ? allClasses : ""}`}>{elm.title}</div>
          <div className="d-flex y-gap-10 flex-column text-white">
            {elm.links.map((itm, index) => (
              <Link key={index} to={itm.href}>
                {itm.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
