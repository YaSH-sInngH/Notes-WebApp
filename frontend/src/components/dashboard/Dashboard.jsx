import { useState, useEffect } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote, trashNote, restoreNote, fetchTrashedNotes, archiveNote, unarchiveNote, fetchArchivedNotes } from '../../api/api';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchBar from './SearchBar';
import NotesList from './NotesList';
import TrashList from './TrashList';
import AddTaskModal from './AddTaskModel';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editTags, setEditTags] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [search, setSearch] = useState('');
    const [showPinned, setShowPinned] = useState(false);
    const [trashedNotes, setTrashedNotes] = useState([]);
    const [activeSection, setActiveSection] = useState('notes');
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [editColor, setEditColor] = useState('#ffffff'); // Default color
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

    useEffect(() => {
        fetchNotesList();
    }, []);

    const fetchNotesList = async () => {
        try {
            const res = await fetchNotes();
            setNotes(res.data);
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleAddNote = async ({ title, content, tags, color }) => {
        try {
            const newNote = {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                color
            };
            const res = await createNote(newNote);
            setNotes(prev => [res.data, ...prev]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleStartEditing = (note) => {
        setEditingNoteId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditTags(note.tags ? note.tags.join(', ') : '');
        setEditColor(note.color || '#ffffff'); // Set color if available
    };

    const handleCancelEditing = () => {
        setEditingNoteId(null);
        setEditTitle('');
        setEditContent('');
        setEditTags('');
    };

    const handleSaveEdit = async (noteId) => {
        try {
            const tags = editTags.split(',').map(tag => tag.trim()).filter(Boolean);
            const res = await updateNote(noteId, { title: editTitle, content: editContent, tags, color: editColor });
            setNotes(notes.map(n => (n._id === noteId ? res.data : n)));
            handleCancelEditing();
        } catch (error) {
            alert('Failed to update note');
        }
    };

    const handleTrashNote = async (noteId) => {
        await trashNote(noteId);
        setNotes(notes.filter(n => n._id !== noteId));
    };

    const handlePinToggle = async (note) => {
        try {
            const res = await updateNote(note._id, { pinned: !note.pinned });
            setNotes(notes.map(n => (n._id === note._id ? res.data : n)));
        } catch (error) {
            alert('Failed to pin/unpin note');
        }
    };

    const loadTrashedNotes = async () => {
        try {
            const res = await fetchTrashedNotes();
            setTrashedNotes(res.data);
        } catch (error) {
            alert('Failed to fetch trashed notes');
        }
    };

    const handleRestore = async (noteId) => {
        await restoreNote(noteId);
        setTrashedNotes(trashedNotes.filter(n => n._id !== noteId));
    };

    const handleDeletePermanently = async (noteId) => {
        await deleteNote(noteId);
        await loadTrashedNotes();
    };

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setActiveSection("notes");
    };

    const loadArchivedNotes = async () => {
        try {
            const res = await fetchArchivedNotes();
            setArchivedNotes(res.data);
        } catch (error) {
            alert('Failed to fetch archived notes');
        }
    };

    const handleArchiveNote = async (noteId) => {
        await archiveNote(noteId);
        setNotes(notes => notes.filter(n => n._id !== noteId));
        loadArchivedNotes();
    };

    const handleUnarchiveNote = async (noteId) => {
        await unarchiveNote(noteId);
        loadArchivedNotes();
        fetchNotesList();
    };

    const filteredNotes = [...notes]
        .filter(note =>
            (!selectedTag || (note.tags && note.tags.includes(selectedTag))) &&
            (
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
            ) &&
            (!showPinned || note.pinned)
        )
        .sort((a, b) => {
            if (sortBy === 'pinned') return b.pinned - a.pinned;
            if (sortBy === 'updatedAt') return new Date(b.updatedAt) - new Date(a.updatedAt);
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    useEffect(() => {
        if (activeSection === "trash") {
            loadTrashedNotes();
        }
        else if (activeSection === "archive") {
            loadArchivedNotes();
        } 
        else if (activeSection === "notes") {
            fetchNotesList();
        }
        // eslint-disable-next-line
    }, [activeSection]);

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            {/* Sidebar: overlay on mobile, fixed on desktop */}
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar itself */}
            <div className={`
                fixed left-0 top-0 h-full z-50 transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:fixed md:block
            `}>
                <Sidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    allTags={allTags}
                    onTagClick={handleTagClick}
                    setSelectedTag={setSelectedTag}
                    selectedTag={selectedTag}
                    onClose={() => setSidebarOpen(false)} // Pass close handler
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-80 flex flex-col h-full">
                {/* Header */}
                <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                    <div className="px-8 py-6">
                        <Header />
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <div className="px-8 py-6">
                            {activeSection === "notes" && (
                                <>
                                    <div className="mb-8">
                                        <SearchBar
                                            search={search}
                                            setSearch={setSearch}
                                            showPinned={showPinned}
                                            setShowPinned={setShowPinned}
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                        />
                                    </div>
                                    <NotesList
                                        notes={filteredNotes}
                                        editingNoteId={editingNoteId}
                                        editTitle={editTitle}
                                        setEditTitle={setEditTitle}
                                        editContent={editContent}
                                        setEditContent={setEditContent}
                                        editTags={editTags}
                                        setEditTags={setEditTags}
                                        onStartEditing={handleStartEditing}
                                        onCancelEditing={handleCancelEditing}
                                        onSaveEdit={handleSaveEdit}
                                        onTrashNote={handleTrashNote}
                                        onPinToggle={handlePinToggle}
                                        onArchiveNote={handleArchiveNote}
                                        editColor={editColor}
                                        setEditColor={setEditColor}
                                    />
                                </>
                            )}
                            
                            {activeSection === "trash" && (
                                <TrashList
                                    trashedNotes={trashedNotes}
                                    onRestore={handleRestore}
                                    onDeletePermanently={handleDeletePermanently}
                                />
                            )}
                            
                            {activeSection === "archive" && (
                                <NotesList
                                    notes={archivedNotes}
                                    onUnarchiveNote={handleUnarchiveNote}
                                    // Pass other props as needed
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating Add Button */}
            <button
                onClick={() => setShowAddTaskModal(true)}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl"
                aria-label='Add Task'
            >
                <span className="text-3xl font-light">+</span>
            </button>

            {/* Hamburger Button for Mobile */}
            {!sidebarOpen && (
                <button
                    className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}
            
            {/* Modal */}
            {showAddTaskModal && (
                <AddTaskModal
                    onClose={() => setShowAddTaskModal(false)}
                    onAddNote={handleAddNote}
                />
            )}
        </div>
    );
}

export default Dashboard;