function TrashItem({ note, onRestore, onDelete }) {
    return (
        <li className="border rounded-lg p-2 sm:p-4 shadow-md bg-blue-50">
            <h4 className="text-base sm:text-xl font-bold text-[#0B1D51]">{note.title}</h4>
            <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">{note.content}</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                    onClick={() => onRestore(note._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1 rounded shadow text-xs sm:text-base"
                >
                    Restore
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded shadow text-xs sm:text-base"
                >
                    Delete Permanently
                </button>
            </div>
        </li>
    );
}
export default TrashItem;