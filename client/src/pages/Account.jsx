import React, { useState } from "react";
import "../styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState(false);
  const [mobileForm, setMobileForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const screenWidth = window.screen.width;

  const show = (e) => {
    e.preventDefault();

    if (showPassword === false) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const show_alt = (e) => {
    e.preventDefault();

    if (showConfirmPassword === false) {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  const check_form = () => {
    if (form === false && screenWidth > 786) {
      const element = document.getElementById("form");
      element.style.marginLeft = "37rem";
      setForm(true);
    } else if (form === false && screenWidth < 786) {
      const element = document.getElementById("form");
      element.style.marginLeft = "21rem";
      setForm(true);
    } else if (form === true && screenWidth < 786) {
      const element = document.getElementById("form");
      element.style.marginLeft = "0.3rem";
      setForm(false);
    } else {
      const element = document.getElementById("form");
      element.style.marginLeft = "1rem";
      setForm(false);
    }
  };

  const check_mobileForm = () => {
    if (mobileForm === false) {
      setMobileForm(true);
    } else {
      setMobileForm(false);
    }
  };

  async function registerUser(e) {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch(
          "https://hotel-haven.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              gender: gender,
            }),
          }
        );

        if (response.ok) {
          if (form === true && screenWidth < 786) {
            const element = document.getElementById("form");
            element.style.marginLeft = "0.3rem";
            setForm(false);
          } else {
            const element = document.getElementById("form");
            element.style.marginLeft = "1rem";
            setForm(false);
          }
        } else {
          const errorResponse = await response.json();
          console.error("Registration error:", errorResponse);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    } else {
      alert("Passwords do not match");
    }
  }

  async function loginUser(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://hotel-haven.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (data.user === true) {
        if (data.type === "admin") {
          navigate("/admin_dashboard");
        } else {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      } else if (data.user === false) {
        const passwordInput = document.getElementById("password");
        passwordInput.value = "";
        setLoginPassword("");
        passwordInput.style.borderColor = "red";
        alert("Incorrect Password");
      } else if (data.status === "error") {
        if (form === false && screenWidth > 786) {
          const element = document.getElementById("form");
          element.style.marginLeft = "37rem";
          setForm(true);
        } else if (form === false && screenWidth < 786) {
          const element = document.getElementById("form");
          element.style.marginLeft = "21rem";
        }
        alert("User not found!");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <>
      <Navbar main_links="d-none" last_link_path="/" last_link_name="Back" />
      <section id="account">
        <div className="container">
          <div className="row">
            <div className="col-12 register bg-white shadow">
              <div id="form" className="row form-style shadow">
                <div
                  className={
                    form
                      ? "col-12 p-lg-5 p-md-3 text-center my-auto d-none"
                      : "col-12 p-lg-5 p-md-3 text-center my-auto"
                  }
                >
                  <h1 className="text-primary fw-bold mb-3">Login</h1>
                  <form onSubmit={loginUser}>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-regular fa-user"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text">
                        <i
                          class={
                            showPassword
                              ? "fa-solid fa-lock-open"
                              : "fa-solid fa-lock"
                          }
                        ></i>
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <span class="input-group-text">
                        <button
                          className="text-primary border-0 bg-light"
                          onClick={show}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </span>
                    </div>
                    <div class="col-12 mb-3">
                      <button type="submit" class="btn btn-primary">
                        Login
                      </button>
                    </div>
                    <div className="col-12 mb-3">
                      <Link to="/forgetPassword" className="text-primary">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="col-12">
                      <p className="text-primary">
                        Don't have an account?
                        <span className="form_btn ms-2" onClick={check_form}>
                          Register
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
                <div
                  className={
                    form
                      ? "col-12 p-lg-5 p-md-3 text-center my-auto"
                      : "col-12 p-lg-5 p-md-3 text-center my-auto d-none"
                  }
                >
                  <h1 className="text-primary fw-bold mb-3">Register</h1>
                  <form onSubmit={registerUser}>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-regular fa-user"></i>
                      </span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        aria-label="First name"
                        class="form-control"
                      />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        aria-label="Last name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa-regular fa-at"></i>
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        class="form-control"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text">
                        <i
                          class={
                            showPassword
                              ? "fa-solid fa-lock-open"
                              : "fa-solid fa-lock"
                          }
                        ></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class="form-control"
                        placeholder="Password"
                        aria-label="Password"
                      />
                      <span class="input-group-text">
                        <button
                          className="text-primary border-0 bg-light"
                          onClick={show}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </span>
                    </div>
                    <div class="col-12 input-group mb-3">
                      <span class="input-group-text">
                        <i
                          class={
                            showConfirmPassword
                              ? "fa-solid fa-lock-open"
                              : "fa-solid fa-lock"
                          }
                        ></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        class="form-control"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                      />
                      <span class="input-group-text">
                        <button
                          className="text-primary border-0 bg-light"
                          onClick={show_alt}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </span>
                    </div>
                    <div class="col-12 input-group mb-3">
                      <div class="form-check form-check-inline ms-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="male"
                          checked={gender === "male"}
                          onClick={(e) =>
                            setGender(e.target.checked ? "male" : "male")
                          }
                        />
                        <label class="form-check-label" for="male">
                          Male
                        </label>
                      </div>
                      <div class="form-check form-check-inline me-auto">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="female"
                          checked={gender === "female"}
                          onClick={(e) =>
                            setGender(e.target.checked ? "female" : "")
                          }
                        />
                        <label class="form-check-label" for="female">
                          Female
                        </label>
                      </div>
                    </div>
                    <div class="col-12 mb-3">
                      <button type="submit" class="btn btn-primary">
                        Register
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="text-primary">
                        Already have an Account?
                        <span className="form_btn ms-2" onClick={check_form}>
                          Login
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-6 text-center p-5">
                  <img
                    src={process.env.PUBLIC_URL + "/images/logo.png"}
                    alt="Logo"
                  />
                  <div>
                    <h2 className="text-primary fw-bold">Welcome !</h2>
                    <p></p>
                  </div>
                </div>
                <div className="col-6 text-center p-5">
                  <img
                    src={process.env.PUBLIC_URL + "/images/logo.png"}
                    alt="Logo"
                  />
                  <div>
                    <h2 className="text-primary fw-bold">Welcome Back !</h2>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="mobile_account">
        <div className="container">
          <div
            className={
              mobileForm ? "row shadow py-5" : "row shadow py-5 d-none"
            }
          >
            <div className="col-6 pt-3">
              <h1 className="text-primary fw-bold">Register</h1>
            </div>
            <div className="col-6 text-end mb-3" onClick={check_mobileForm}>
              <i class="fa-solid fa-arrow-right text-white bg-primary p-3 rounded-circle"></i>
            </div>
            <div className="col-12">
              <form action="">
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="First Name"
                    aria-label="First name"
                    class="form-control"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    aria-label="Last name"
                    class="form-control"
                  />
                </div>
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa-regular fa-at"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                  />
                </div>
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text">
                    <i
                      class={
                        showPassword
                          ? "fa-solid fa-lock-open"
                          : "fa-solid fa-lock"
                      }
                    ></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <span class="input-group-text">
                    <button
                      className="text-primary border-0 bg-light"
                      onClick={show}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </div>
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text">
                    <i
                      class={
                        showConfirmPassword
                          ? "fa-solid fa-lock-open"
                          : "fa-solid fa-lock"
                      }
                    ></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    class="form-control"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                  />
                  <span class="input-group-text">
                    <button
                      className="text-primary border-0 bg-light"
                      onClick={show_alt}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </div>
                <div class="col-12 input-group mb-3">
                  <div class="form-check form-check-inline ms-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="male"
                      value="male"
                    />
                    <label class="form-check-label" for="male">
                      Male
                    </label>
                  </div>
                  <div class="form-check form-check-inline me-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="female"
                      value="female"
                    />
                    <label class="form-check-label" for="female">
                      Female
                    </label>
                  </div>
                </div>
                <div class="col-12 mb-3 text-center">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className={
              mobileForm ? "row shadow py-5 d-none" : "row shadow py-5"
            }
          >
            <div className="col-6 pt-3">
              <h1 className="text-primary fw-bold">Login</h1>
            </div>
            <div className="col-6 text-end mb-3" onClick={check_mobileForm}>
              <i class="fa-solid fa-plus text-white bg-primary p-3 rounded-circle"></i>
            </div>
            <div className="col-12">
              <form action="">
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                  />
                </div>
                <div class="col-12 input-group mb-3">
                  <span class="input-group-text">
                    <i
                      class={
                        showPassword
                          ? "fa-solid fa-lock-open"
                          : "fa-solid fa-lock"
                      }
                    ></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <span class="input-group-text">
                    <button
                      className="text-primary border-0 bg-light"
                      onClick={show}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </div>
                <div class="col-12 mb-3 text-center">
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="col-12">
                  <Link to="/forgetPassword" className="text-primary">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Account;