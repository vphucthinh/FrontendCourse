import ModeChanger from "@/components/homes/ModeChanger";
import HomeNine from "@/components/homes/homepageWrappers/HomeNine";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home-10 || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function HomePage10() {
  return (
    <div>
      <MetaComponent meta={metadata} />
      <ModeChanger />
      <HomeNine />
    </div>
  );
}
