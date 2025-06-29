import React from "react";
import ReactMarkdown from "react-markdown";
import { toast } from 'react-toastify';

const PRESET_COLORS = [
    "#f44336", "#ff9800", "#ffeb3b", "#8bc34a", "#4caf50",
    "#009688", "#2196f3", "#3f51b5", "#673ab7", "#9c27b0",
    "#e040fb", "#ff4081"
];

function NoteItem({
    note,
    editingNoteId,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    editTags,
    setEditTags,
    onStartEditing,
    onCancelEditing,
    onSaveEdit,
    onTrashNote,
    onPinToggle,
    onArchiveNote,
    onRestoreNote, 
    onUnarchiveNote,
    setEditColor,
    editColor,
    editStatus,
    setEditStatus,
    editDueDate,
    setEditDueDate,
    editPriority,
    setEditPriority
}) {
    const isEditing = editingNoteId === note._id;

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-green-700 bg-green-100';
            case 'In Progress':
                return 'text-yellow-700 bg-yellow-100';
            case 'Pending':
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };

    // Helper function to check if due date is overdue
    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && note.status !== 'Completed';
    };

    // Helper function for priority
    const getPriorityColor = (priority)=>{
        switch(priority){
            case 'High':
                return 'text-red-700 bg-red-100 border-red-200';
            case 'Medium':
                return 'text-yellow-700 bg-yellow-100 border-yellow-200';
            case 'Low':
            default: 
                return 'text-green-700 bg-green-100 border-green-200';
        }
    }

    return (
        <li
            className="relative border rounded-lg shadow-md transition duration-200 bg-white w-full max-w-md sm:max-w-sm md:max-w-md mx-auto mb-4 p-2 sm:p-4"
            style={{ backgroundColor: note.color || "#fff", borderColor: note.pinned ? "#60a5fa" : "#e5e7eb" }}
        >
            {/* Share Icon - only show when not editing */}
            {!isEditing && (
                <button
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-blue-100 transition"
                    title="Copy share link"
                    onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/share/${note._id}`);
                        toast.success("Shareable link copied!");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </button>
            )}
            
            {isEditing ? (
                <>
                    <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-base sm:text-lg"
                        placeholder="Note title..."
                    />
                    <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-sm sm:text-base min-h-[100px]"
                        placeholder="Note content..."
                    />
                    <div className="text-xs text-gray-400 mb-2">
                        Supports <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer" className="underline">Markdown</a>
                    </div>
                    <input
                        value={editTags}
                        onChange={e => setEditTags(e.target.value)}
                        placeholder="Tags (comma separated)"
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-sm"
                    />

                    <div className="mb-2 sm:mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Status</label>
                        <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="border px-2 py-1 rounded w-full text-sm"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-2 sm:mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>

                    <div className="mb-2 sm:mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Priority</label>
                        <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="border px-2 py-1 rounded w-full text-sm"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="space-y-2 mb-2 sm:mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                            Note Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-150
                                        ${editColor === color ? "border-black scale-110" : "border-gray-200"}
                                    `}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setEditColor(color)}
                                    aria-label={`Pick color ${color}`}
                                >
                                    {editColor === color && (
                                        <span className="text-white text-lg font-bold">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <button
                            onClick={() => onSaveEdit(note._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelEditing}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#0B1D51] mr-8">
                            {note.title} {note.pinned && <span className="text-blue-500">📌</span>}
                        </h3>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mb-2">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(note.status)}`}>
                            {note.status || "Pending"}
                        </span>
                    </div>

                    {/* Priority Badge */}
                    <div className="mb-2">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(note.priority)}`}>
                            {note.priority || 'Medium'}
                        </span>
                    </div>

                    {/* Due Date */}
                    {note.dueDate && (
                        <div className={`text-xs mb-2 ${isOverdue(note.dueDate) ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                            📅 Due: {new Date(note.dueDate).toLocaleDateString()}
                            {isOverdue(note.dueDate) && <span className="ml-1">(Overdue)</span>}
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-2 sm:mb-3">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                    </div>
                    
                    {/* Tags */}
                    {note.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                            {note.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 border text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm text-blue-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                        <button
                            onClick={() => onStartEditing(note)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                        >
                            Edit
                        </button>
                        
                        {onTrashNote && (
                            <button
                                onClick={() => onTrashNote(note._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                            >
                                Trash
                            </button>
                        )}
                        
                        {onPinToggle && (
                            <button
                                onClick={() => onPinToggle(note)}
                                className={`${
                                    note.pinned
                                        ? 'bg-blue-300 hover:bg-blue-400'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base`}
                            >
                                {note.pinned ? 'Unpin' : 'Pin'}
                            </button>
                        )}
                        
                        {note.isArchived ? (
                            onUnarchiveNote && (
                                <button
                                    onClick={() => onUnarchiveNote(note._id)}
                                    className="bg-purple-400 hover:bg-purple-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                                >
                                    Unarchive
                                </button>
                            )
                        ) : (
                            onArchiveNote && (
                                <button
                                    onClick={() => onArchiveNote(note._id)}
                                    className="bg-purple-500 hover:bg-purple-700 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                                >
                                    Archive
                                </button>
                            )
                        )}
                        
                        {onRestoreNote && (
                            <button
                                onClick={() => onRestoreNote(note._id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                            >
                                Restore
                            </button>
                        )}
                    </div>
                </>
            )}
        </li>
    );
}

export default NoteItem;