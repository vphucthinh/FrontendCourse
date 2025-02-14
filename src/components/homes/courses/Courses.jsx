import { useState, useEffect } from "react";
import CourceCard from "../courseCards/CourseCard";
import {getAllCourses} from "@/services/courseService.jsx";
import {catagories} from "@/data/courses.js";


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getAllCourses();
      setCourses(data);
      setFiltered(data);
    };
    fetchCourses();
  }, []);


  useEffect(() => {
    if (category === "All Categories") {
      setFiltered(courses);
    } else {
      setFiltered(courses.filter((course) => course.category === category));
    }
  }, [category, courses]);

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle">
            <h2 className="sectionTitle__title sm:text-24">
              Our Most Popular Courses
            </h2>
            <p className="sectionTitle__text">10,000+ unique online course list designs</p>
          </div>
        </div>
      </div>

      <div className="tabs__controls flex-wrap pt-50 d-flex justify-center x-gap-10 js-tabs-controls">
        {catagories.map((elm, i) => (
          <button
            key={i}
            onClick={() => setCategory(elm)}
            className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
              category === elm ? "tabActive" : ""
            }`}
            type="button"
          >
            {elm}
          </button>
        ))}
      </div>

      <div
        className="pt-60 m-auto row y-gap-30 container pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        {filtered.map((elm, index) => (
          <CourceCard key={index} data={elm} data-aos="fade-right" data-aos-duration={(index + 1) * 300} />
        ))}
      </div>
    </section>
  );
}
