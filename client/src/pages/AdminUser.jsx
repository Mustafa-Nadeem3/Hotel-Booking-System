import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const AdminUser = () => {
  const [serverData, setServerData] = useState([]);
  const userData = serverData.filter((data) => data.type === "user");

  async function getUsers() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/user/all_users", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setServerData(data.users);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (userID) => {
    async function deleteBooking() {
      try {
        const response = await fetch(
          "https://hotel-haven.onrender.com/user",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userID,
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
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user text-white active"
        link2="Users"
        path2="/admin_user"
        icon3="fa-solid fa-bed"
        link3="Rooms"
        path3="/admin_room"
      />
      <section id="admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>All Users</h4>
            </div>
            <div className="col-12 p-3">
              {userData && userData.length > 0 ? (
                userData.map((data, index) => (
                  <div key={index} className="border border-2 rounded p-3 mb-3">
                    <div className="col-12 d-flex mb-3">
                      <h4 className="mx-auto">User {index + 1}</h4>
                      <div>
                      <button
                        className="border-0 bg-white text-primary text-decoration-underline mt-0"
                        onClick={() => handleDelete(data._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="border-0 bg-white text-primary text-decoration-underline mt-0"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-6">
                        <p>ID: {data._id}</p>
                        <p>Name: {data.name}</p>
                        <p>Email: {data.email}</p>
                      </div>
                      <div className="col-6">
                        <p>Address: {data.address || "No Address Found"}</p>
                        <p>Phone: {data.phoneNumber || "No Phone Number Found"}</p>
                        <p>Gender: {data.gender}</p>
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
    </>
  );
};

export default AdminUser;
