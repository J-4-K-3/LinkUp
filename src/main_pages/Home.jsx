import { useState } from "react";
import {
  IoCreateOutline,
  IoHeartOutline,
  IoHeart,
  IoLink,
  IoLockClosedOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoHomeOutline,
  IoChatbubbleOutline,
  IoPersonOutline,
  IoHome,
  IoChatbubble,
  IoPerson,
  IoDownloadOutline
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../Provider";

const Home = ({ user, onSearch, onLike, onShare, onComment }) => {
  const {
    state,
    setState,
    photo,
    setPhoto,
    name,
    setName,
    surname,
    setSurname,
    socialLink,
    setSocialLink,
  } = useAppContext();
  const posts = state.posts || [];
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    onSearch(query);
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    // Toggle like count between 0 and 1
    setLikeCount((prev) => ({
      ...prev,
      [postId]: prev[postId] === 1 ? 0 : 1,
    }));
  };

  const openUnlockFeature = () => {
    setShowUnlockModal(true);
  };

  const closeUnlockFeature = () => {
    setShowUnlockModal(false);
  };

  const location = useLocation();

  const getIcon = (path, outlineIcon, filledIcon) => {
    return location.pathname === path ? filledIcon : outlineIcon;
  };

  const handlePurchase = (paymentOption) => {
    if (paymentOption === "paypal") {
      window.location.href = "https://www.paypal.me/JacobMongolo"; // Replace with your actual PayPal link
    } else if (paymentOption === "gcash") {
      alert("Please send your payment to the provided GCash account.");
    }
  };

  const downloadMedia = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "media"; // Default file name; customize as needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkClick = () => {
    if (socialLink) {
      window.open(socialLink, "_blank");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h2>LinkUp</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for users"
            onChange={handleSearch}
          />
        </div>
        <img
          src={photo || "/default-profile.png"}
          alt="Profile"
          className="profile-photo"
        />
      </header>

      <div className="content">
        <div className="create-area">
          <Link to="/create">
            <IoCreateOutline className="create-icon" size={25} />
            <h4>
              Create
              <br />
              post
            </h4>
          </Link>
          <a onClick={openUnlockFeature}>
            <IoLockClosedOutline className="create-icon" size={25} />
            <h4>
              Unlock
              <br />
              feature
            </h4>
          </a>
        </div>
        <div className="feed">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <div className="user-details">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={post.userPhoto || "/default-profile.png"}
                        alt="User"
                        className="user-photo"
                      />
                      <h4 style={{ marginLeft: 15 }}>
                        {post.username || "Unknown User"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="post-media">
                  {post.mediaType === "image" ? (
                    <img
                      src={post.mediaUrl}
                      alt="Post"
                      className="post-image"
                      onError={(e) => (e.target.src = "/placeholder-image.png")}
                    />
                  ) : post.mediaType === "video" ? (
                    <video
                      src={post.mediaUrl}
                      controls
                      className="post-video"
                    />
                  ) : (
                    <p>Unsupported media type</p>
                  )}
                </div>
                <p>{post.description || "No description available."}</p>

                <div className="post-actions">
                  <button
                    className="post-like"
                    onClick={() => toggleLike(post.id)}
                  >
                    {likedPosts[post.id] ? (
                      <IoHeart
                        className="action-icon"
                        size={20}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <IoHeartOutline className="action-icon" size={20} />
                    )}
                    {likeCount[post.id] || 0} Likes
                  </button>
                  <IoShareSocialOutline className="action-icon" size={20} />
                  <IoLink
                    className="action-icon"
                    size={20}
                    onClick={handleLinkClick}
                    style={{
                      cursor: socialLink ? "pointer" : "not-allowed",
                      opacity: socialLink ? 1 : 0.5,
                    }}
                  />
                  <IoBookmarkOutline className="action-icon" size={20} />
                  <IoDownloadOutline onClick={downloadMedia} className="action-icon" size={20} />
                </div>
              </div>
            ))
          ) : (
            <p className="display-message">No posts to display</p>
          )}
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

      {showUnlockModal && (
        <div className="unlock-modal">
          <div className="modal-content">
            <h3>Unlock Premium Features</h3>
            <p>Gain access to exclusive content and features! Only 1$</p>

            <ul className="feature-list">
              <li>Mobile App - Coming Soon</li>
              <li>Stories</li>
              <li>Multiple Post in Box Container</li>
              <li>New UI</li>
              <li>Chatbots</li>
              <li>Random Chats with Everyone</li>
              <li>Enhanced usability</li>
            </ul>

            <div className="modal-buttons">
              <button onClick={closeUnlockFeature}>Close</button>
              <button onClick={() => handlePurchase("paypal")}>
                Purchase via PayPal
              </button>
              <button onClick={() => handlePurchase("gcash")}>
                Purchase via GCash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
