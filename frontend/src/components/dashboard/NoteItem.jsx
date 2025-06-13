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
            className={`border rounded-lg p-4 shadow-md transition duration-200 ${
                note.pinned ? 'bg-blue-50 border-blue-300' : 'bg-white'
            }`}
            style={{ backgroundColor: note.color || "#fff", borderColor: note.pinned ? "#60a5fa" : "#e5e7eb" }}
        >
            {isEditing ? (
                <>
                    <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                    />
                    <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                    />
                    <input
                        value={editTags}
                        onChange={e => setEditTags(e.target.value)}
                        placeholder="Tags (comma separated)"
                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                    />
                    <div className="space-y-2 mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Note Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-150
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
                    <div className="flex gap-3">
                        <button
                            onClick={() => onSaveEdit(note._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelEditing}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded shadow"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-[#0B1D51]">
                            {note.title} {note.pinned && <span className="text-blue-500">📌</span>}
                        </h3>
                    </div>
                    <p className="text-gray-700 mb-3">{note.content}</p>
                    {note.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {note.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 border text-sm px-2 py-1 rounded-full shadow-sm text-blue-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2">
                        <button
                            onClick={() => onStartEditing(note)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onTrashNote(note._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
                        >
                            Trash
                        </button>
                        <button
                            onClick={() => onPinToggle(note)}
                            className={`${
                                note.pinned
                                    ? 'bg-blue-300 hover:bg-blue-400'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } text-white px-4 py-1 rounded shadow`}
                        >
                            {note.pinned ? 'Unpin' : 'Pin'}
                        </button>
                        {note.isArchived ? (
                            onUnarchiveNote && (
                                <button
                                    onClick={() => onUnarchiveNote(note._id)}
                                    className="bg-purple-400 hover:bg-purple-600 text-white px-4 py-1 rounded shadow"
                                >
                                    Unarchive
                                </button>
                            )
                        ) : (
                            onArchiveNote && (
                                <button
                                    onClick={() => onArchiveNote(note._id)}
                                    className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-1 rounded shadow"
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