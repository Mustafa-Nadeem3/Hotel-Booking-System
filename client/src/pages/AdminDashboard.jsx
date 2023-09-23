import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const availableRooms = roomData.filter((room) => room.available === true);
  const unavailableRooms = roomData.filter((room) => room.available === false);

  async function getRooms() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/room", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setRoomData(data.rooms);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getUsers() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/user/all_users", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setUserData(data.users);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error)
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const countElement = document.querySelector("available");
  
    if (countElement) {
      const targetCount = availableRooms.length;
      const duration = 2000;
      const interval = duration / targetCount;
  
      let currentCount = 0;
  
      const updateCount = () => {
        if (currentCount <= targetCount) {
          countElement.textContent = currentCount;
          currentCount++;
          setTimeout(updateCount, interval);
        }
      };
  
      updateCount();
    }
  });

  useEffect(() => {
    getRooms();
    getUsers();
  }, []);

  //Count Animation
  const [availableCount, setAvailableCount] = useState(0);

  useEffect(() => {
    if (availableCount < availableRooms.length) {
      const interval = setInterval(() => {
        setAvailableCount((prevCount) => prevCount + 1);
      }, 1000 / availableRooms.length);

      return () => clearInterval(interval);
    }
  }, [availableCount, availableRooms.length]);

  const [unavailableCount, setUnavailableCount] = useState(0);

  useEffect(() => {
    if (unavailableCount < unavailableRooms.length) {
      const interval = setInterval(() => {
        setUnavailableCount((prevCount) => prevCount + 1);
      }, 1000 / unavailableRooms.length);

      return () => clearInterval(interval);
    }
  }, [unavailableCount, unavailableRooms.length]);

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    if (userCount < userData.length - 1) {
      const interval = setInterval(() => {
        setUserCount((prevCount) => prevCount + 1);
      }, 1000 / userData.length);

      return () => clearInterval(interval);
    }
  }, [userCount, userData.length]);

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home text-white active"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user"
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
              <h4>Admin Dashboard</h4>
            </div>
            <div className="row p-3">
              <div className="col-12 mt-3 stats">
                <div className="col-lg-4 col-sm-12 col-md-6 me-md-3 me-lg-3 mb-3">
                  <div className="card shadow border-0">
                    <div className="card-body mx-auto text-center">
                      <h1 className="card-title">{availableCount}</h1>
                      <div className="d-flex">
                        <h4 className="card-text me-3 text-primary"><i class="fa-solid fa-door-open me-3"></i>Available Rooms</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6 me-lg-3 mb-3">
                  <div className="card shadow border-0">
                    <div className="card-body mx-auto text-center">
                      <h1 className="card-title">{unavailableCount}</h1>
                      <div className="d-flex">
                        <h4 className="card-text me-3 text-primary"><i class="fa-solid fa-door-closed me-3"></i>Unavailable Rooms</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6">
                  <div className="card shadow border-0">
                    <div className="card-body mx-auto text-center">
                      <h1 className="card-title">{userCount}</h1>
                      <div className="d-flex">
                        <h4 className="card-text me-3 text-primary"><i className="fa-solid fa-users me-3"></i>Users</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
