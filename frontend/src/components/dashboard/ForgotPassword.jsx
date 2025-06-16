import { useState } from "react";
import { sendOTP } from "../../api/api";

export default function ForgotPassword({ setEmail, setStep }) {
  const [inputEmail, setInputEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await sendOTP(inputEmail);
      setEmail(inputEmail);
      setStep("otp");
      setMessage("");
    } catch (err) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  return (
    <form onSubmit={handleSendOTP} className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border px-4 py-2 rounded mb-4"
        value={inputEmail}
        onChange={e => setInputEmail(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Send OTP
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
}