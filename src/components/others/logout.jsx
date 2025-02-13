import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove tokens from session storage
        sessionStorage.removeItem("rtoken");
        sessionStorage.removeItem("atoken");

        // Redirect to the login page
        navigate("/login");
    }, [navigate]);

    return null; // This component doesn't render anything
};

export default Logout;