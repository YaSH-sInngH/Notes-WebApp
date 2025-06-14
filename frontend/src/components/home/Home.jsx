import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/api"; // Adjust path as needed

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome to Notes App";
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
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
      await registerUser(registerForm);
      alert("Registration successful, please login");
      setIsLogin(true);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      alert("Registration failed: " + message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* LEFT SIDE - Modern Notes Design */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white items-center justify-center relative overflow-hidden min-h-[320px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating notes animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Note 1 */}
          <div className="absolute top-20 left-16 animate-float">
            <div className="bg-yellow-200 bg-opacity-20 backdrop-blur-sm rounded-lg p-3 w-24 h-20 shadow-lg border border-white border-opacity-20">
              <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-1"></div>
              <div className="w-3/4 h-2 bg-white bg-opacity-20 rounded mb-1"></div>
              <div className="w-1/2 h-2 bg-white bg-opacity-20 rounded"></div>
            </div>
          </div>
          
          {/* Note 2 */}
          <div className="absolute top-32 right-20 animate-float-delayed">
            <div className="bg-blue-200 bg-opacity-20 backdrop-blur-sm rounded-lg p-3 w-20 h-16 shadow-lg border border-white border-opacity-20">
              <div className="w-full h-1.5 bg-white bg-opacity-30 rounded mb-1"></div>
              <div className="w-2/3 h-1.5 bg-white bg-opacity-20 rounded mb-1"></div>
              <div className="w-3/4 h-1.5 bg-white bg-opacity-20 rounded"></div>
            </div>
          </div>
          
          {/* Note 3 */}
          <div className="absolute bottom-32 left-20 animate-float-slow">
            <div className="bg-green-200 bg-opacity-20 backdrop-blur-sm rounded-lg p-3 w-28 h-22 shadow-lg border border-white border-opacity-20">
              <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-1"></div>
              <div className="w-4/5 h-2 bg-white bg-opacity-20 rounded mb-1"></div>
              <div className="w-2/3 h-2 bg-white bg-opacity-20 rounded"></div>
            </div>
          </div>
          
          {/* Note 4 */}
          <div className="absolute bottom-20 right-16 animate-float-reverse">
            <div className="bg-purple-200 bg-opacity-20 backdrop-blur-sm rounded-lg p-3 w-22 h-18 shadow-lg border border-white border-opacity-20">
              <div className="w-full h-1.5 bg-white bg-opacity-30 rounded mb-1"></div>
              <div className="w-3/4 h-1.5 bg-white bg-opacity-20 rounded mb-1"></div>
              <div className="w-1/2 h-1.5 bg-white bg-opacity-20 rounded"></div>
            </div>
          </div>
        </div>

        <div className="text-center px-12 z-10 relative max-w-lg">
          {/* Modern Logo */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl border border-white border-opacity-20">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white bg-opacity-5 rounded-2xl blur-xl"></div>
            </div>
          </div>
          
          {/* Main heading with typing effect */}
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="block text-white mb-2">Notes</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse text-white">|</span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-blue-100 mb-8 font-light leading-relaxed">
            Capture thoughts, organize ideas, and never lose track of what matters most
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-3 px-6 border border-white border-opacity-20">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-100">Sync Across Devices</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-3 px-6 border border-white border-opacity-20">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-100">Rich Text Editor</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-3 px-6 border border-white border-opacity-20">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-100">Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Keep existing login/register design */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center relative overflow-hidden min-h-[320px]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="w-full max-w-md mx-auto p-8 relative z-10">
          {/* Form Toggle */}
          <div className="mb-8 text-center">
            <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-inner">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-md transform scale-105' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-md transform scale-105' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="transform transition-all duration-500 ease-in-out">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Please sign in to your account</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors duration-200"
                    >
                      Create one now
                    </button>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="transform transition-all duration-500 ease-in-out">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us and start organizing your notes</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors duration-200"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(-5px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-0.5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 0.5s;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite 1s;
        }
        
        .animate-float-reverse {
          animation: float-reverse 4.5s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
}