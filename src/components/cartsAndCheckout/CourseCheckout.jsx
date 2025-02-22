import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import api from "@/api/api";
import { Constants } from "@/constants/constants";
export default function CourseCheckOut() {
  const { cartCourses, setCartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, course) => {
      return accumulator + course.discountedPrice * course.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = "exampleUser"; // Replace with the actual username
  
    const checkoutRequest = {
      courseIds: cartCourses.map((course) => course.id),
      currency: "VND",
    };
  
    try {
      const url = `${Constants.API_URL}/${Constants.API_ENDPOINTS.CHECKOUT.STRIPE_SESSION(userName)}`;
      const response = await api.post(url, checkoutRequest);
  
      if (response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl; // Redirect to Stripe session
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout. Please try again.");
    }
  };
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Course Checkout</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver engaging, curated courses at a
                    reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            {/* <div className="col-lg-8">
              <div className="shopCheckout-form">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row x-gap-30 y-gap-30"
                >
                  <div className="col-12">
                    <h5 className="text-20">Billing details</h5>
                  </div>
                  <div className="col-sm-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      First name
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Last name
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Phone *
                    </label>
                    <input
                      required
                      type="text"
                      name="phone"
                      placeholder="Phone *"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Email address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email address *"
                    />
                  </div>

                  <div className="col-12">
                    <h5 className="text-20 fw-500 pt-30">
                      Additional information
                    </h5>
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Order notes (optional)
                    </label>
                    <textarea
                      required
                      name="notes"
                      id="form_notes"
                      rows="8"
                      placeholder="Order notes (optional)"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div> */}

            <div className="col-lg-8">
              <div className="pt-30 pb-15 bg-white border-light rounded-8 bg-light-4">
                <h5 className="px-30 text-20 fw-500">Your order</h5>

                <div className="d-flex justify-between px-30 mt-25">
                  <div className="py-15 fw-500 text-dark-1">Product</div>
                  <div className="py-15 fw-500 text-dark-1">Subtotal</div>
                </div>

                {cartCourses.map((elm, i) => (
                  <div
                    key={i}
                    className={`d-flex justify-between ${
                      i == 0 ? "border-top-dark" : ""
                    }  px-30`}
                  >
                    <div className="py-15 text-grey">
                      <Link className="linkCustom" to={`/courses/${elm.id}`}>
                        {elm.title}{" "}
                      </Link>{" "}
                      x {elm.quantity}
                    </div>
                    <div className="py-15 text-grey">
                      VND
                      {(elm.discountedPrice * elm.quantity).toFixed(2) ||
                        "Free"}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-between border-top-dark px-30">
                  <div className="py-15 fw-500">Subtotal</div>
                  <div className="py-15 fw-500">VND{totalPrice.toFixed(2)}</div>
                </div>

                {/* <div className="d-flex justify-between border-top-dark px-30">
                  <div className="py-15 fw-500 text-dark-1">Shipping</div>
                  <div className="py-15 fw-500 text-dark-1">
                    ${shiping.toFixed(2)}
                  </div>
                </div> */}

                <div className="d-flex justify-between border-top-dark px-30">
                  <div className="py-15 fw-500 text-dark-1">Total</div>
                  <div className="py-15 fw-500 text-dark-1">
                    VND{totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="py-30 px-30 bg-white border-light rounded-8 bg-light-4">
                <h5 className="text-20 fw-500">Payment</h5>

                {/* <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">
                        Direct bank transfer
                      </h5>
                    </div>
                    <p className="ml-25 pl-5 mt-25">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        Check payments
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        Cash on delivery
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" defaultChecked />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">PayPal</h5>
                    </div>
                  </div> */}
                <div className="mt-30">
                  <div className="form-radio d-flex items-center">
                    <div className="radio">
                      <input type="radio" name="radio" defaultChecked />
                      <div className="radio__mark">
                        <div className="radio__icon"></div>
                      </div>
                    </div>
                    <h5 className="ml-15 text-15 lh-1 text-dark-1">VNPAY</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-30">
              <button
                className="button -md -accent col-12 -uppercase text-black"
                onClick={handleSubmit}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
