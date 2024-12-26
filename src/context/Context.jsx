import { coursesData } from "@/data/courses";
import { events } from "@/data/events";
import { productData } from "@/data/products";
import React, {createContext, useEffect} from "react";
import { useContext, useState } from "react";
import api from "@/api/api.jsx";
import {Constants} from "@/constants/constants.jsx";
import {useAuth} from "@/provider/authProvider.jsx";
const dataContext = React.createContext();
const UserProfileContext = createContext();

export const useUserProfile = () => useContext(UserProfileContext);
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const [cartCourses, setCartCourses] = useState([
    {
      id: 3,
      imageSrc: "/assets/img/coursesCards/6.png",
      authorImageSrc: "/assets/img/general/avatar-1.png",
      title: "Angular - The Complete Guide (2022 Edition)",
      rating: 4.5,
      ratingCount: 1991,
      lessonCount: 6,
      duration: 1220,
      level: "Intermediate",
      originalPrice: 249,
      discountedPrice: 129,
      languange: "Italian",
      authorName: "Albert Flores",
      paid: true,
      category: "Programming",
      state: "Trending",
      viewStatus: "Great",
      difficulty: "Easy",
      desc: "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online.",
      quantity: 1,
    },
  ]);
  const [cartEvents, setCartEvents] = useState([]);

  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { token } = useAuth(); // Get the token from AuthContext

  const [courses, setCourses] = useState([]); // All courses
  const [singleCourse, setSingleCourse] = useState(null); // Specific course details
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling errors



  const addCourseToCart = (id) => {
    if (!cartCourses.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...coursesData.filter((elm) => elm.id == id)[0],
        quantity: 1,
      };
      setCartCourses((pre) => [...pre, item]);
    }
  };
  const isAddedToCartCourses = (id) => {
    if (cartCourses.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };
  const addProductToCart = (id) => {
    if (!cartProducts.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...productData.filter((elm) => elm.id == id)[0],
        quantity: 1,
      };
      setCartProducts((pre) => [...pre, item]);
    }
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };
  const addEventToCart = (id) => {
    if (!cartEvents.filter((elm) => elm.id == id)[0]) {
      const item = { ...events.filter((elm) => elm.id == id)[0], quantity: 1 };
      setCartEvents((pre) => [...pre, item]);
    }
  };
  const isAddedToCartEvents = (id) => {
    if (cartEvents.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  const fetchProfile = async () => {
    if (!token) return; // If no token, exit the function

    setLoadingProfile(true);
    try {
      const response = await api.get(Constants.API_ENDPOINTS.USER.PROFILE);
      console.log(response)
      setProfile(response); // Set the profile data
      setProfilePic(response?.avatar || null); // Set the profile picture
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoadingProfile(false);
    }
  };


  // Fetch all courses
  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get(Constants.API_ENDPOINTS.COURSES.ALL);
      setCourses(response);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single course by ID
  const fetchCourseById = async (courseId) => {
    setLoading(true);
    try {
      const response = await api.get(
          `${Constants.API_ENDPOINTS.COURSES.DETAIL}/${courseId}`
      );
      setSingleCourse(response);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to monitor token changes and fetch profile accordingly
  useEffect(() => {
    if (token) {
      fetchProfile(); // Fetch profile whenever a new token is set
      fetchAllCourses();
    }
  }, [token]);


  // User Profile Context Value
  const userProfileValue = {
    profile,
    profilePic,
    loadingProfile,
  };

  const contextElement = {
    cartProducts,
    setCartProducts,
    addProductToCart,
    isAddedToCartProducts,

    addCourseToCart,
    isAddedToCartCourses,
    cartCourses,
    setCartCourses,

    cartEvents,
    setCartEvents,
    addEventToCart,
    isAddedToCartEvents,

    courses,
    singleCourse,
    loading,
    error,
    fetchAllCourses,
    fetchCourseById,
  };
  return (
      <UserProfileContext.Provider value={userProfileValue}>
        <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>
      </UserProfileContext.Provider>
  );
}
