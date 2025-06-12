function SearchBar({ search, setSearch, showPinned, setShowPinned, sortBy, setSortBy }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">🔍</span>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search your notes..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 font-medium"
                    />
                </div>
                
                {/* Filter and Sort Controls */}
                <div className="flex items-center gap-3">
                    {/* All/Pinned Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setShowPinned(false)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                !showPinned 
                                    ? "bg-blue-500 text-white shadow-md transform scale-105" 
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setShowPinned(true)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                                showPinned 
                                    ? "bg-blue-500 text-white shadow-md transform scale-105" 
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            <span>📌</span>
                            Pinned
                        </button>
                    </div>
                    
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 px-4 py-3 pr-10 rounded-xl shadow-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 cursor-pointer"
                        >
                            <option value="createdAt">📅 Newest First</option>
                            <option value="updatedAt">✏️ Last Edited</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;