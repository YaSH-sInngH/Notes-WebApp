import TrashItem from './TrashItem';

function TrashList({ trashedNotes, onRestore, onDeletePermanently }) {
    return (
        <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4 text-[#0B1D51]">🗑️ Trashed Notes</h3>
            <ul className="space-y-4">
                {trashedNotes.length === 0 && (
                    <li className="text-gray-400 text-center">No trashed notes.</li>
                )}
                {trashedNotes.map(note => (
                    <TrashItem
                        key={note._id}
                        note={note}
                        onRestore={onRestore}
                        onDelete={onDeletePermanently}
                    />
                ))}
            </ul>
        </div>
    );
}
export default TrashList;