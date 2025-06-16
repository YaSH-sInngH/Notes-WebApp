import { useState } from "react";
import { resetPassword } from "../../api/api";

export default function ResetPassword({ email, setStep }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await resetPassword(email, password);
      setSuccess(true);
      setStep("done");
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        className="w-full border px-4 py-2 rounded mb-4"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full border px-4 py-2 rounded mb-4"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Reset Password
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
      {success && <div className="text-green-600 mt-2">Password reset successful!</div>}
    </form>
  );
}