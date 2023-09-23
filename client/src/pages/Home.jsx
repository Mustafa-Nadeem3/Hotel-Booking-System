import React, { useEffect, useState } from "react";
import "../styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [serverData, setServerData] = useState("");

  const handleMouseEnterCard1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeaveCard1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnterCard2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeaveCard2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnterCard3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeaveCard3 = () => {
    setIsHovered3(false);
  };

  const handleMouseEnterCard4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeaveCard4 = () => {
    setIsHovered4(false);
  };

  const handleMouseEnterCard5 = () => {
    setIsHovered5(true);
  };

  const handleMouseLeaveCard5 = () => {
    setIsHovered5(false);
  };

  const handleMouseEnterCard6 = () => {
    setIsHovered6(true);
  };

  const handleMouseLeaveCard6 = () => {
    setIsHovered6(false);
  };

  async function getComments() {
    try {
      const response = await fetch(
        "https://hotel-haven.onrender.com/comment/all_comments",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data) {
        setServerData(data.comment);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <Navbar last_link_path="/login" last_link_name="Login" />
      {/* Introduction Section */}
      <section id="intro">
        <img
          src={process.env.PUBLIC_URL + "/images/background.jpg"}
          alt="Background"
        />
        <div className="container">
          <h1 className="text-white">Welcome to Hotel Haven</h1>
          <p></p>
        </div>
      </section>
      {/* Room Section */}
      <section id="room">
        <div className="container">
          <h1 className="d-flex justify-content-center align-items-center mb-3">
            Luxury Rooms
          </h1>
          <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div className="col-12  d-flex">
                  <div className="col-6">
                    <img
                      src={process.env.PUBLIC_URL + "/images/standard-room.jpg"}
                      class="d-block"
                      alt="..."
                    />
                  </div>
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Standard
                    </h3>
                    <p>
                      Our standard rooms offer chicly-designed interiors and a
                      range of modern amenities to ensure that you enjoy a
                      relaxed and comfortable stay.
                    </p>
                  </div>
                </div>
                <div className="col-12  d-flex">
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Deluxe
                    </h3>
                    <p>
                      Inspired by the vivid cultural history of Lahore, the
                      Deluxe Room furnishes character with old-school charm.
                    </p>
                  </div>
                  <div className="col-6" style={{ marginLeft: "150px" }}>
                    <img
                      src={process.env.PUBLIC_URL + "/images/deluxe-room.jpg"}
                      class="d-block"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div className="col-12  d-flex">
                  <div className="col-6">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/executive-room.jpg"
                      }
                      class="d-block"
                      alt="..."
                    />
                  </div>
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Executive
                    </h3>
                    <p>
                      Designed with chic and contemporary décor, our Executive
                      Room furnishes a King-sized bed, a spacious bathroom, a
                      writing desk and a minibar.
                    </p>
                  </div>
                </div>
                <div className="col-12  d-flex">
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Deluxe
                    </h3>
                    <p>
                      Inspired by the vivid cultural history of Lahore, the
                      Deluxe Room furnishes character with old-school charm.
                    </p>
                  </div>
                  <div className="col-6" style={{ marginLeft: "150px" }}>
                    <img
                      src={process.env.PUBLIC_URL + "/images/deluxe-room.jpg"}
                      class="d-block"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div className="col-12 d-flex">
                  <div className="col-6">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/business-suite.jpg"
                      }
                      class="d-block"
                      alt="..."
                    />
                  </div>
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Business Suite
                    </h3>
                    <p>
                      Offering comfortable and classy living, our Business Suite
                      creates a balance between work and comfort.
                    </p>
                  </div>
                </div>
                <div className="col-12  d-flex">
                  <div className="col-6 my-auto">
                    <h3 className="text-primary text-decoration-underline">
                      Deluxe Suite
                    </h3>
                    <p>
                      Overlooking the beautiful city of Lahore, spacious Deluxe
                      Suite is a blend of comfort and magnificence.
                    </p>
                  </div>
                  <div className="col-6" style={{ marginLeft: "150px" }}>
                    <img
                      src={process.env.PUBLIC_URL + "/images/deluxe-suite.jpg"}
                      class="d-block"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span aria-hidden="true">
                <i class="fa-solid fa-angle-up fa-rotate-270 text-primary fs-1"></i>
              </span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span aria-hidden="true">
                <i class="fa-solid fa-angle-up fa-rotate-90 text-primary fs-1"></i>
              </span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      {/* Mobile Room Section */}
      <section id="mobile_room">
        <div className="container">
          <h1 className="text-primary d-flex justify-content-center align-items-center mb-3">
            Luxury Rooms
          </h1>
          <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src={process.env.PUBLIC_URL + "/images/standard-room.jpg"}
                  class="d-block"
                  alt="..."
                />
                <div class="carousel-caption d-md-block">
                  <h3 className="text-white text-decoration-underline">
                    Standard
                  </h3>
                  <p>
                    Our standard rooms offer chicly-designed interiors and a
                    range of modern amenities to ensure that you enjoy a relaxed
                    and comfortable stay.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={process.env.PUBLIC_URL + "/images/deluxe-room.jpg"}
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-md-block">
                  <h3 className="text-white text-decoration-underline">
                    Deluxe
                  </h3>
                  <p>
                    Inspired by the vivid cultural history of Lahore, the Deluxe
                    Room furnishes character with old-school charm.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={process.env.PUBLIC_URL + "/images/executive-room.jpg"}
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-md-block">
                  <h3 className="text-white text-decoration-underline">
                    Executive
                  </h3>
                  <p>
                    Designed with chic and contemporary décor, our Executive
                    Room furnishes a King-sized bed, a spacious bathroom, a
                    writing desk and a minibar.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={process.env.PUBLIC_URL + "/images/business-suite.jpg"}
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-md-block">
                  <h3 className="text-white text-decoration-underline">
                    Business Suite
                  </h3>
                  <p>
                    Offering comfortable and classy living, our Business Suite
                    creates a balance between work and comfort.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={process.env.PUBLIC_URL + "/images/deluxe-suite.jpg"}
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-md-block">
                  <h3 className="text-white text-decoration-underline">
                    Deluxe Suite
                  </h3>
                  <p>
                    Overlooking the beautiful city of Lahore, spacious Deluxe
                    Suite is a blend of comfort and magnificence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="d-flex justify-content-center align-items-center mb-3">
                Other Services
              </h1>
            </div>
            <div className="col-12">
              <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div className="col-12 d-flex">
                      <div className="col-4 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard1}
                          onMouseLeave={handleMouseLeaveCard1}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/laundry.jpeg"
                            }
                            class="card-img-top"
                            alt="Laundry"
                          />
                          <div
                            class={
                              isHovered1
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Laundry</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 ms-0 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard2}
                          onMouseLeave={handleMouseLeaveCard2}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/valet-parking.jpg"
                            }
                            class="card-img-top"
                            alt="Valet-parking"
                          />
                          <div
                            class={
                              isHovered2
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Valet parking</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard3}
                          onMouseLeave={handleMouseLeaveCard3}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/fitness-center.jpg"
                            }
                            class="card-img-top"
                            alt="Fitness-center"
                          />
                          <div
                            class={
                              isHovered3
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Fitness center</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div className="col-12 d-flex">
                      <div className="col-4 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard4}
                          onMouseLeave={handleMouseLeaveCard4}
                        >
                          <img
                            src={process.env.PUBLIC_URL + "/images/cafe.jpg"}
                            class="card-img-top"
                            alt="Cafe"
                          />
                          <div
                            class={
                              isHovered4
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Cafe</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 ms-0 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard5}
                          onMouseLeave={handleMouseLeaveCard5}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/restaurant.jpg"
                            }
                            class="card-img-top"
                            alt="Restaurant"
                          />
                          <div
                            class={
                              isHovered5
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Restaurant</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard6}
                          onMouseLeave={handleMouseLeaveCard6}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/swimming-pool.jpg"
                            }
                            class="card-img-top"
                            alt="Swimming pool"
                          />
                          <div
                            class={
                              isHovered6
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Swimming pool</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item"></div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  onClick={
                    isClicked
                      ? () => setIsClicked(false)
                      : () => setIsClicked(true)
                  }
                  className={isClicked ? " " : "active"}
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  onClick={
                    isClicked
                      ? () => setIsClicked(false)
                      : () => setIsClicked(true)
                  }
                  className={isClicked ? "active" : " "}
                  aria-label="Slide 2"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="mobile_services">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-primary d-flex justify-content-center align-items-center mb-3">
                Other Services
              </h1>
            </div>
            <div className="col-12">
              <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div className="col-12">
                      <div
                        class="card"
                        onMouseEnter={handleMouseEnterCard1}
                        onMouseLeave={handleMouseLeaveCard1}
                      >
                        <img
                          src={process.env.PUBLIC_URL + "/images/laundry.jpeg"}
                          class="card-img-top"
                          alt="Laundry"
                        />
                        <div
                          class={
                            isHovered1
                              ? "card-body card-show"
                              : "card-body card-hide"
                          }
                        >
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloremque dolor alias dicta non, mollitia
                            voluptatem, vitae quod cumque esse aperiam odio
                            provident totam consectetur. Maxime quibusdam nihil
                            quidem aliquam mollitia!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="col-12">
                      <div
                        class="card"
                        onMouseEnter={handleMouseEnterCard2}
                        onMouseLeave={handleMouseLeaveCard2}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/valet-parking.jpg"
                          }
                          class="card-img-top"
                          alt="Valet-parking"
                        />
                        <div
                          class={
                            isHovered2
                              ? "card-body card-show"
                              : "card-body card-hide"
                          }
                        >
                          <h5 class="card-title">Valet parking</h5>
                          <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloremque dolor alias dicta non, mollitia
                            voluptatem, vitae quod cumque esse aperiam odio
                            provident totam consectetur. Maxime quibusdam nihil
                            quidem aliquam mollitia!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="col-12">
                      <div
                        class="card"
                        onMouseEnter={handleMouseEnterCard3}
                        onMouseLeave={handleMouseLeaveCard3}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/fitness-center.jpg"
                          }
                          class="card-img-top"
                          alt="Fitness-center"
                        />
                        <div
                          class={
                            isHovered3
                              ? "card-body card-show"
                              : "card-body card-hide"
                          }
                        >
                          <h5 class="card-title">Fitness center</h5>
                          <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloremque dolor alias dicta non, mollitia
                            voluptatem, vitae quod cumque esse aperiam odio
                            provident totam consectetur. Maxime quibusdam nihil
                            quidem aliquam mollitia!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div className="col-12 d-flex">
                      <div className="col-4 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard4}
                          onMouseLeave={handleMouseLeaveCard4}
                        >
                          <img
                            src={process.env.PUBLIC_URL + "/images/cafe.jpeg"}
                            class="card-img-top"
                            alt="Cafe"
                          />
                          <div
                            class={
                              isHovered4
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Cafe</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 ms-0 me-3">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard5}
                          onMouseLeave={handleMouseLeaveCard5}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/restaurant.jpeg"
                            }
                            class="card-img-top"
                            alt="Restaurant"
                          />
                          <div
                            class={
                              isHovered5
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Restaurant</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          class="card"
                          onMouseEnter={handleMouseEnterCard6}
                          onMouseLeave={handleMouseLeaveCard6}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/swimming-pool.jpeg"
                            }
                            class="card-img-top"
                            alt="Swimming-pool"
                          />
                          <div
                            class={
                              isHovered6
                                ? "card-body card-show"
                                : "card-body card-hide"
                            }
                          >
                            <h5 class="card-title">Swimming pool</h5>
                            <p class="card-text">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Doloremque dolor alias dicta non, mollitia
                              voluptatem, vitae quod cumque esse aperiam odio
                              provident totam consectetur. Maxime quibusdam
                              nihil quidem aliquam mollitia!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item"></div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="5"
                  aria-label="Slide 6"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Comments Section */}
      <section id="comment">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h1 className="mb-3">Our Beloved Customers Remarks</h1>
            </div>
            <div className="col-12">
              <div
                id="carouselExample"
                class="carousel slide carousel-fade"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  {serverData && serverData.length > 0 ? (
                    serverData.map((data, index) => (
                      <div key={index} class="carousel-item active">
                        <div className="col-12 text-center">
                          <h3>{data.name || "No Name Found"}</h3>
                        </div>
                        <div className="col-6 mx-auto">
                          <div className="quote-alt">
                            <img
                              src={process.env.PUBLIC_URL + "/images/quote.png"}
                              alt="Quote Left"
                            />
                          </div>
                          <div className="text-center">
                            <h6>{data.comment || "No Comment Found"}</h6>
                          </div>
                          <div className="text-end">
                            <img
                              src={process.env.PUBLIC_URL + "/images/quote.png"}
                              alt="Quote Right"
                            />
                          </div>
                        </div>
                        <div className="col-12 text-center">
                          {data.stars ? (
                            <p>
                              {Array.from({ length: data.stars }).map(
                                (_, index) => (
                                  <span
                                    key={index}
                                    className="rating fs-2"
                                  ></span>
                                )
                              )}
                            </p>
                          ) : (
                            <p>No Stars Found</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h6>No data found</h6>
                  )}
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
