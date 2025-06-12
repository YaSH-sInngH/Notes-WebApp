function LogoutButton() {
    return (
        <button
            onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
            }}
            className="fixed top-4 right-4 flex items-center gap-2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 z-50"
        >
            <span>Logout</span>
        </button>
    );
}
export default LogoutButton;