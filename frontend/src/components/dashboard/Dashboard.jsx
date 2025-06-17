import { useState, useEffect } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote, trashNote, restoreNote, fetchTrashedNotes, archiveNote, unarchiveNote, fetchArchivedNotes } from '../../api/api';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchBar from './SearchBar';
import NotesList from './NotesList';
import TrashList from './TrashList';
import AddTaskModal from './AddTaskModel';
import { toast } from 'react-toastify';
import NotificationIcon from './NotificationIcon';
import { useNotifications } from '../hook/useNotifications';


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
    const [editColor, setEditColor] = useState('#ffffff');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [editStatus, setEditStatus] = useState('Pending');
    const [editDueDate, setEditDueDate] = useState("");
    const [editPriority, setEditPriority] = useState('Medium')

    const {
        notifications,
        dismissNotification,
        dismissAllNotifications,
        clearDismissedNotifications
    } = useNotifications(notes);

    const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

    useEffect(() => {
        fetchNotesList();
    }, []);

    const fetchNotesList = async () => {
        try {
            const res = await fetchNotes();
            setNotes(res.data);
        } catch (error) {
            toast.error('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleAddNote = async ({ title, content, tags, color, status, priority, dueDate }) => {
        try {
            const newNote = {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                color,
                status,
                priority,
                dueDate: dueDate || null
            };
            const res = await createNote(newNote);
            setNotes(prev => [res.data, ...prev]);
        } catch (error) {
            console.error('Error adding note:', error);
            toast.error('Failed to add note');
        }
    };

    const handleStartEditing = (note) => {
        setEditingNoteId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditTags(note.tags ? note.tags.join(', ') : '');
        setEditColor(note.color || '#ffffff');
        setEditStatus(note.status || 'Pending');
        setEditDueDate(note.dueDate ? new Date(note.dueDate).toISOString().split('T')[0] : '');
        setEditPriority(note.priority || 'Medium');
    };

    const handleCancelEditing = () => {
        setEditingNoteId(null);
        setEditTitle('');
        setEditContent('');
        setEditTags('');
        setEditColor('#ffffff');
        setEditStatus('Pending');
        setEditDueDate('');
        setEditPriority('Medium');
    };

    const handleSaveEdit = async (noteId, field, value) => {
        try {
            let updatedNote = notes.find(note => note._id === noteId);

            if (!updatedNote) return;

            if (field) {
                // Update a single field (e.g., status, pinned, etc.)
                updatedNote = { ...updatedNote, [field]: value };
            } else {
                // Full edit (from editing UI)
                updatedNote = {
                    ...updatedNote,
                    title: editTitle,
                    content: editContent,
                    tags: editTags.split(',').map(tag => tag.trim()).filter(Boolean),
                    color: editColor,
                    status: editStatus,
                    priority: editPriority,
                    dueDate: editDueDate || null
                };
            }
            const res = await updateNote(noteId, updatedNote);
            setNotes(notes.map(n => (n._id === noteId ? res.data : n)));
            if (!field) {
                handleCancelEditing();
            }
        } catch (error) {
            toast.error('Failed to update note');
        }
    };

    const handleTrashNote = async (noteId) => {
        try {
            await trashNote(noteId);
            setNotes(notes.filter(n => n._id !== noteId));
            toast.success('Note moved to trash');
        } catch (error) {
            toast.error('Failed to trash note');
        }
    };

    const handlePinToggle = async (note) => {
        try {
            const res = await updateNote(note._id, { pinned: !note.pinned });
            setNotes(notes.map(n => (n._id === note._id ? res.data : n)));
        } catch (error) {
            toast.error('Failed to pin/unpin note');
        }
    };

    const loadTrashedNotes = async () => {
        try {
            const res = await fetchTrashedNotes();
            setTrashedNotes(res.data);
        } catch (error) {
            toast.error('Failed to fetch trashed notes');
        }
    };

    const handleRestore = async (noteId) => {
        try {
            await restoreNote(noteId);
            setTrashedNotes(trashedNotes.filter(n => n._id !== noteId));
            toast.success('Note restored');
        } catch (error) {
            toast.error('Failed to restore note');
        }
    };

    const handleDeletePermanently = async (noteId) => {
        try {
            await deleteNote(noteId);
            await loadTrashedNotes();
            toast.success('Note permanently deleted');
        } catch (error) {
            toast.error('Failed to delete note');
        }
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
            toast.error('Failed to fetch archived notes');
        }
    };

    const handleArchiveNote = async (noteId) => {
        try {
            await archiveNote(noteId);
            setNotes(notes => notes.filter(n => n._id !== noteId));
            loadArchivedNotes();
            toast.success('Note archived');
        } catch (error) {
            toast.error('Failed to archive note');
        }
    };

    const handleUnarchiveNote = async (noteId) => {
        try {
            await unarchiveNote(noteId);
            loadArchivedNotes();
            fetchNotesList();
            toast.success('Note unarchived');
        } catch (error) {
            toast.error('Failed to unarchive note');
        }
    };

    const filteredNotes = [...notes]
        .filter(note =>
            (!selectedTag || (note.tags && note.tags.includes(selectedTag))) &&
            (!statusFilter || note.status === statusFilter) &&
            (
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
            ) &&
            (!showPinned || note.pinned)
        )
        .sort((a, b) => {
            if (sortBy === 'pinned') return b.pinned - a.pinned;
            if (sortBy === 'updatedAt') return new Date(b.updatedAt) - new Date(a.updatedAt);
            if (sortBy === 'duedateAsc') {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sortBy === 'duedateDesc'){
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(b.dueDate) - new Date(a.dueDate);
            }
            if(sortBy === 'priorityHightoLow'){
                const priorityOrder = {'High':3, 'Medium':2, 'Low':1};
                return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
            }
            if(sortBy === 'priorityLowtoHigh'){
                const priorityOrder = {'High':3, 'Medium':2, 'Low':1};
                return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
            }
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
                    onClose={() => setSidebarOpen(false)}
                />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 ml-0 md:ml-72 lg:ml-80 flex flex-col h-full">
            
            {/* Fixed Header with proper z-index */}
                <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm relative z-30 md:z-40">
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex justify-between items-center">
                        <Header/>
                        <div className="relative z-50">
                            <NotificationIcon
                                notifications={notifications}
                                onDismiss={dismissNotification}
                                onDismissAll={dismissAllNotifications}
                            />
                        </div>
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
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                                        <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="border px-3 py-2 rounded text-sm"
                                        >
                                        <option value="">All</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        </select>
                                    </div>
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
                                        editStatus={editStatus}
                                        setEditStatus={setEditStatus}
                                        editDueDate={editDueDate}
                                        setEditDueDate={setEditDueDate}
                                        editPriority={editPriority}
                                        setEditPriority={setEditPriority}
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
                                    editColor={editColor}
                                    setEditColor={setEditColor}
                                    editStatus={editStatus}
                                    setEditStatus={setEditStatus}
                                    editDueDate={editDueDate}
                                    setEditDueDate={setEditDueDate}
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
                    className="md:hidden fixed top-6 left-4 z-[70] bg-white rounded-full p-2 shadow-lg border border-gray-200"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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