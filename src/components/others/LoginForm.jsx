import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Constants } from "@/constants/constants.jsx";
import api from "@/api/api.jsx";
import { useAuth } from "@/provider/authProvider";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await api.post(
        `${Constants.API_URL}/${Constants.API_ENDPOINTS.AUTH.LOGIN}`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access, refresh } = response.data.data;
      localStorage.setItem("rtoken", refresh);
      sessionStorage.setItem("rtoken", refresh);
      setToken(access);

      return response;
    } catch (error) {
      throw error.response?.data?.message || "An unexpected error occurred.";
    }
  };

  // Xử lý khi người dùng nhấn nút "Login"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don’t have an account yet?
                <Link to="/signup" className="text-purple-1">Sign up for free</Link>
              </p>

              {error && (
                <div className="row y-gap-20">
                  <div className="col-12">
                    <div className="d-flex items-center justify-between bg-error-1 pl-30 pr-20 py-30 rounded-8">
                      <div className="text-error-2 lh-1 fw-500">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              <form
                className="contact-form respondForm__form row y-gap-20 pt-10"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Username Or Email</label>
                  <input
                    required
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}