import React from "react";

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
    editColor
}) {
    const isEditing = editingNoteId === note._id;
    return (
        <li
            className={`border rounded-lg shadow-md transition duration-200 bg-white w-full max-w-md sm:max-w-sm md:max-w-md mx-auto mb-4 p-2 sm:p-4`}
            style={{ backgroundColor: note.color || "#fff", borderColor: note.pinned ? "#60a5fa" : "#e5e7eb" }}
        >
            {isEditing ? (
                <>
                    <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-base sm:text-lg"
                    />
                    <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-sm sm:text-base"
                    />
                    <input
                        value={editTags}
                        onChange={e => setEditTags(e.target.value)}
                        placeholder="Tags (comma separated)"
                        className="border px-2 sm:px-3 py-2 w-full mb-2 sm:mb-3 rounded shadow-sm text-sm"
                    />
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
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-[#0B1D51]">
                            {note.title} {note.pinned && <span className="text-blue-500">📌</span>}
                        </h3>
                    </div>
                    <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">{note.content}</p>
                    {note.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                            {note.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 border text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm text-blue-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                        <button
                            onClick={() => onStartEditing(note)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onTrashNote(note._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded shadow text-sm sm:text-base"
                        >
                            Trash
                        </button>
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
                    </div>
                </>
            )}
        </li>
    );
}
export default NoteItem;