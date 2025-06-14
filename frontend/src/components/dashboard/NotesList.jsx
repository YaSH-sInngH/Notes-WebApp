import NoteItem from './NoteItem';

function NotesList(props) {
    const { notes, ...rest } = props;
    
    if (!notes.length) {
        return (
            <div className="text-center mt-20 px-2 sm:px-0">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12 max-w-md mx-auto">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-semibold text-slate-700 mb-2">No Notes Found</h3>
                    <p className="text-slate-500">Start creating your first note to get organized!</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {notes.map(note => (
                <NoteItem key={note._id} note={note} {...rest} />
            ))}
        </div>
    );
}

export default NotesList;