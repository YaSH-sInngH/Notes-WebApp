function Sidebar({ activeSection, setActiveSection, allTags, onTagClick, setSelectedTag, selectedTag, onClose }) {
    return (
        <aside className="h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col py-8 px-6 w-72 md:w-80 shadow-2xl border-r border-blue-800/30 relative">
            {/* Close button for mobile */}
            {typeof onClose === 'function' && (
                <button
                    className="md:hidden absolute top-4 right-4 text-white text-2xl"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    &times;
                </button>
            )}

            {/* Top: Logo, Navigation, Categories */}
            <div className="flex-1 flex flex-col">
                <div className="mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                            <span className="text-xl font-bold">📝</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-wide">NotesHub</h2>
                            <p className="text-xs text-blue-200/70 font-medium">Organize your thoughts</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent flex-1"></div>
                            <span className="text-xs text-blue-200/70 font-semibold uppercase tracking-wider px-2">Workspace</span>
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent flex-1"></div>
                        </div>

                        <button
                            onClick={() => {
                                setActiveSection("notes");
                                if (typeof setSelectedTag === 'function') {
                                    setSelectedTag(null);
                                }
                            }}
                            className={`group flex items-center w-full px-4 py-4 rounded-xl transition-all duration-300 ${
                                activeSection === "notes"
                                    ? "bg-white text-slate-900 font-semibold shadow-lg transform scale-105"
                                    : "hover:bg-blue-800/50 hover:transform hover:translate-x-1"
                            }`}
                        >
                            <div className={`mr-4 text-xl transition-transform duration-300 ${
                                activeSection === "notes" ? "scale-110" : "group-hover:scale-110"
                            }`}>
                                📝
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold">Notes</div>
                                <div className={`text-sm ${
                                    activeSection === "notes" ? "text-slate-600" : "text-blue-200/70"
                                }`}>
                                    Your ideas & thoughts
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveSection("archive")}
                            className={`group flex items-center w-full px-4 py-4 rounded-xl transition-all duration-300 ${
                                activeSection === "archive"
                                    ? "bg-white text-slate-900 font-semibold shadow-lg transform scale-105"
                                    : "hover:bg-blue-800/50 hover:transform hover:translate-x-1"
                            }`}
                        >
                            <div className={`mr-4 text-xl transition-transform duration-300 ${
                                activeSection === "archive" ? "scale-110" : "group-hover:scale-110"
                            }`}>
                                📦
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold">Archive</div>
                                <div className={`text-sm ${
                                    activeSection === "archive" ? "text-slate-600" : "text-blue-200/70"
                                }`}>
                                    Stored notes
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveSection("trash")}
                            className={`group flex items-center w-full px-4 py-4 rounded-xl transition-all duration-300 ${
                                activeSection === "trash"
                                    ? "bg-white text-slate-900 font-semibold shadow-lg transform scale-105"
                                    : "hover:bg-blue-800/50 hover:transform hover:translate-x-1"
                            }`}
                        >
                            <div className={`mr-4 text-xl transition-transform duration-300 ${
                                activeSection === "trash" ? "scale-110" : "group-hover:scale-110"
                            }`}>
                                🗑️
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold">Trash</div>
                                <div className={`text-sm ${
                                    activeSection === "trash" ? "text-slate-600" : "text-blue-200/70"
                                }`}>
                                    Deleted items
                                </div>
                            </div>
                        </button>
                    </div>
                </nav>

                {/* Categories */}
                <div className="mt-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent flex-1"></div>
                        <span className="text-xs text-purple-200/70 font-semibold uppercase tracking-wider px-2">Categories</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent flex-1"></div>
                    </div>
                    {/* Fixed height, scrollable if overflow */}
                    <div className="flex flex-wrap gap-3 mt-2 max-h-32 overflow-y-auto pr-1">
                        {allTags.length === 0 ? (
                            <div className="text-center py-8 w-full">
                                <div className="text-4xl mb-2 opacity-50">🏷️</div>
                                <p className="text-blue-200/50 text-sm">No tags yet</p>
                                <p className="text-blue-200/30 text-xs mt-1">Add tags to organize notes</p>
                            </div>
                        ) : (
                            allTags.map((tag, idx) => {
                                const colors = [
                                    "bg-blue-400 text-white",
                                    "bg-green-400 text-white",
                                    "bg-orange-400 text-white",
                                    "bg-pink-500 text-white",
                                    "bg-red-500 text-white",
                                    "bg-yellow-400 text-white",
                                    "bg-purple-400 text-white",
                                    "bg-teal-400 text-white",
                                    "bg-indigo-400 text-white",
                                    "bg-gray-400 text-white"
                                ];
                                const color = colors[idx % colors.length];
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => onTagClick(tag)}
                                        className={`flex items-center gap-2 px-4 py-1 rounded-full font-semibold shadow transition-all duration-200 hover:scale-105 focus:outline-none ${color} ${
                                            tag === selectedTag ? "ring-2 ring-white" : ""
                                        }`}
                                    >
                                        <span className="text-xs">•</span>
                                        <span className="text-sm">{tag}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom: Logout Button */}
            <div className="pt-6 border-t border-blue-800/30">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                    className="group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;