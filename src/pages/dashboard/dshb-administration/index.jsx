import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import Administration from "@/components/dashboard/Administration";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Dashboard-administration || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function DshbAdministrationPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <Administration />
          </div>
        </div>
      </main>
    </div>
  );
}
