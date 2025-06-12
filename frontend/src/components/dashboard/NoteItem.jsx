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
    onPinToggle
}) {
    const isEditing = editingNoteId === note._id;
    return (
        <li
            className={`border rounded-lg p-4 shadow-md transition duration-200 ${
                note.pinned ? 'bg-blue-50 border-blue-300' : 'bg-white'
            }`}
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
                    </div>
                </>
            )}
        </li>
    );
}
export default NoteItem;