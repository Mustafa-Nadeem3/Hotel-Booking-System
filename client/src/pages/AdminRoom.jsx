import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Modal } from "react-bootstrap";

const AdminRoom = () => {
  const [serverData, setServerData] = useState("");

  const sortedData = [...serverData].sort((a, b) => a.number - b.number);

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomAvailable, setRoomAvailable] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  const submitRoom = () => {
    async function addRoom() {
      try {
        const response = await fetch("https://hotel-haven.onrender.com/room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomNumber: roomNumber,
            roomType: roomType,
            roomPrice: roomPrice,
          }),
        });

        await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Error Adding Room" + response);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }

    addRoom();
  };

  const handleDelete = (roomID) => {
    async function deleteRoom() {
      try {
        const response = await fetch("https://hotel-haven.onrender.com/room", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: roomID,
          }),
        });

        await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Room not found");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    deleteRoom();
  };

  const [modalIsOpen, setModalIsOpen] = useState(
    Array(serverData.length).fill(false)
  );

  const openModal = (index) => {
    setModalIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const closeModal = (index) => {
    setModalIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const handleEdit = (roomID) => {
    async function editRoom() {
      try {
        const response = await fetch("https://hotel-haven.onrender.com/room/edit_room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: roomID,
            number: roomNumber,
            type: roomType,
            price: roomPrice,
            available: roomAvailable,
          }),
        });

        await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Room not found");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    editRoom();
  }

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user"
        link2="Users"
        path2="/admin_user"
        icon3="fa-solid fa-bed text-white active"
        link3="Rooms"
        path3="/admin_room"
      />
      <section id="admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>All Rooms</h4>
            </div>
            <div className="col-12 p-3">
              {sortedData && sortedData.length > 0 ? (
                sortedData.map((room, index) => (
                  <div key={index} className="border border-2 rounded p-3 mb-3">
                    <div className="col-12 d-flex mb-3">
                      <h4 className="mx-auto">Room {index + 1}</h4>
                      <button
                        className="border-0 bg-white text-primary text-decoration-underline mt-0"
                        onClick={() => openModal(index)}
                      >
                        Edit
                      </button>
                      <Modal
                        show={modalIsOpen[index]}
                        onHide={() => closeModal(index)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Room {index + 1}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <div className="col-12 mb-3">
                              <label
                                htmlFor="roomNumber"
                                className="form-label"
                              >
                                Room Number
                              </label>
                              <input
                                type="type"
                                id="roomNumber"
                                className="form-control"
                                placeholder={serverData[index].number}
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="roomType" className="form-label">
                                Room Type
                              </label>
                              <input
                                type="text"
                                id="roomType"
                                className="form-control"
                                placeholder={serverData[index].type}
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="roomPrice" className="form-label">
                                Room Price
                              </label>
                              <input
                                type="number"
                                id="roomPrice"
                                className="form-control"
                                placeholder={serverData[index].price}
                                value={roomPrice}
                                onChange={(e) => setRoomPrice(e.target.value)}
                              />
                            </div>
                            <div className="col-12 w-100 mb-3">
                              <label
                                htmlFor="roomAvailable"
                                className="form-label"
                              >
                                Room Available
                              </label>
                              <select name="roomAvailable" id="roomAvailable" className="form-control">
                                <option
                                  value={roomAvailable}
                                  onChange={() => setRoomAvailable(true)}
                                >
                                  Available
                                </option>
                                <option
                                  value={roomAvailable}
                                  onChange={() => setRoomAvailable(false)}
                                >
                                  Not Available
                                </option>
                              </select>
                            </div>
                          </form>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={() => {
                              handleEdit(serverData[index]._id);
                            }}
                          >
                            <i class="fa-regular fa-pen-to-square me-2"></i>Edit
                          </button>
                        </Modal.Footer>
                      </Modal>
                      <button
                        className="border-0 bg-white text-primary text-decoration-underline mt-0"
                        onClick={() => handleDelete(room._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="col-6">
                        <p>Room Type: {room.type}</p>
                        <p>Room Number: {room.number}</p>
                      </div>
                      <div className="col-6">
                        <p>{room.available ? "Available" : "Not Available"}</p>
                        <p> Price: Rs {room.price} per night</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </div>
            <div className="col-6 p-3 mx-auto">
              <h4 className="text-center">Add Room</h4>
              <form onSubmit={submitRoom}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter room number"
                    id="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  ></input>
                  <label htmlFor="roomNumber">Room Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter room type"
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  ></input>
                  <label htmlFor="roomType">Room Type</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter room price"
                    id="roomPrice"
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(e.target.value)}
                  ></input>
                  <label htmlFor="roomPrice">Room Price</label>
                </div>
                <div className="text-center">
                  <button type="submit" id="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminRoom;
