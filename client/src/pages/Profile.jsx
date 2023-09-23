import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const editProfile = () => {
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const handleSubmit = () => {
    editProfile();
    setProfile();
  };

  async function setProfile() {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      formData.append("image", image);

      const response = await fetch("https://hotel-haven.onrender.com/user/profile", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();
      if (data) {
        alert("Profile Updated");
        window.location.reload();
      } else {
        alert("Error" + response);
        console.log(response);
        setEdit(false);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  }

  async function getProfile() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/user", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (data) {
        setName(data.user.name || "");
        setEmail(data.user.email || "");
        setPassword(data.user.password);
        setGender(data.user.gender);
        setAddress(data.user.address || "");
        setPhoneNumber(data.user.phoneNumber || "");
        setImage(data.user.image || "");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/dashboard"
        icon2="fa-solid fa-user text-white active"
        link2="Profile"
        path2="/profile"
        icon3="fa-solid fa-book"
        link3="Booking"
        path3="/booking"
      />
      <section id="profile">
        <div className="container-fluid">
          <div className={edit ? "row d-none" : "row"}>
            <div className="col-12 p-3 shadow mb-3">
              <h4>Profile</h4>
            </div>
            <div className="col-12 p-3">
              <div className="col-12 d-flex mb-3">
                <div className="col-6">
                  <img
                    src={
                      "https://hotel-haven.onrender.com/uploads/" + image ||
                      process.env.PUBLIC_URL + "/images/user-solid.svg"
                    }
                    alt="Profile"
                    className="border border-1"
                  />
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-primary me-5"
                    onClick={editProfile}
                  >
                    <i class="fa-regular fa-pen-to-square me-2"></i>Edit
                  </button>
                </div>
              </div>
              <div className="col-12 d-flex mb-3">
                <div className="col-6 me-2">
                  <p>{name || "No name found"}</p>
                </div>
                <div className="col-6">
                  <p>{email || "No email Found"}</p>
                </div>
              </div>
              <div className="col-12 d-flex mb-3">
                <div className="col-6 me-2">
                  <p>{address || "No address found"}</p>
                </div>
                <div className="col-6">
                  <p>{phoneNumber || "No phone number found"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={edit ? "row" : "row d-none"}>
            <div className="col-12 p-3 shadow mb-3">
              <h4>Edit Profile</h4>
            </div>
            <div className="col-12 p-3">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-12 mb-3">
                  <img
                    src={
                      image || process.env.PUBLIC_URL + "/images/user-solid.svg"
                    }
                    alt="Profile"
                    className="border border-1"
                  />
                  <br />
                  <br />
                  <input
                    type="file"
                    className="form-control w-50"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
                  />
                </div>
                <div className="col-12 d-flex mb-3">
                  <div className="col-6 me-2">
                    <input
                      type="text"
                      placeholder={name || "Name"}
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      placeholder={email || "Email"}
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex mb-3">
                  <div className="col-6 me-2">
                    <input
                      type="text"
                      placeholder={address || "Address"}
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder={phoneNumber || "Phone Number"}
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary">
                    Update
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

export default Profile;
