import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import EventDetails from "@/components/events/EventDetails";

import { useParams } from "react-router-dom";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Event-details || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function EventSingPage() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <EventDetails id={params.id} />

        <FooterOne />
      </div>
    </div>
  );
}
