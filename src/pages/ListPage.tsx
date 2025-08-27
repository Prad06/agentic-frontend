// src/pages/ListPage.tsx
import { useParams, Link } from 'react-router-dom';


import { useEffect, useState } from 'react';

interface PendingReview {
    reviewId: string;
    category: string;
    ticker: string;
    submittedAt: string;
}

const API_URL = "http://localhost:4200";
export default function ListPage() {
    const { category } = useParams<{ category: string }>();
    const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/reviews/pending`)
            .then(res => res.json())
            .then(data => {
                setPendingReviews(data);
                setLoading(false);
            });
    }, []);

    const categories = ["asset", "indication", "catalyst"];
    const counts = categories.map(cat => ({
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        key: cat,
        count: pendingReviews.filter(r => r.category === cat).length,
    }));

    const reviewsToShow = pendingReviews
        .filter(review => review.category === category)
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex gap-4 mb-6">
                {counts.map(c => (
                    <Link
                        key={c.key}
                        to={`/analysis/${c.key}`}
                        className={`px-4 py-2 rounded ${category === c.key ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        {c.name} ({c.count})
                    </Link>
                ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">{category} Reviews Pending</h1>
            <div className="mt-8 flow-root">
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Ticker</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Submitted At</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Review</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {reviewsToShow.map((review) => (
                                <tr key={review.reviewId}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{review.ticker}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(review.submittedAt).toLocaleString()}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <Link to={`/review/${review.category}/${review.reviewId}`} className="text-indigo-600 hover:text-indigo-900">
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}