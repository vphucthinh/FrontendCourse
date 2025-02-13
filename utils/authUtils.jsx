export const logout = () => {
    // Remove tokens from session storage
    sessionStorage.removeItem("rtoken");
    sessionStorage.removeItem("atoken");

    // Optionally, you can redirect the user to the login page
    window.location.href = "/login";
};