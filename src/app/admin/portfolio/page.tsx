'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface PortfolioItem {
    id: string;
    url: string;
    title: string;
    category: string;
    order_index: number;
}

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        category: 'fashion',
    });

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const response = await fetch('/api/admin/portfolio');
            const data = await response.json();
            setItems(data.portfolio || []);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch('/api/admin/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    order_index: items.length,
                }),
            });

            if (response.ok) {
                fetchPortfolio();
                setFormData({ url: '', title: '', category: 'fashion' });
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error saving item:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        try {
            const response = await fetch(`/api/admin/portfolio/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPortfolio();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-light">
            <AdminHeader />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="font-serif text-3xl">Manage Portfolio</h2>
                        <p className="text-gray-500 mt-1">Add or remove photos from your landing page gallery.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-accent hover:bg-accent-hover text-white px-6 py-3 font-medium flex items-center gap-2 transition-colors"
                        >
                            <Plus size={20} />
                            Add Photo
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="bg-white border border-gray-200 p-6 mb-8 max-w-2xl">
                        <h3 className="font-serif text-xl mb-6">Add New Photo</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300"
                                    placeholder="/images/your-photo.jpg or external URL"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300"
                                        placeholder="Project Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 bg-white"
                                    >
                                        <option value="fashion">Fashion</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="portrait">Portrait</option>
                                        <option value="travel">Travel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 font-medium transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Uploading...' : 'Save to Portfolio'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        <p className="col-span-full text-center text-gray-500 py-12">Loading portfolio...</p>
                    ) : items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-20 bg-white border border-dashed border-gray-300">
                            No photos in your portfolio yet. Add some above!
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="group relative bg-white border border-gray-200 overflow-hidden">
                                <div className="aspect-[3/4] relative bg-gray-100">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="font-medium truncate">{item.title || 'Untitled'}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.category}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
