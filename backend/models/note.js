import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true },
  title: { 
    type: String, 
    required: true },
  content: { 
    type: String, 
    default: "" },
  tags: [{ 
    type: String }],
  pinned: { 
    type: Boolean, 
    default: false },
  color: { 
    type: String, 
    default: "#fff" },
  isTrashed: { 
    type: Boolean, 
    default: false },
  isArchived: { 
    type: Boolean, 
    default: false },
}, { timestamps: true });

const Note = mongoose.model("note", noteSchema);
export default Note;