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
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id },
            {isTrashed: true},
            { new: true }
        );
        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error while deleting note" });
    }
}