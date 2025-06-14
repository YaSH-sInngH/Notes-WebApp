function Header() {
    return (
        <div className="text-center px-2 sm:px-4 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 bg-clip-text text-transparent mb-2">
                Welcome to Your Notes Dashboard
            </h1>
            <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">
                Organize, manage, and never lose track of your important thoughts
            </p>
        </div>
    );
}

export default Header;