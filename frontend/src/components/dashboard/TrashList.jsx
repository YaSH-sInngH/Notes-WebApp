import TrashItem from './TrashItem';

function TrashList({ trashedNotes, onRestore, onDeletePermanently }) {
    return (
        <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4 text-[#0B1D51]">🗑️ Trashed Notes</h3>
            {trashedNotes.length === 0 ? (
                <div className="text-gray-400 text-center py-12 text-base sm:text-lg">
                    No trashed notes.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
                    {trashedNotes.map(note => (
                        <TrashItem
                            key={note._id}
                            note={note}
                            onRestore={onRestore}
                            onDelete={onDeletePermanently}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default TrashList;