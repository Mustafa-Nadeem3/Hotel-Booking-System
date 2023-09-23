import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Sidebar(props) {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState("");
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch("https://hotel-haven.onrender.com/user", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
  
        const data = await response.json();
        if (data) {
          setServerData(data.user);
        } else {
          alert("Error Finding User");
          localStorage.remove("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    getUserData();
  }, [navigate]);

  const showSidebarContent = () => {
    if (showBar === false) {
      const element = document.getElementById("sidebar");
      element.style.width = "20vw";
      const element2 = document.getElementById("image");
      element2.style.width = "10vw";
      element2.style.height = "10vh";
      const element3 = document.getElementById("name");
      element3.style.display = "block";
      const element4 = document.getElementById("icon");
      element4.style.justifyContent = "end";
      const element5 = document.getElementById("logout");
      element5.style.marginTop = "6rem";
      const elements = document.getElementsByClassName("link");
      Array.from(elements).forEach((element) => {
        element.style.display = "block";
      });
      setShowBar(true);
    } else {
      const element = document.getElementById("sidebar");
      element.style.width = "5vw";
      const element2 = document.getElementById("image");
      element2.style.width = "40px";
      element2.style.height = "40px";
      const element3 = document.getElementById("name");
      element3.style.display = "none";
      const element4 = document.getElementById("icon");
      element4.style.justifyContent = "center";
      const element5 = document.getElementById("logout");
      element5.style.marginTop = "9rem";
      const elements = document.getElementsByClassName("link");
      Array.from(elements).forEach((element) => {
        element.style.display = "none";
      });
      setShowBar(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  }

  return (
    <>
      <section id="sidebar">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-3 mb-3">
              <i
                id="icon"
                class={
                  showBar
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-grip-lines text-white"
                }
                onClick={showSidebarContent}
              ></i>
            </div>
            <div className="col-12 mb-3 text-center">
              <img
                src={"https://hotel-haven.onrender.com/uploads/" + serverData.image || process.env.PUBLIC_URL + "/images/user-solid.svg"}
                alt="Profile"
                id="image"
                className="rounded-circle mb-3"
              />
              <h5 id="name">{serverData.name || "No name found"}</h5>
            </div>
            <div className="col-12 mb-3">
              <ul className="list-unstyled">
                <li>
                  <Link to={props.path1} className="text-decoration-none">
                    <i class={props.icon1}>
                      <span className="link">{props.link1}</span>
                    </i>
                  </Link>
                </li>
                <li>
                  <Link to={props.path2} className="text-decoration-none">
                    <i class={props.icon2}>
                      <span className="link">{props.link2}</span>
                    </i>
                  </Link>
                </li>
                <li>
                  <Link to={props.path3} className="text-decoration-none">
                    <i class={props.icon3}>
                      <span className="link">{props.link3}</span>
                    </i>
                  </Link>
                </li>
              </ul>
            </div>
            <div id="logout" className="col-12 logout">
              <ul className="text-center list-unstyled">
                <li>
                  <Link to="/" className="text-decoration-none" onClick={logout}>
                    <i class="fa-solid fa-arrow-right-from-bracket">
                      <span className="link">Logout</span>
                    </i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Sidebar.defaultProps = {
  icon1: "fa-solid fa-arrow-right text-white active",
  link1: "Link Name",
  path1: "/",
  icon2: "fa-solid fa-arrow-right",
  link2: "Link Name",
  path2: "/",
  icon3: "fa-solid fa-arrow-right",
  link3: "Link Name",
  path3: "/",
};

Sidebar.PropType = {
  icon1: PropTypes.string,
  link1: PropTypes.string,
  path1: PropTypes.string,
  icon2: PropTypes.string,
  link2: PropTypes.string,
  path2: PropTypes.string,
  icon3: PropTypes.string,
  link3: PropTypes.string,
  path3: PropTypes.string,
};

export default Sidebar;
