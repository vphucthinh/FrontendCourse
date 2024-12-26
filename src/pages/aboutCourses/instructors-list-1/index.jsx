import Instractors from "@/components/aboutCourses/instractors/Instractors";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Instractors-list-1 || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function InstractorListPage1() {
  return (
    <main className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />

        <Instractors />

        <FooterOne />
      </div>
    </main>
  );
}
