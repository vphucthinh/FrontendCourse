import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage1 from "@/pages/index.jsx";
import CourseListPage1 from "@/pages/coursesList/courses-list-1/index.jsx";
import CourseSinglePage1 from "@/pages/courseSingle/courses/index.jsx";
import CourseCartPage from "@/pages/cartPages/course-cart/index.jsx";
import CourseCheckoutPage from "@/pages/cartPages/course-checkout/index.jsx";
import LessonSinglePage1 from "@/pages/aboutCourses/lesson-single-1/index.jsx";
import InstractorSinglePage from "@/pages/aboutCourses/instructors/index.jsx";
import DashboardPage from "@/pages/dashboard/dashboard/index.jsx";
import DshbCoursesPage from "@/pages/dashboard/dshb-courses/index.jsx";
import DshbBookmarksPage from "@/pages/dashboard/dshb-bookmarks/index.jsx";
import DshbListingPage from "@/pages/dashboard/dshb-listing/index.jsx";
import DshbReviewsPage from "@/pages/dashboard/dshb-reviews/index.jsx";
import DshbSettingsPage from "@/pages/dashboard/dshb-settings/index.jsx";
import DshbAdministrationPage from "@/pages/dashboard/dshb-administration/index.jsx";
import DshbAssignmentPage from "@/pages/dashboard/dshb-assignment/index.jsx";
import DshbCalenderPage from "@/pages/dashboard/dshb-calendar/index.jsx";
import DshbDashboardPage from "@/pages/dashboard/dshb-dashboard/index.jsx";
import DshbDictionaryPage from "@/pages/dashboard/dshb-dictionary/index.jsx";
import DshbForumsPage from "@/pages/dashboard/dshb-forums/index.jsx";
import DshbGradesPage from "@/pages/dashboard/dshb-grades/index.jsx";
import DshbMessagesPage from "@/pages/dashboard/dshb-messages/index.jsx";
import DshbPartcipentPage from "@/pages/dashboard/dshb-participants/index.jsx";
import DshbQuizPage from "@/pages/dashboard/dshb-quiz/index.jsx";
import DshbServeyPage from "@/pages/dashboard/dshb-survey/index.jsx";
import EventListPage1 from "@/pages/events/event-list-1/index.jsx";
import EventSingPage from "@/pages/events/events/index.jsx";
import EventCartPage from "@/pages/cartPages/event-cart/index.jsx";
import EventCheckoutPage from "@/pages/cartPages/event-checkout/index.jsx";
import BlogListpage1 from "@/pages/blogs/blog-list-1/index.jsx";
import AboutPage2 from "@/pages/about/about-2/index.jsx";
import ContactPage2 from "@/pages/contacts/contact-2/index.jsx";
import ShopCartPage from "@/pages/cartPages/shop-cart/index.jsx";
import ShopCheckoutPage from "@/pages/cartPages/shop-checkout/index.jsx";
import ShopListPage from "@/pages/shop/shop-list/index.jsx";
import ShopOrderPage from "@/pages/shop/shop-order/page.jsx";
import LoginPage from "@/pages/others/login/index.jsx";
import ShopdetailsPage from "@/pages/shop/shop/index.jsx";
import NotFoundPage from "@/pages/not-found.jsx";
import InstractorListPage1 from "@/pages/aboutCourses/instructors-list-1/index.jsx";
import HomePage2 from "@/pages/homes/home-2/index.jsx";
import SignupPage from "@/pages/others/signup/index.jsx";
import PricingPage from "@/pages/others/pricing/index.jsx";
import TermsPage from "@/pages/others/terms/index.jsx";
import HelpCenterPage from "@/pages/others/help-center/index.jsx";
import UIElementsPage from "@/pages/others/ui-elements/index.jsx";
import EventListPage2 from "@/pages/events/event-list-2/index.jsx";
import BlogdetailsPage from "@/pages/blogs/blogs/index.jsx";
import BlogListpage3 from "@/pages/blogs/blog-list-3/index.jsx";
import BlogListpage2 from "@/pages/blogs/blog-list-2/index.jsx";
import AboutPage1 from "@/pages/about/about-1/index.jsx";
import ContactPage1 from "@/pages/contacts/contact-1/index.jsx";
import LessonSinglePage2 from "@/pages/aboutCourses/lesson-single-2/index.jsx";
import InstractorListPage2 from "@/pages/aboutCourses/instructors-list-2/index.jsx";
import InstractoBacomePage from "@/pages/aboutCourses/instructor-become/index.jsx";
import CourseSinglePage2 from "@/pages/courseSingle/courses-single-2/index.jsx";
import CourseSinglePage3 from "@/pages/courseSingle/courses-single-3/index.jsx";
import CourseSinglePage4 from "@/pages/courseSingle/courses-single-4/index.jsx";
import CourseSinglePage6 from "@/pages/courseSingle/courses-single-6/page.jsx";
import CourseSinglePage5 from "@/pages/courseSingle/courses-single-5/index.jsx";
import CourseListPage2 from "@/pages/coursesList/courses-list-2/index.jsx";
import CourseListPage3 from "@/pages/coursesList/courses-list-3/index.jsx";
import CourseListPage4 from "@/pages/coursesList/courses-list-4/index.jsx";
import CourseListPage5 from "@/pages/coursesList/courses-list-5/index.jsx";
import CourseListPage6 from "@/pages/coursesList/courses-list-6/index.jsx";
import CourseListPage7 from "@/pages/coursesList/courses-list-7/index.jsx";
import CourseListPage8 from "@/pages/coursesList/courses-list-8/index.jsx";
import HomePage3 from "@/pages/homes/home-3/index.jsx";
import HomePage4 from "@/pages/homes/home-4/index.jsx";
import HomePage5 from "@/pages/homes/home-5/index.jsx";
import HomePage6 from "@/pages/homes/home-6/index.jsx";
import HomePage7 from "@/pages/homes/home-7/index.jsx";
import HomePage8 from "@/pages/homes/home-8/index.jsx";
import HomePage9 from "@/pages/homes/home-9/index.jsx";
import HomePage10 from "@/pages/homes/home-10/index.jsx";

