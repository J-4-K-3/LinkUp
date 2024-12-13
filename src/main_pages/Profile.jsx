import React, { useState } from "react";
import {
  IoCameraOutline,
  IoPencilOutline,
  IoHomeOutline,
  IoChatbubbleOutline,
  IoPersonOutline,
  IoHome,
  IoChatbubble,
  IoPerson,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../Provider";

const Profile = () => {
  const { state, photo, setPhoto, name, setName, surname, setSurname, theme, toggleTheme } =
    useAppContext();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const getIcon = (path, outlineIcon, filledIcon) => {
    return location.pathname === path ? filledIcon : outlineIcon;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result); // Save the uploaded image in the photo state
      };
      reader.readAsDataURL(file); // Convert image to base64 and store
    }
  };

  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
    // Add any additional save logic here if needed
  };

  return (
    <div className="profile-section-container">
      <div className="section-container">
        <div className="profile-section-header">
          <div className="profile-photo-section-container">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="profile-section-photo"
              />
            ) : (
              <div className="empty-profile-photo">
                <IoCameraOutline
                  size={50}
                  className="empty-profile-photo-icon"
                />
              </div>
            )}
            <label htmlFor="photo-upload" className="edit-profile-photo-icon">
              <IoPencilOutline size={20} />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-name-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="edit-name-input"
                />
                <button className="save-name-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <h2 className="profile-name">
                {name || "Your Name"} {surname || ""}
                <IoPencilOutline
                  className="edit-name-icon"
                  size={20}
                  onClick={() => setIsEditing(true)} // Enter edit mode
                />
              </h2>
            )}
          </div>
        </div>

        <div className="profile-options-list">
          <div className="notifications-content">
            <h3>Notifications</h3>
            <p>Toggle notifications on or off.</p>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="appearance-content">
            <h3>Appearance</h3>
            <p>Switch between light and dark mode.</p>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="share-content">
            <h3>Share</h3>
            <p>Share the web app with your friends.</p>
            <a href="linkup-web-app.vercel.app" className="share-button">Share Link</a>
          </div>
          <div className="saved-content">
            <h3>Saved Items</h3>
            <p>Manage your saved posts and links.</p>
            <button
              onClick={() => alert("Modal for saved items will appear.")}
              className="modal-button"
            >
              Open Saved Modal
            </button>
          </div>
          <div className="help-content">
            <h3>Help Centre and Feedback</h3>
            <p>
              If you need assistance, email us{" "}
              <a href="mailto:wegrowyou5@gmail.com">"Here"</a>.
            </p>
          </div>
          <div className="about-content">
            <h3>About</h3>
            <p>Version 1.0: Mini Social App - LinkUp</p>
            <p>Created by Jacob.</p>
          </div>
          <div className="follow-content">
            <h3>Follow Owner</h3>
            <button
              onClick={() =>
                window.open("https://www.facebook.com/itsjhoana?mibextid=ZbWKwL", "_blank")
              }
              className="follow-button"
            >
              Follow on Facebook
            </button>
          </div>
        </div>
      </div>

      <nav className="nav">
        <Link
          to="/home"
          className={location.pathname === "/home" ? "active" : ""}
        >
          {getIcon("/home", <IoHomeOutline size={25} />, <IoHome size={25} />)}
          <span>Home</span>
        </Link>
        <Link
          to="/chats"
          className={location.pathname === "/chats" ? "active" : ""}
        >
          {getIcon(
            "/chats",
            <IoChatbubbleOutline size={25} />,
            <IoChatbubble size={25} />
          )}
          <span>Chats</span>
        </Link>
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          {getIcon(
            "/profile",
            <IoPersonOutline size={25} />,
            <IoPerson size={25} />
          )}
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Profile;
