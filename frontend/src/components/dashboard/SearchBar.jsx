function SearchBar({ search, setSearch, showPinned, setShowPinned, sortBy, setSortBy }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-center md:justify-between">
                {/* Search Input */}
                <div className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">🔍</span>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search your notes..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 font-medium text-sm sm:text-base"
                    />
                </div>
                
                {/* Filter and Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* All/Pinned Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 w-full sm:w-auto">
                        <button
                            onClick={() => setShowPinned(false)}
                            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                !showPinned 
                                    ? "bg-blue-500 text-white shadow-md transform scale-105" 
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setShowPinned(true)}
                            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
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
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 px-4 py-3 pr-10 rounded-xl shadow-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
                        >
                            <option value="createdAt">📅 Newest First</option>
                            <option value="updatedAt">✏️ Last Edited</option>
                            <option value="duedateAsc">📅 Due Date (Earliest)</option>
                            <option value="duedateDesc">📅 Due Date (Latest)</option>
                            <option value="priorityHightoLow">🔴 Priority (High to Low)</option>
                            <option value="priorityLowtoHigh">🟢 Priority (Low to High)</option>
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