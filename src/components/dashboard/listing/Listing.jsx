import React, { useState } from "react";
import FooterNine from "../../layout/footers/FooterNine";
import Media from "./Media";
import Curriculum from "./Curriculum";
import { Constants } from "@/constants/constants.jsx";
import api from "@/api/api";

export default function Listing() {
  const [courseData, setCourseData] = useState({
    courseName: "",
    type: "",
    title: "",
    description: "",
    beginDate: "",
    endDate: "",
    price: "",
    learningOutcomes: "",
    requirements: "",
    level: "",
    language: "",
    captions: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting course:", courseData);
  
    const sanitizedData = Object.fromEntries(
      Object.entries(courseData).map(([key, value]) => [key, value || null])
    );
  
    try {
      const token = sessionStorage.getItem("rtoken"); // Retrieve token
  
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
  
      const response = await api.post(
        `${Constants.API_ENDPOINTS.COURSES.CREATE}`, 
        sanitizedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("rtoken")}`, 
          },
        }
      );
      
  
      if (response.data.status === "success") {
        console.log("Course created successfully!", response.data);
        alert("Course created successfully!");
  
        setCourseData({
          courseName: "",
          type: "",
          title: "",
          description: "",
          beginDate: "",
          endDate: "",
          price: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to create course.");
      }
    } catch (error) {
      console.error("Error creating course:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "An unexpected error occurred.");
    }
  };
  

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">Enter course details below.</div>
          </div>
        </div>
        

        <div className="row y-gap-60">
          <Media />
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
                <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Course Title*</label>
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      value={courseData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Category*</label>
                    <input
                      type="text"
                      placeholder="Category"
                      name="type"
                      value={courseData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Short Description*</label>
                    <textarea
                      name="description"
                      placeholder="Description"
                      rows="5"
                      value={courseData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Price ($)*</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Price"
                      value={courseData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="button -md -purple-1 text-white">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Curriculum</h2>
              </div>
              <Curriculum />
            </div>
          </div> */}

        </div>
      </div>

      <FooterNine />
    </div>
  );
}
