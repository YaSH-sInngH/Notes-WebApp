import Note from "../models/note.js";

//Creating Notes
export const createNote = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.title || !req.body.title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const note = new Note({
            ...req.body, 
            user: req.user.id,
            // Ensure tags is an array
            tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? [req.body.tags] : []),
            // Ensure dueDate is properly handled
            dueDate: req.body.dueDate && req.body.dueDate !== '' ? new Date(req.body.dueDate) : null
        });
        
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while creating note", error: error.message });
    }
};

//Fetching Notes from authenticated users
export const getNotes = async (req, res) => {
    try {
        const query = {
            user: req.user.id,
            isTrashed: false,
            isArchived: false,
        };
        
        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching notes", error: error.message });
    }
}

//Updating Notes
export const updateNote = async (req, res) => {
    try {
        // Prepare update data
        const updateData = { ...req.body };
        
        // Handle tags properly
        if (updateData.tags && !Array.isArray(updateData.tags)) {
            updateData.tags = [updateData.tags];
        }
        
        // Handle dueDate properly
        if (updateData.dueDate === '' || updateData.dueDate === null) {
            updateData.dueDate = null;
        } else if (updateData.dueDate) {
            updateData.dueDate = new Date(updateData.dueDate);
        }

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating note", error: error.message });
    }
}

//Deleting Notes (Permanently)
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id, 
            user: req.user.id,
            isTrashed: true // Only allow permanent deletion of trashed notes
        });
        
        if (!note) {
            return res.status(404).json({ message: "Note not found or not in trash" });
        }
        
        res.status(200).json({ message: "Note permanently deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting note", error: error.message });
    }
}

//Moving Notes to Trash
export const trashNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { isTrashed: true },
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while trashing note", error: error.message });
    }
}

//Restoring Notes from Trash
export const restoreNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id, isTrashed: true },
            { isTrashed: false },
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found in trash" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while restoring note", error: error.message });
    }
}

//Fetching Trashed Notes
export const getTrashedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ 
            user: req.user.id, 
            isTrashed: true 
        }).sort({ updatedAt: -1 });
        
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching trashed notes", error: error.message });
    }
}

//Archiving Notes
export const archiveNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id, isTrashed: false },
            { isArchived: true },
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found or already trashed" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while archiving note", error: error.message });
    }
};

//Unarchiving Notes
export const unarchiveNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id, isArchived: true },
            { isArchived: false },
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found in archive" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while unarchiving note", error: error.message });
    }
};

//Fetching Archived Notes
export const getArchivedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ 
            user: req.user.id, 
            isArchived: true, 
            isTrashed: false 
        }).sort({ updatedAt: -1 });
        
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching archived notes", error: error.message });
    }
}

//Getting Shared Notes (Public access)
export const getSharedNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        
        if (!note || note.isTrashed) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        // Only return public fields for security
        res.status(200).json({
            title: note.title,
            content: note.content,
            tags: note.tags,
            color: note.color,
            status: note.status,
            dueDate: note.dueDate,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching shared note", error: error.message });
    }
};