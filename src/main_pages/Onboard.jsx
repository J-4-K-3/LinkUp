import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./WebStyles.css";
import LinkUpLogo from "../assets/linkup_logo.jpeg";

const Onboard = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Signup successful!");
    navigate("/start"); // Navigate programmatically
  };

  return (
    <div className="home-container">
      <img src={LinkUpLogo} alt="LinkUp Logo" />
      <h2>LinkUp</h2>
      <div className="wrapper">
        <p>A few minutes of signup to get started.</p>
        <div className="input-area">
          <form onSubmit={handleSignup}>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
      <footer className="app-footer">
        <p>&copy; 2024 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Onboard