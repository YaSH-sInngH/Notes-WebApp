import { useState } from 'react';
import { loginUser, registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginForm);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      // add your post-login logic here
    } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed";
    alert("Login failed: " + message);
  }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Only send email and password to backend
      await registerUser(registerForm);
      alert("Registration successful, please login");
      setIsLogin(true);
    } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Registration failed";
    alert("Registration failed: " + message);
  }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-blue-100 p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Notes App</h1>
        <p className="text-lg">Manage your notes easily and securely.</p>
      </div>

      <div className="w-1/2 p-8 flex flex-col justify-center">
        {isLogin ? (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
              <h2 className="text-xl font-semibold">Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Login
              </button>
              <p className="mt-2 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 underline"
                >
                  Register Yourself
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4 max-w-md mx-auto"
            >
              <h2 className="text-xl font-semibold">Register</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Register
              </button>
              <p className="mt-2 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 underline"
                >
                  Login
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