const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path:"*",
            element: <NotFoundPage />
        },

    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                { path: "/", element: <HomePage1 /> },
                { path: "home-2", element: <HomePage2 /> },
                { path: "home-3", element: <HomePage3 /> },
                { path: "home-4", element: <HomePage4 /> },
                { path: "home-5", element: <HomePage5 /> },
                { path: "home-6", element: <HomePage6 /> },
                { path: "home-7", element: <HomePage7 /> },
                { path: "home-8", element: <HomePage8 /> },
                { path: "home-9", element: <HomePage9 /> },
                { path: "home-10", element: <HomePage10 /> },
                { path: "logout", element: <div>Logout</div> },
                { path: "courses-list-1", element: <CourseListPage1 /> },
                { path: "courses-list-2", element: <CourseListPage2 /> },
                { path: "courses-list-3", element: <CourseListPage3 /> },
                { path: "courses-list-4", element: <CourseListPage4 /> },
                { path: "courses-list-5", element: <CourseListPage5 /> },
                { path: "courses-list-6", element: <CourseListPage6 /> },
                { path: "courses-list-7", element: <CourseListPage7 /> },
                { path: "courses-list-8", element: <CourseListPage8 /> },
                { path: "courses/:id", element: <CourseSinglePage1 /> },
                { path: "courses-single-2/:id", element: <CourseSinglePage2 /> },
                { path: "courses-single-3/:id", element: <CourseSinglePage3 /> },
                { path: "courses-single-4/:id", element: <CourseSinglePage4 /> },
                { path: "courses-single-5/:id", element: <CourseSinglePage5 /> },
                { path: "courses-single-6/:id", element: <CourseSinglePage6 /> },
                { path: "course-cart", element: <CourseCartPage /> },
                { path: "course-checkout", element: <CourseCheckoutPage /> },
                { path: "lesson-single-1", element: <LessonSinglePage1 /> },
                { path: "lesson-single-2", element: <LessonSinglePage2 /> },
                { path: "instructors/:id", element: <InstractorSinglePage /> },
                { path: "instructors-list-1", element: <InstractorListPage1 /> },
                { path: "instructors-list-2", element: <InstractorListPage2 /> },
                { path: "instructor-become", element: <InstractoBacomePage /> },
                { path: "dashboard", element: <DashboardPage /> },
                { path: "dshb-courses", element: <DshbCoursesPage /> },
                { path: "dshb-bookmarks", element: <DshbBookmarksPage /> },
                { path: "dshb-listing", element: <DshbListingPage /> },
                { path: "dshb-reviews", element: <DshbReviewsPage /> },
                { path: "dshb-settings", element: <DshbSettingsPage /> },
                { path: "dshb-administration", element: <DshbAdministrationPage /> },
                { path: "dshb-assignment", element: <DshbAssignmentPage /> },
                { path: "dshb-calendar", element: <DshbCalenderPage /> },
                { path: "dshb-dashboard", element: <DshbDashboardPage /> },
                { path: "dshb-dictionary", element: <DshbDictionaryPage /> },
                { path: "dshb-forums", element: <DshbForumsPage /> },
                { path: "dshb-grades", element: <DshbGradesPage /> },
                { path: "dshb-messages", element: <DshbMessagesPage /> },
                { path: "dshb-participants", element: <DshbPartcipentPage /> },
                { path: "dshb-quiz", element: <DshbQuizPage /> },
                { path: "dshb-survey", element: <DshbServeyPage /> },
                { path: "event-list-1", element: <EventListPage1 /> },
                { path: "event-list-2", element: <EventListPage2 /> },
                { path: "events/:id", element: <EventSingPage /> },
                { path: "event-cart", element: <EventCartPage /> },
                { path: "event-checkout", element: <EventCheckoutPage /> },
                { path: "blog-list-1", element: <BlogListpage1 /> },
                { path: "blog-list-2", element: <BlogListpage2 /> },
                { path: "blog-list-3", element: <BlogListpage3 /> },
                { path: "blogs/:id", element: <BlogdetailsPage /> },
                { path: "about-1", element: <AboutPage1 /> },
                { path: "about-2", element: <AboutPage2 /> },
                { path: "contact-1", element: <ContactPage1 /> },
                { path: "contact-2", element: <ContactPage2 /> },
                { path: "shop-cart", element: <ShopCartPage /> },
                { path: "shop-checkout", element: <ShopCheckoutPage /> },
                { path: "shop-list", element: <ShopListPage /> },
                { path: "shop-order", element: <ShopOrderPage /> },
                { path: "shop/:id", element: <ShopdetailsPage /> },
                { path: "pricing", element: <PricingPage /> },
                { path: "not-found", element: <NotFoundPage /> },
                { path: "*", element: <NotFoundPage /> },
                { path: "terms", element: <TermsPage /> },
                { path: "help-center", element: <HelpCenterPage /> },
                { path: "login", element: <LoginPage /> },
                { path: "signup", element: <SignupPage /> },
                { path: "ui-elements", element: <UIElementsPage /> },
            ],
        },
    ];


    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path:"/signup",
            element: <SignupPage />
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;