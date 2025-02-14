import React, { useEffect, useState } from "react";
import { getPaginatedCourses } from "@/services/courseService";
import PaginationTwo from "../common/PaginationTwo";
import { Link } from "react-router-dom";
import Star from "../common/Star";

export default function CourseListFive() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageCapacity = 12;

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getPaginatedCourses(pageNumber - 1, pageCapacity);
      setCourses(data.data || []); // ✅ Ensure we extract the 'data' array
      console.log(data)
      setTotalPages(data.totalPages || 1);
    };

    fetchCourses();
  }, [pageNumber]);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <h1 className="page-header__title">User Interface Courses</h1>
                <p className="page-header__text">
                  Write an introductory description of the category.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="accordion js-accordion">
            <div className="accordion__item is-active">
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">{courses.length}</span> courses{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="row y-gap-30">
            {courses.map((elm, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="coursesCard -type-1 rounded-8 bg-white shadow-3">
                  <div className="relative">
                    <div className="coursesCard__image overflow-hidden rounded-top-8">
                      <img
                        className="w-1/1"
                        src={elm.imageUrls?.[0] || "/assets/img/placeholder.jpg"} // Handle missing images
                        alt={elm.courseName || "Course"}
                      />
                      <div className="coursesCard__image_overlay rounded-top-8"></div>
                    </div>
                  </div>

                  <div className="h-100 pt-20 pb-15 px-30">
                    {/* Rating */}
                    <div className="d-flex items-center">
                      <div className="text-14 lh-1 text-yellow-1 mr-10">
                        {elm.rating || "5"}
                      </div>
                      <div className="d-flex x-gap-5 items-center">
                        <Star star={elm.rating || 5} />
                      </div>
                      <div className="text-13 lh-1 ml-10">
                        ({elm.ratingCount || 1000})
                      </div>
                    </div>

                    {/* Course Title */}
                    <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                      <Link className="linkCustom" to={`/courses/${elm.id}`}>
                        {elm.courseName}
                      </Link>
                    </div>

                    {/* Course Info */}
                    <div className="d-flex x-gap-10 items-center pt-10">
                      <div className="d-flex items-center">
                        <div className="mr-8">
                          <img src="/assets/img/coursesCards/icons/2.svg" alt="icon"/>
                        </div>
                        <div className="text-14 lh-1">Start: {elm.beginDate}</div>
                      </div>

                      <div className="d-flex items-center">
                        <div className="mr-8">
                          <img src="/assets/img/coursesCards/icons/2.svg" alt="icon"/>
                        </div>
                        <div className="text-14 lh-1">End: {elm.endDate}</div>
                      </div>
                    </div>
                    {/* Course Footer */}
                    <div className="coursesCard-footer">
                      <div className="coursesCard-footer__author">
                        <img
                          src={elm.authorImageSrc || "/assets/img/general/avatar-1.png"}
                          alt="Author"
                        />
                        <div>{elm.authorName || "John Doe"}</div>
                      </div>

                      <div className="coursesCard-footer__price">
                        {elm.price ? (
                          <>
                            <div>${elm.price}</div>
                          </>
                        ) : (
                          <div>Free</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={courses}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
