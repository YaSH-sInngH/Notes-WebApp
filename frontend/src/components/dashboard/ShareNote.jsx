import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchSharedNote } from "../../api/api";

function ShareNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSharedNote(id)
            .then(res => {
                setNote(res.data);
                setLoading(false);
            })
            .catch(() => {
                setNote(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!note) return <div className="text-center mt-10 text-red-500">Note not found or not shared.</div>;

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
            <div className="prose max-w-none mb-4">
                <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
            {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {note.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 border text-xs px-2 py-1 rounded-full shadow-sm text-blue-700">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="text-xs text-gray-400 mt-4">
                Created: {new Date(note.createdAt).toLocaleString()}
            </div>
        </div>
    );
}

export default ShareNote;