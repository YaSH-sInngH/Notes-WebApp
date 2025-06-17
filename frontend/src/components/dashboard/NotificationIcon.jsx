import React, { useState, useRef, useEffect } from 'react';

function NotificationIcon({ notifications, onDismiss, onDismissAll }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const notificationCount = notifications?.length || 0;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'due_today': return '🚨';
            case 'due_tomorrow': return '⏰';
            case 'due_this_week': return '📅';
            case 'overdue': return '❗';
            default: return '🔔';
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'due_today': return 'bg-red-50 border-l-red-400 text-red-800';
            case 'due_tomorrow': return 'bg-orange-50 border-l-orange-400 text-orange-800';
            case 'due_this_week': return 'bg-yellow-50 border-l-yellow-400 text-yellow-800';
            case 'overdue': return 'bg-red-100 border-l-red-500 text-red-900';
            default: return 'bg-blue-50 border-l-blue-400 text-blue-800';
        }
    };

    return (
        <div className="relative z-[9998]" ref={dropdownRef}>
            {/* Notification Bell Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                
                {/* Notification Badge */}
                <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ${
                    notificationCount > 0 ? 'bg-red-500' : 'bg-gray-400'
                }`}>
                    {notificationCount > 99 ? '99+' : notificationCount || '0'}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="fixed top-20 right-8 w-72 sm:w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] max-h-80 sm:max-h-96 overflow-hidden">
                    {/* Header */}
                    <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                            Notifications ({notificationCount})
                        </h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={onDismissAll}
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-60 sm:max-h-72 md:max-h-80 overflow-y-auto">
                        
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <div className="mb-2">🔔</div>
                                <p className="text-sm">No notifications right now</p>
                                <p className="text-xs mt-1 opacity-75">You're all caught up!</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-3 sm:p-4 border-l-4 border-b border-gray-100 hover:bg-gray-50 ${getNotificationColor(notification.type)}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                                            <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                        </div>
                                        <p className="text-xs mt-1 opacity-90">{notification.message}</p>
                                        <p className="text-xs mt-1 opacity-75">
                                            Due: {new Date(notification.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onDismiss(notification.id)}
                                        className="text-gray-400 hover:text-gray-600 ml-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-gray-50 text-center">
                        <span className="text-xs text-gray-500">
                            Auto-refreshes every minute
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationIcon;