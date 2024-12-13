import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Provider";

const Create = () => {
  const [media, setMedia] = useState(null);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [preference, setPreference] = useState(
    localStorage.getItem("preference") || "both"
  );
  const { state, photo, name, surname, socialLink, setSocialLink, addNewPost } =
    useAppContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("preference", preference);
  }, [preference]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      });
    }
  };

  const handleSocialLinkChange = (e) => {
    let link = e.target.value;

    if (link && !link.startsWith("http://") && !link.startsWith("https://")) {
      link = "https://" + link;
    }

    setSocialLink(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media || !description || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      username: `${name || "Anonymous"} ${surname || ""}`,
      userPhoto: photo,
      mediaUrl: media.url,
      mediaType: media.type,
      description,
      socialLink,
      preference,
      email,
    };

    // Submit to Formspree
    const formData = new FormData();
    formData.append("socialLink", socialLink);
    formData.append("description", description);
    formData.append("name", `${name} ${surname}`);
    formData.append("preference", preference);
    formData.append("email", email);

    try {
      const response = await fetch("https://formspree.io/f/xrbgvvlq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        alert("Your post has been submitted successfully!");
      } else {
        throw new Error("There was an issue submitting your form.");
      }
    } catch (error) {
      alert(error.message);
    }

    // Add new post (optional)
    addNewPost(newPost);
    navigate("/home");
  };

  return (
    <>
      <div className="back-btn" onClick={() => navigate(-1)}>
        <IoArrowBackOutline size={30} />
        <span>Back</span>
      </div>
      <div className="create-container">
        <h2>Create a Post</h2>
        <p>wait a few seconds for you content to get posted</p>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="media-upload">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="file-input"
            />
            {media && (
              <div className="media-preview">
                {media.type === "video" ? (
                  <video
                    src={media.url}
                    controls
                    className="post-video-preview"
                  />
                ) : (
                  <img
                    src={media.url}
                    alt="Preview"
                    className="post-image-preview"
                  />
                )}
              </div>
            )}
          </div>

          <div className="social-link-section">
            <input
              type="text"
              placeholder="Social Account Link"
              value={socialLink}
              onChange={handleSocialLinkChange}
              className="post-description"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description..."
              className="post-description"
              required
            />
          </div>

          <div className="preferences-section">
            <h4>Which gender you want to contact you?</h4>
            <label>
              <input
                type="radio"
                name="preference"
                value="boys"
                checked={preference === "boys"}
                onChange={(e) => setPreference(e.target.value)}
              />
              Boys
            </label>
            <label>
              <input
                type="radio"
                name="preference"
                value="girls"
                checked={preference === "girls"}
                onChange={(e) => setPreference(e.target.value)}
              />
              Girls
            </label>
            <label>
              <input
                type="radio"
                name="preference"
                value="both"
                checked={preference === "both"}
                onChange={(e) => setPreference(e.target.value)}
              />
              Both
            </label>
          </div>

          <div className="email-section">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Confirm your email"
              className="post-description"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
