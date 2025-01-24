import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Constants } from "@/constants/constants.jsx";
import api from "@/api/api.jsx";
import axios from "axios";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); 
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false); 
      return;
    }
  
    const payload = { email, username, password };
  
    try {
      const response = await api.post(
        `${Constants.API_ENDPOINTS.AUTH.REGISTER}`,
        payload,
        {headers:{ "Content-Type": "application/json"}}
      );
      console.log("User registered successfully:", response.data);

      window.location.href = "/login";
    } catch (error) {
      console.error("Error during registration:", error);
  
      if (axios.isAxiosError(error)) {
        // Kiểm tra nếu error là do Axios
        if (error.response) {
          // Lỗi từ phía backend
          setError(error.response.data?.message || "Server error occurred.");
        } else if (error.request) {
          // Lỗi kết nối mạng hoặc server không phản hồi
          setError("No response from the server. Please check your network or try again later.");
        } else {
          // Lỗi cấu hình request hoặc vấn đề khác
          setError("An unexpected error occurred.");
        }
      } else {
        // Lỗi không phải từ Axios
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false); // Dừng trạng thái loading sau khi xử lý xong
    }
  };
  

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-1">
                  Log in
                </Link>
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
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                    disabled={isLoading} // Vô hiệu hóa khi đang loading
                  >
                    {isLoading ? "Registering..." : "Register"}
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
