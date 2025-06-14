import Note from "../models/note.js";

//Creating Notes
export const createNote = async (req, res) => {
    try{
        const note = new Note({...req.body, user: req.user.id})
        await note.save();
        res.status(201).json(note);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while creating note" });
    }
};

//Fetching Notes from authenticated users
export const getNotes = async (req, res) => {
    try{
        const notes = await Note.find({user: req.user.id, isTrashed: false, isArchived: false})
        res.status(200).json(notes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while fetching notes" });
    }
}

//Updating Notes
export const updateNote = async (req, res) => {
    try{
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id },
            req.body,
            { new: true } 
        );
        if(!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while updating note" });
    }
}

//Deleting Notes
export const deleteNote = async(req, res)=>{
    try{
        const note = await Note.findOneAndDelete(
            {_id: req.params.id, user: req.user.id },
            {isTrashed: true},
            { new: true }
        );
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note permanently deleted" });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while deleting note" });
    }
}

export const trashNote = async (req, res) => {
    try{
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id },
            {isTrashed: true},
            { new: true }
        );
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while trashing note" });
    }
}

export const restoreNote = async (req, res) => {
    try{
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id },
            {isTrashed: false},
            { new: true }
        );
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while restoring note" });
    }
}

export const getTrashedNotes = async (req, res) => {
    try{
        const notes = await Note.find({user: req.user.id, isTrashed: true});
        res.status(200).json(notes);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while fetching trashed notes" });
    }
}

export const archiveNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { isArchived: true },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while archiving note" });
    }
};

export const unarchiveNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { isArchived: false },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while unarchiving note" });
    }
};

export const getArchivedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id, isArchived: true, isTrashed: false });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching archived notes" });
    }
}

export const getSharedNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || note.isTrashed) {
            return res.status(404).json({ message: "Note not found" });
        }
        // Only return public fields
        res.status(200).json({
            title: note.title,
            content: note.content,
            tags: note.tags,
            color: note.color,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching shared note" });
    }
};