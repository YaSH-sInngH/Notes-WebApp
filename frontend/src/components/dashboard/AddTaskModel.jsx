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
                status: status, // Pass the status to onAddNote
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-300">
                    {/* Compact Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-3 relative">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">Add New Task</h2>
                                    <p className="text-blue-100 text-sm">Create a new task</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={onClose}
                                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
                                aria-label="Close"
                            >
                                <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Compact Form */}
                    <div className="p-6">
                        <div ref={formRef} className="space-y-3">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Title *
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter your task title..."
                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                    placeholder="Describe your task..."
                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                                    rows={2}
                                />
                            </div>

                            {/* Two column layout for tags and due date */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Tags Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags
                                    </label>
                                    <input
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="work, urgent"
                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Note Color
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {PRESET_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                                                formData.color === color ? "border-black scale-110" : "border-gray-200"
                                            }`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setFormData(prev => ({ ...prev, color }))}
                                            aria-label={`Pick color ${color}`}
                                        >
                                            {formData.color === color && (
                                                <span className="text-white text-sm font-bold">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-3 py-1.5 text-base text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.title.trim()}
                                    className="px-4 py-1.5 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center space-x-1"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Adding...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>Add Task</span>
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
            `}</style>
        </>
    );
}

export default AddTaskModal;