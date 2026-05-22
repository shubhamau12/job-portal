import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response =
        await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save admin status
        localStorage.setItem(
          "isAdmin",
          "true"
        );

        alert(
          "Login Successful"
        );

        navigate("/");
      } else {
        alert(
          data.message ||
            "Invalid Credentials"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Server Error. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      <form
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;