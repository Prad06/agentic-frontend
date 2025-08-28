import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, TrendingUp, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ pending: 0, completed_today: 0, in_progress: 0 });

    useEffect(() => {
        fetch('http://35.209.158.116:4200/api/stats/quick')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome back, {user?.username || 'User'}!
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Manage and review your pending analysis requests
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link
                    to="/analysis/asset"
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4 group-hover:bg-indigo-200 transition-colors">
                        <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Asset Reviews</h3>
                    <p className="text-sm text-gray-600">Review pending asset analysis</p>
                </Link>

                <Link
                    to="/analysis/indication"
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Indication Reviews</h3>
                    <p className="text-sm text-gray-600">Review indication submissions</p>
                </Link>

                <Link
                    to="/analysis/catalyst"
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-4 group-hover:bg-amber-200 transition-colors">
                        <Zap className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Catalyst Reviews</h3>
                    <p className="text-sm text-gray-600">Review catalyst events</p>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-3xl font-bold text-indigo-600">{stats.pending}</p>
                            <p className="text-sm text-gray-600">Pending Reviews</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-green-600">{stats.completed_today}</p>
                            <p className="text-sm text-gray-600">Completed Today</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-amber-600">{stats.in_progress}</p>
                            <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;