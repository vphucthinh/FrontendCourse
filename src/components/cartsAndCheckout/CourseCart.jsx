import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import api from "@/api/api.jsx";
import { Constants } from "@/constants/constants.jsx";

export default function CourseCart() {
  const { cartCourses, setCartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart data from the backend
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await api.get(Constants.API_ENDPOINTS.CART.COURSES);
      setCartCourses(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle increase quantity
  const handleIncrease = async (index) => {
    const item = cartCourses[index];
    try {
      setLoading(true);
      const response = await api.put(`${Constants.API_ENDPOINTS.CART.UPDATE}/${item.id}`, {
        quantity: item.quantity + 1,
      });
      setCartCourses(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle decrease quantity
  const handleDecrease = async (index) => {
    const item = cartCourses[index];

    if (item.quantity > 1) {
      try {
        setLoading(true);
        const response = await api.put(`${Constants.API_ENDPOINTS.CART.UPDATE}/${item.id}`, {
          quantity: item.quantity - 1,
        });
        setCartCourses(response.data);
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle remove item from cart
  const handleRemoveCart = async (index) => {
    const item = cartCourses[index];
    try {
      setLoading(true);
      const response = await api.delete(`${Constants.API_ENDPOINTS.CART.DELETE}/${item.id}`);
      setCartCourses(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartCourses]);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Course Cart</h1>
                </div>
                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver engaging, curated courses at a reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-end">
            <div className="col-12">
              <div className="px-30 pr-60 py-25 rounded-8 bg-light-6 md:d-none">
                <div className="row justify-between">
                  <div className="col-md-4">
                    <div className="fw-500 text-purple-1">Product</div>
                  </div>
                  <div className="col-md-2">
                    <div className="fw-500 text-purple-1">Price</div>
                  </div>
                  <div className="col-md-2">
                    <div className="fw-500 text-purple-1">Quantity</div>
                  </div>
                  <div className="col-md-2">
                    <div className="fw-500 text-purple-1">Subtotal</div>
                  </div>
                  <div className="col-md-1">
                    <div className="d-flex justify-end">
                      <div className="fw-500 text-purple-1">Remove</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-30 pr-60 md:px-0">
                {cartCourses.map((elm, i) => (
                  <div
                    key={i}
                    className="row y-gap-20 justify-between items-center pt-30 pb-30 border-bottom-light"
                  >
                    <div className="col-md-4">
                      <div className="d-flex items-center">
                        <div className="">
                          <div
                            className="size-100 bg-image rounded-8 js-lazy"
                            style={{ backgroundImage: `url(${elm.imageSrc})` }}
                          ></div>
                        </div>
                        <div className="fw-500 text-dark-1 ml-30">
                          <Link
                            className="linkCustom"
                            to={`/courses/${elm.id}`}
                          >
                            {elm.title} {" "}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2 md:mt-15">
                      <div className="">
                        <div className="shopCart-products__title d-none md:d-block mb-10">
                          Price
                        </div>
                        <p>{elm.paid ? `$${elm.discountedPrice}` : "Free"}</p>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="">
                        <div className="shopCart-products__title d-none md:d-block mb-10">
                          Quantity
                        </div>

                        <div className="input-counter md:mt-20 js-input-counter">
                          <input
                            required
                            className="input-counter__counter"
                            type="number"
                            value={elm.quantity}
                            readOnly
                          />

                          <div className="input-counter__controls">
                            <button
                              className="input-counter__up js-down"
                              onClick={() => handleDecrease(i)}
                              disabled={loading}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>

                            <button
                              className="input-counter__down js-up"
                              onClick={() => handleIncrease(i)}
                              disabled={loading}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-1">
                      <div className="">
                        <div className="shopCart-products__title d-none md:d-block mb-10">
                          Subtotal
                        </div>

                        <p>
                          ${(elm.quantity * elm.discountedPrice).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-1">
                      <div
                        className="md:d-none d-flex justify-end"
                        onClick={() => handleRemoveCart(i)}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shopCart-footer px-16 mt-30">
                {cartCourses.length > 0 ? (
                  <div className="row justify-between y-gap-30">
                    <div className="col-auto">
                      <div className="shopCart-footer__item">
                        <button className="button -md -purple-3 text-purple-1">
                          Update cart
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row justify-center pt-60 lg:pt-40">
                    <div className="col-auto">
                      <Link
                        to="/courses-list-1"
                        className="button -md -outline-purple-1 text-purple-1"
                      >
                        Buy Course
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 layout-pt-lg">
              <div className="py-30 bg-light-4 rounded-8 border-light">
                <h5 className="px-30 text-20 fw-500">Cart Totals</h5>

                <div className="d-flex justify-between px-30 item mt-25">
                  <div className="py-15 fw-500 text-dark-1">Subtotal</div>
                  <div className="py-15 fw-500 text-dark-1">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="d-flex justify-between px-30 item border-top-dark">
                  <div className="pt-15 fw-500 text-dark-1">Total</div>
                  <div className="pt-15 fw-500 text-dark-1">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <Link
                to="/course-checkout"
                className="button -md -purple-1 text-white col-12 mt-30"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
