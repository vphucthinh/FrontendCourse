import "./styles/index.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { Route } from "react-router-dom";

import AuthProvider from "./provider/authProvider";
import Routes from "./router/routes.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Context from "@/context/Context";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <AuthProvider>
      <Context>
          <Routes />
      </Context>
    </AuthProvider>
  );
}

export default App;
