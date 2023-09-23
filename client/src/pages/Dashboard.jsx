import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [serverData, setServerData] = useState("");
  const [bookingData, setBookingData] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  async function getUser() {
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
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function getBooking() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/room/get_bookings", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (data) {
        setBookingData(data.bookings);
      } else {
        alert("Error Finding Booking");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    setStars(selectedRating);
  };

  useEffect(() => {
    getUser();
    getBooking();
  }, []);

  async function addComment() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serverData.name,
          comment: comment,
          stars: stars,
        }),
      });

      const data = await response.json();
      if (data) {
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (roomID) => {
    async function deleteBooking() {
      try {
        const response = await fetch(
          "https://hotel-haven.onrender.com/room/delete_booking",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              roomID: roomID,
            }),
          }
        );

        await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Booking not found");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    deleteBooking();
  };

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home text-white active"
        link1="Dashboard"
        path1="/dashboard"
        icon2="fa-solid fa-user"
        link2="Profile"
        path2="/profile"
        icon3="fa-solid fa-book"
        link3="Booking"
        path3="/booking"
      />
      <section id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>Dashboard</h4>
            </div>
            <div className="col-12 p-3 mb-3">
              <h4 className="fw-bold text-primary">Bookings</h4>
              {bookingData && bookingData.length > 0 ? (
                bookingData.map((booking, index) => (
                  <div key={index} className="border border-2 rounded p-3 mb-3">
                    <div className="col-12 d-flex mb-3">
                      <h6 className="mx-auto fw-bold">Booking Details</h6>
                      <button
                        className="border-0 bg-white text-primary text-decoration-underline mt-0"
                        onClick={() => handleDelete(booking.roomID)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">
                        <p>Date: </p>
                      </div>
                      <div className="col-4">
                        <p>From: {booking.checkInDate}</p>
                      </div>
                      <div className="col-4">
                        <p>To: {booking.checkOutDate}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">
                        <p>Room Details: </p>
                      </div>
                      <div className="col-4">
                        <p>Number: {booking.roomID}</p>
                      </div>
                      <div className="col-4">
                        <p>Type: {booking.roomType}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-4">
                        <p>Members: </p>
                      </div>
                      <div className="col-4">
                        <p>Adults: {booking.adults}</p>
                      </div>
                      <div className="col-4">
                        <p>Children: {booking.children}</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <p className="ms-auto">
                        <span className="fw-bold">Total Price:</span> Rs.
                        {booking.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </div>
            <div className="col-12 p-3 d-flex justify-content-center align-items-center">
              <div className="col-6 text-center">
                <h4 className="mb-3">Leave A Comment</h4>
                <form onSubmit={addComment()}>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="customerComment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <label htmlFor="customerComment">Comment</label>
                  </div>
                  <div className="rating fs-2 mb-3">
                    <input
                      type="radio"
                      id="star5"
                      value="5"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star5" title="Excellent"></label>
                    <input
                      type="radio"
                      id="star4"
                      value="4"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star4" title="Very Good"></label>
                    <input
                      type="radio"
                      id="star3"
                      value="3"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star3" title="Good"></label>
                    <input
                      type="radio"
                      id="star2"
                      value="2"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star2" title="Fair"></label>
                    <input
                      type="radio"
                      id="star1"
                      value="1"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star1" title="Very Poor"></label>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
