function TrashItem({ note, onRestore, onDelete }) {
    return (
        <li className="border rounded-lg p-4 shadow-md bg-blue-50">
            <h4 className="text-xl font-bold text-[#0B1D51]">{note.title}</h4>
            <p className="text-gray-700 mb-3">{note.content}</p>
            <div className="flex gap-3">
                <button
                    onClick={() => onRestore(note._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
                >
                    Restore
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
                >
                    Delete Permanently
                </button>
            </div>
        </li>
    );
}
export default TrashItem;