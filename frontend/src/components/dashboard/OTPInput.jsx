import { useState } from "react";
import { verifyOTP } from "../../api/api";

export default function OTPInput({ email, setStep }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP(email, otp);
      setStep("reset");
      setMessage("");
    } catch (err) {
      setMessage("Invalid or expired OTP.");
    }
  };

  return (
    <form onSubmit={handleVerify} className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full border px-4 py-2 rounded mb-4"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Verify OTP
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
}