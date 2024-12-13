import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FaCamera } from "react-icons/fa";
import { useAppContext } from "../Provider";
import "./WebStyles.css";

const Start = () => {
  const { state, setState, photo, setPhoto, name, surname, socialLinks } =
    useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        [name]: value,
      },
    }));
  };

  const handleSocialChange = (index, value) => {
    setState((prevState) => {
      const updatedLinks = [...prevState.userData.socialLinks];
      updatedLinks[index] = value;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          socialLinks: updatedLinks,
        },
      };
    });
  };

  const handleAddPhoto = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setState((prevState) => ({
            ...prevState,
            userData: {
              ...prevState.userData,
              photo: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click(); // Simulate the file input click
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home"); // Redirect to home screen
  };

  return (
    <div className="profile-container">
      <h2>Welcome to LinkUp!</h2>
      
      <form onSubmit={handleSubmit} className="form-container">
        <p>
          We're thrilled to have you here at LinkUp, a vibrant platform where you can connect with people from all over the world, make new friends, and create meaningful connections!<br/><br/>
          To get started, when creating a post, please include a link to your social media account and your email address. If anyone wants to chat with you, we'll notify you via your email.<br/><br/>
          Enjoy your time with us, share your feedback, follow the community owner, and most importantly, have a great experience with LinkUp. We can't wait for you to explore everything we have to offer!
        </p>
        <button type="submit" className="submit-btn">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Start;
