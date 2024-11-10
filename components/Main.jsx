'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 ${active ? 'border-b-2 border-gray-800 text-gray-800' : ''
            }`}
    >
        {children}
    </button>
);

export default function Main() {
    const [hacks, setHacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('top');

    useEffect(() => {
        axios.get('/api/hack')
            .then(res => {
                setHacks(res.data.hacks);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching hacks:", err);
                setLoading(false);
            });
    }, []);

    const updateVotes = async (id, action) => {
        const hasVoted = localStorage.getItem(`voted_${id}`);

        if (hasVoted) {
            Swal.fire({
                title: 'Error!',
                text: 'You have already voted on this hack.',
                toast: true,
                icon: 'error',
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        try {
            const response = await axios.patch('/api/hack', { id, action });
            const updatedHacks = hacks.map(hack =>
                hack._id === id ? { ...hack, votes: response.data.votes } : hack
            );
            setHacks(updatedHacks);
            localStorage.setItem(`voted_${id}`, true); // Mark as voted
            Swal.fire({
                title: 'Success!',
                text: `You have ${action === 'add' ? 'upvoted' : 'downvoted'} this hack.`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error updating votes:", error);
        }
    };

    if (loading) {
        return <h1 className='text-center font-akaya animate-pulse text-gray-700 text-2xl mt-10'>Loading...</h1>;
    }

    const sortedHacks = [...hacks].sort((a, b) => {
        if (activeTab === 'top') return b.votes - a.votes;
        if (activeTab === 'new') return new Date(b.createdAt) - new Date(a.createdAt);
        return b.votes - a.votes; // 'hot' tab can use a combination of time and votes
    });

    return (
        <section className='mt-20'>
            {/* Tab Navigation */}
            <div className="max-w-3xl mx-auto mb-6 border-b flex justify-center space-x-4">
                <TabButton
                    active={activeTab === 'hot'}
                    onClick={() => setActiveTab('hot')}
                >
                    <Flame size={18} />
                    Hot
                </TabButton>
                <TabButton
                    active={activeTab === 'new'}
                    onClick={() => setActiveTab('new')}
                >
                    <Sparkles size={18} />
                    New
                </TabButton>
                <TabButton
                    active={activeTab === 'top'}
                    onClick={() => setActiveTab('top')}
                >
                    <TrendingUp size={18} />
                    Top
                </TabButton>
            </div>

            <div className='container mx-auto max-w-3xl flex flex-col space-y-3 px-4'>
                {sortedHacks.map((hack, index) => {
                    const createdAt = new Date(hack.createdAt);
                    const now = new Date();
                    const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

                    let formattedDate;
                    if (diffInDays === 0) {
                        formattedDate = 'Today';
                    } else if (diffInDays === 1) {
                        formattedDate = 'Yesterday';
                    } else {
                        formattedDate = `${diffInDays} days ago`;
                    }

                    return (
                        <div
                            key={hack._id}
                            className='rounded-md font-akaya bg-white text-gray-700 px-5 py-5 shadow-md hover:bg-slate-50 transition ease-in-out delay-150'
                        >
                            <div className='flex flex-col md:flex-row justify-between'>
                                <div className='flex-1'>
                                    <h1 className='text-gray-800 text-lg font-semibold'>
                                        {index + 1}. {hack.title}
                                    </h1>
                                    <p className='text-gray-600'>{hack.description}</p>
                                    <div className='flex space-x-2 mt-3 text-gray-500'>
                                        <p>By {hack.user}</p>
                                        <p>{formattedDate}</p>
                                    </div>
                                </div>
                                <div className='mt-3 flex items-center space-x-2'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateVotes(hack._id, 'add');
                                        }}
                                        className='hover:scale-110'
                                    >
                                        <Image src="/fire.png" alt="Upvote" width={28} height={28} />
                                    </button>
                                    <span className="font-bold text-lg">{hack.votes}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateVotes(hack._id, 'subtract');
                                        }}
                                        className='hover:scale-110'
                                    >
                                        <Image src="/poop.png" alt="Downvote" width={22} height={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}