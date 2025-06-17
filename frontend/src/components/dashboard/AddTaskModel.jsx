import { useRef, useState } from "react";

const PRESET_COLORS = [
    "#f44336", // red
    "#ff9800", // orange
    "#ffeb3b", // yellow
    "#8bc34a", // light green
    "#4caf50", // green
    "#009688", // teal
    "#2196f3", // blue
    "#3f51b5", // indigo
    "#673ab7", // deep purple
    "#9c27b0", // purple
    "#e040fb", // violet
    "#ff4081", // pink
];

function AddTaskModal({ onClose, onAddNote }) {
    const formRef = useRef();
    const [status, setStatus] = useState("Pending");
    const [priority, setPriority] = useState("Medium");
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        color: '#ffffff',
    });
    const [dueDate, setDueDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {  
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onAddNote({
                title: formData.title,
                content: formData.content,  
                tags: formData.tags,
                color: formData.color,
                status: status,
                priority: priority,
                dueDate: dueDate ? new Date(dueDate) : null
            });
            onClose();
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-3">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] transform transition-all duration-300 flex flex-col">
                    {/* Compact Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-3 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Add New Task</h2>
                                    <p className="text-blue-100 text-xs">Create a new task</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={onClose}
                                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
                                aria-label="Close"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="p-4">
                            <div ref={formRef} className="space-y-4">
                                {/* Title Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Task Title *
                                    </label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter task title..."
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        required
                                    />
                                </div>

                                {/* Content Textarea */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        placeholder="Task description and details..."
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical bg-gray-50 focus:bg-white"
                                        rows={3}
                                    />
                                </div>

                                {/* Two column layout for tags and due date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Tags Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tags
                                        </label>
                                        <input
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            placeholder="work, urgent, project"
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>

                                    {/* Due Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Due Date
                                        </label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Status and Priority Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        >
                                            <option value="Pending">📋 Pending</option>
                                            <option value="In Progress">⚡ In Progress</option>
                                            <option value="Completed">✅ Completed</option>
                                        </select>
                                    </div>

                                    {/* Priority */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        >
                                            <option value="Low">🟢 Low</option>
                                            <option value="Medium">🟡 Medium</option>
                                            <option value="High">🔴 High</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Color Theme
                                    </label>
                                    <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
                                        {PRESET_COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                                                    formData.color === color 
                                                        ? "border-gray-800 scale-105 shadow-md" 
                                                        : "border-gray-200 hover:border-gray-400"
                                                }`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setFormData(prev => ({ ...prev, color }))}
                                                aria-label={`Pick color ${color}`}
                                            >
                                                {formData.color === color && (
                                                    <svg className="w-4 h-4 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compact Footer with Action Buttons */}
                    <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-4 py-3 rounded-b-xl">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                                * Required fields
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.title.trim()}
                                    className="px-6 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center space-x-1"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>Create Task</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                /* Hide scrollbar for webkit browsers */
                .scrollbar-hide::-webkit-scrollbar {
                    width: 0px;
                    background: transparent;
                }

                /* Hide scrollbar for Firefox */
                .scrollbar-hide {
                    scrollbar-width: none;
                }

                /* Ensure smooth scrolling */
                .scrollbar-hide {
                    scroll-behavior: smooth;
                }
            `}</style>
        </>
    );
}

export default AddTaskModal;