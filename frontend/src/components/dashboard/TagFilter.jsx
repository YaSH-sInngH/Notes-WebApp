function TagFilter({ allTags, selectedTag, setSelectedTag }) {
    return (
        <div className="mb-6 flex flex-wrap gap-2 px-1 sm:px-0">
            <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow-sm transition ${
                    selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                All
            </button>
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full shadow-sm transition ${
                        selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
}
export default TagFilter;