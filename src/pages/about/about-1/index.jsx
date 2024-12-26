import About from "@/components/about/About";

import Brands from "@/components/common/Brands";
import Instructors from "@/components/common/Instructors";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import WhyCourse from "@/components/homes/WhyCourse";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "About-1 || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function AboutPage1() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <About />
        <WhyCourse />

        <TestimonialsOne />
        <Instructors />
        <Brands />

        <FooterOne />
      </div>
    </div>
  );
}
