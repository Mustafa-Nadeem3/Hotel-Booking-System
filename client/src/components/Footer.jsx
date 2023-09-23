import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("")

  async function sendEmail() {
    try {
      const response = await fetch(
        "https://hotel-haven.onrender.com/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await response.json();
      if (data) {
        console.log(data.email)
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section id="footer">
        <div className="container-fluid bg-primary p-5">
          <div class="row d-flex">
            <div class="col-lg-5 col-sm-12 text-center me-3">
              <a
                class="d-flex justify-content-center text-decoration-none mb-3"
                href="#home"
              >
                <img
                  src="/images/alt-logo.png"
                  alt="Alternate Logo"
                  class="logo"
                />
                <h4 class="d-flex justify-content-center align-items-center text-white mt-2">
                  Hotel <br /> Haven
                </h4>
              </a>
              <p className="text-white">
                Discover an all-in-one hotel experience on our webpage: a
                seamless blend of accommodation, a powerful to-do list with
                reminders, a journal with calendar integration, and a secure
                password manager with hash decryption. Stay organized, reflect
                on cherished memories, and safeguard your personal information
                during your unforgettable stay. Book now and enjoy a
                comprehensive and convenient solution for productivity,
                reflection, and security at our hotel.
              </p>
              <div class="links">
                <a href="/" class="text-white ms-3">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="/" class="text-white ms-3">
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="/" class="text-white ms-3">
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="/" class="text-white ms-3">
                  <i class="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-sm-12 mb-lg-0 me-3">
              <h2 className="text-white text-center">Links</h2>
              <ul class="list-unstyled">
                <li className="d-flex">
                  <Link to="#home" class="fs-5 text-decoration-none text-white">
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Home</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link
                    to="#about"
                    class="fs-5 text-decoration-none text-white"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>About</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link to="#room" class="fs-5 text-decoration-none text-white">
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Rooms</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link
                    to="#services"
                    class="fs-5 text-decoration-none text-white"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Services</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link
                    to="#comment"
                    class="fs-5 text-decoration-none text-white"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Comments</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link
                    to="/rooms"
                    class="fs-5 text-decoration-none text-white"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Book Now</span>
                  </Link>
                </li>
                <li className="d-flex">
                  <Link
                    to="/login"
                    class="fs-5 text-decoration-none text-white"
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="col-lg-4 col-sm-12 text-center">
              <h2 class="mb-3 text-white">Sign Up for Our Newsletter</h2>
              <form onSubmit={sendEmail()}>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <label for="floatingInput">Email Address</label>
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn border border-2 border-white p-2 bg-primary text-white fw-bold"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <hr class="my-3" />
            <div class="col-12 d-flex justify-content-center mb-0">
              <p className="text-white">
                © All Rights Reserved by Hotel Haven. Powered by Mustafa Nadeem
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
