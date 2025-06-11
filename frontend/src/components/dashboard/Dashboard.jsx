import { useState, useEffect } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from '../../api/api';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editTags, setEditTags] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('pinned');

    const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await fetchNotes();
                setNotes(res.data);
            } catch (error) {
                const message = error.response?.data?.message || error.message || 'Failed to fetch notes';
                alert('Error: ' + message);
            }
        };
        getNotes();
    }, []);

    const startEditing = (note) => {
        setEditingNoteId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditTags(note.tags ? note.tags.join(', ') : '');
    };

    const cancelEditing = () => {
        setEditingNoteId(null);
        setEditTitle('');
        setEditContent('');
        setEditTags('');
    };

    const saveEdit = async (noteId) => {
        try {
            const tags = editTags
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);
            const res = await updateNote(noteId, { title: editTitle, content: editContent, tags });
            setNotes(notes.map(n => (n._id === noteId ? res.data : n)));
            cancelEditing();
        } catch (error) {
            alert('Failed to update note');
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto font-sans relative">
            {/* Logout */}
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }}
                className="fixed top-4 right-4 flex items-center gap-2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 z-50"
            >
                <span>Logout</span>
            </button>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📝 Notes Dashboard</h2>

            {/* Add Note Form */}
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const content = e.target.content.value;
                    const tags = e.target.tags.value
                        .split(',')
                        .map(tag => tag.trim())
                        .filter(Boolean);
                    if (!title) return alert('Title is required');
                    try {
                        const res = await createNote({ title, content, tags });
                        setNotes([res.data, ...notes]);
                        e.target.reset();
                    } catch (error) {
                        alert('Failed to create note');
                    }
                }}
                className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3"
            >
                <input name="title" placeholder="Title" className="border px-3 py-2 rounded shadow-sm" />
                <input name="content" placeholder="Content" className="border px-3 py-2 rounded shadow-sm" />
                <input name="tags" placeholder="Tags (comma separated)" className="border px-3 py-2 rounded shadow-sm" />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md">
                    Add Note
                </button>
            </form>

            {/* Search and Sort */}
            <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search notes..."
                    className="border px-3 py-2 rounded shadow-sm w-full md:w-1/2"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border px-3 py-2 rounded shadow-sm w-full md:w-1/3"
                >
                    <option value="pinned">Pinned</option>
                    <option value="createdAt">Newest First</option>
                    <option value="updatedAt">Last Edited</option>
                </select>
            </div>

            {/* Tag Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-1 text-sm rounded-full shadow-sm transition ${
                        selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-1 text-sm rounded-full shadow-sm transition ${
                            selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            {/* Notes */}
            <ul className="space-y-6">
                {[...notes]
                    .filter(note =>
                        (!selectedTag || (note.tags && note.tags.includes(selectedTag))) &&
                        (
                            note.title.toLowerCase().includes(search.toLowerCase()) ||
                            note.content.toLowerCase().includes(search.toLowerCase())
                        )
                    )
                    .sort((a, b) => {
                        if (sortBy === 'pinned') return b.pinned - a.pinned;
                        if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
                        if (sortBy === 'updatedAt') return new Date(b.updatedAt) - new Date(a.updatedAt);
                        return 0;
                    })
                    .map(note => (
                        <li
                            key={note._id}
                            className={`border rounded-lg p-4 shadow-md transition duration-200 ${
                                note.pinned ? 'bg-blue-50 border-blue-300' : 'bg-white'
                            }`}
                        >
                            {editingNoteId === note._id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                                    />
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                                    />
                                    <input
                                        value={editTags}
                                        onChange={(e) => setEditTags(e.target.value)}
                                        placeholder="Tags (comma separated)"
                                        className="border px-3 py-2 w-full mb-3 rounded shadow-sm"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => saveEdit(note._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded shadow"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {note.title} {note.pinned && <span className="text-blue-500">📌</span>}
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 mb-3">{note.content}</p>
                                    {note.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {note.tags.map(tag => (
                                                <span key={tag} className="bg-gray-100 border text-sm px-2 py-1 rounded-full shadow-sm">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <button
                                            onClick={() => startEditing(note)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await deleteNote(note._id);
                                                setNotes(notes.filter(n => n._id !== note._id));
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const res = await updateNote(note._id, { pinned: !note.pinned });
                                                    setNotes(notes.map(n => (n._id === note._id ? res.data : n)));
                                                } catch (error) {
                                                    alert('Failed to pin/unpin note');
                                                }
                                            }}
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
                    ))}
            </ul>
        </div>
    );
}

export default Dashboard;
