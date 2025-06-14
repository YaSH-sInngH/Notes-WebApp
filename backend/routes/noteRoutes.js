import express from "express";
import { 
    createNote, 
    getNotes, 
    updateNote,
    deleteNote, 
    trashNote, 
    restoreNote, 
    getTrashedNotes, 
    archiveNote, 
    unarchiveNote, 
    getArchivedNotes,
    getSharedNote
} from "../controllers/noteController.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getNotes);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

router.put("/trash/:id", verifyToken, trashNote);
router.put("/restore/:id", verifyToken, restoreNote);
router.get("/trashed", verifyToken, getTrashedNotes);

router.put("/archive/:id", verifyToken, archiveNote);
router.put("/unarchive/:id", verifyToken, unarchiveNote);
router.get("/archived", verifyToken, getArchivedNotes);

router.get("/shared/:id", getSharedNote);

export default router;