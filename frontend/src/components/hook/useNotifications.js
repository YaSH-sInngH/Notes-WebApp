import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing notifications
export function useNotifications(notes) {
    const [notifications, setNotifications] = useState([]);
    const [dismissedNotifications, setDismissedNotifications] = useState(new Set());

    const generateNotifications = useCallback(() => {
        if (!notes || notes.length === 0) return [];

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const newNotifications = [];

        notes.forEach(note => {
            // Skip completed tasks or notes without due dates
            if (!note.dueDate || note.status === 'Completed') return;

            const dueDate = new Date(note.dueDate);
            const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
            
            let notificationType = '';
            let message = '';

            // Check if overdue
            if (dueDateOnly < today) {
                notificationType = 'overdue';
                const daysOverdue = Math.floor((today - dueDateOnly) / (1000 * 60 * 60 * 24));
                message = `This task is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue!`;
            }
            // Check if due today
            else if (dueDateOnly.getTime() === today.getTime()) {
                notificationType = 'due_today';
                message = 'This task is due today!';
            }
            // Check if due tomorrow
            else if (dueDateOnly.getTime() === tomorrow.getTime()) {
                notificationType = 'due_tomorrow';
                message = 'This task is due tomorrow.';
            }
            // Check if due this week
            else if (dueDateOnly <= nextWeek) {
                notificationType = 'due_this_week';
                const daysUntilDue = Math.floor((dueDateOnly - today) / (1000 * 60 * 60 * 24));
                message = `This task is due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}.`;
            }

            if (notificationType) {
                const notificationId = `${note._id}-${notificationType}`;
                
                // Don't add if already dismissed
                if (!dismissedNotifications.has(notificationId)) {
                    newNotifications.push({
                        id: notificationId,
                        noteId: note._id,
                        type: notificationType,
                        title: note.title,
                        message: message,
                        dueDate: note.dueDate,
                        priority: note.priority || 'Medium',
                        createdAt: new Date().toISOString()
                    });
                }
            }
        });

        // Sort by priority and urgency
        return newNotifications.sort((a, b) => {
            const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            const typeOrder = { 'overdue': 4, 'due_today': 3, 'due_tomorrow': 2, 'due_this_week': 1 };
            
            const priorityDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
            if (priorityDiff !== 0) return priorityDiff;
            
            return (typeOrder[b.type] || 0) - (typeOrder[a.type] || 0);
        });
    }, [notes, dismissedNotifications]);

    // Check for notifications every minute
    useEffect(() => {
        const updateNotifications = () => {
            const newNotifications = generateNotifications();
            setNotifications(newNotifications);
        };

        // Initial check
        updateNotifications();

        // Set up interval to check every minute
        const interval = setInterval(updateNotifications, 60000);

        return () => clearInterval(interval);
    }, [generateNotifications]);

    const dismissNotification = useCallback((notificationId) => {
        setDismissedNotifications(prev => new Set([...prev, notificationId]));
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }, []);

    const dismissAllNotifications = useCallback(() => {
        notifications.forEach(notification => {
            setDismissedNotifications(prev => new Set([...prev, notification.id]));
        });
        setNotifications([]);
    }, [notifications]);

    const clearDismissedNotifications = useCallback(() => {
        setDismissedNotifications(new Set());
    }, []);

    return {
        notifications,
        dismissNotification,
        dismissAllNotifications,
        clearDismissedNotifications
    };
}