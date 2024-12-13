import { useState, useEffect } from "react";
import {
  IoCreateOutline,
  IoEllipsisHorizontalCircle,
  IoHeartOutline,
  IoHeart,
  IoLink,
  IoLockClosedOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoHomeOutline,
  IoChatbubbleOutline,
  IoPersonOutline,
  IoCompassOutline,
  IoHome,
  IoChatbubble,
  IoPerson,
  IoArrowBackOutline,
  IoSend,
} from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LinkUpLogo from "../assets/linkup_logo.jpeg";
import { useAppContext } from "../Provider";
import "./WebStyles.css";

const Chats = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const getIcon = (path, outlineIcon, filledIcon) => {
    return location.pathname === path ? filledIcon : outlineIcon;
  };

  return (
    <div className="container">
      <div>
        <div className="chat-list-header ">
          <h2 className="chat-list-title">Chats</h2>
        </div>
        <p style={{ textAlign: "center", marginTop: "30%" }}>No Chats Listed</p>
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

export default Chats;
