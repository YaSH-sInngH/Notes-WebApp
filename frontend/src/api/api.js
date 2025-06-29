import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api" })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});


export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);

export const fetchNotes = () => API.get("/notes");
export const createNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export const trashNote = (id) => API.put(`/notes/trash/${id}`);
export const restoreNote = (id) => API.put(`/notes/restore/${id}`);
export const fetchTrashedNotes = () => API.get("/notes/trashed");

export const archiveNote = (id) => API.put(`/notes/archive/${id}`);
export const unarchiveNote = (id) => API.put(`/notes/unarchive/${id}`);
export const fetchArchivedNotes = () => API.get("/notes/archived");

export const fetchSharedNote = (id) => API.get(`/notes/shared/${id}`);


export const sendOTP = (email) => API.post("/send-otp", { email });
export const verifyOTP = (data) => API.post("/verify-otp", data);
export const resetPassword = (data) => API.post("/reset-password", data);

export const fetchNotesByStatus = (status) => API.get(`/notes?status=${status}`);
