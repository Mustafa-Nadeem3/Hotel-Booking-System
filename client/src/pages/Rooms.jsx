import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [serverData, setServerData] = useState([]);
  const [search, setSearch] = useState("");
  const availableRooms = serverData.filter((room) => room.available === true);
  const filteredData = serverData.filter((room) => room.type.includes(search));

  const handleChange = (event) => {
    setSearch(event.target.value);
    setServerData(filteredData);
  };

  async function getRooms() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/room", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setServerData(data.rooms);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {}
  }

  function getImage(index) {
    if (availableRooms[index].type === "Standard") {
      return `${process.env.PUBLIC_URL}/images/standard-room.jpg`;
    } else if (availableRooms[index].type === "Deluxe") {
      return `${process.env.PUBLIC_URL}/images/deluxe-room.jpg`;
    } else if (availableRooms[index].type === "Executive") {
      return `${process.env.PUBLIC_URL}/images/executive-room.jpg`;
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Navbar main_links="d-none" last_link_path="/" last_link_name="Back" />
      <section id="hotel-room">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h1 className="mb-3">Book Now</h1>
            </div>
            <div className="col-12 mb-3">
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={handleChange}
                />
                <button class="btn btn-primary d-flex">
                  <i class="fa-solid fa-magnifying-glass me-2 my-auto"></i>
                  Search
                </button>
              </form>
            </div>
            <div className="col-12 p-3">
              {availableRooms && availableRooms.length > 0 ? (
                availableRooms.map((room, index) => (
                  <div key={index}>
                    <div className={index % 2 === 0 ? "row mb-3" : "row mb-3 d-none"}>
                      <div className="row d-flex">
                        <div className="col-lg-6 col-md-6 col-sm-12 text-center my-auto">
                          <h2 className="text-primary fw-bold">{room.type}</h2>
                          <h4 className="text-black fw-normal">
                            Room Number: {room.number}
                          </h4>
                          <h4 className="text-black fw-normal">
                            {room.available ? "Available" : "Not Available"}
                          </h4>
                          <div className="d-flex justify-content-center align-items-center mt-5">
                            <h4 className="text-black fw-normal my-auto me-3">
                              {" "}
                              Price: Rs {room.price}
                            </h4>
                            <Link to="/login" className="btn btn-primary">
                              <i class="fa-solid fa-file-pen me-2"></i>Book
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                          <img src={getImage(index)} alt="Room" />
                        </div>
                      </div>
                    </div>
                    <div className={index % 2 === 0 ? "row mb-3 d-none" : "row mb-3"}>
                      <div className="row d-flex">
                        <div className="col-lg-6 col-md-6 col-sm-12 text-start">
                          <img src={getImage(index)} alt="Room" />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-center my-auto">
                          <h2 className="text-primary fw-bold">{room.type}</h2>
                          <h4 className="text-black fw-normal">
                            Room Number: {room.number}
                          </h4>
                          <h4 className="text-black fw-normal">
                            {room.available ? "Available" : "Not Available"}
                          </h4>
                          <div className="d-flex justify-content-center align-items-center mt-5">
                            <h4 className="text-black fw-normal my-auto me-3">
                              {" "}
                              Price: Rs {room.price}
                            </h4>
                            <Link to="/login" className="btn btn-primary">
                              <i class="fa-solid fa-file-pen me-2"></i>Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Rooms;
