'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function Main() {
    const [hacks, setHacks] = useState([]);
    const [loading, setLoading] = useState(true);

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
                icon: 'error',
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
            });
        } catch (error) {
            console.error("Error updating votes:", error);
        }
    };

    if (loading) {
        return <h1 className='text-center font-akaya animate-pulse text-gray-700 text-2xl mt-10'>Loading...</h1>; // Optional loading state
    }

    return (
        <section className='mt-20'>
            <div className='container mx-auto max-w-3xl flex flex-col space-y-3 px-4'> {/* Added horizontal padding */}
                {hacks.map(hack => {
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
                        <div key={hack._id} className='rounded-md font-akaya bg-white text-gray-700 px-5 py-5 shadow-md hover:bg-slate-50 transition ease-in-out delay-150'>
                            <div className='flex flex-col md:flex-row justify-between'>
                                <div className='flex-1'>
                                    <h1 className='text-gray-800 text-lg font-semibold'>Title: {hack.title}</h1>
                                    <p className='text-gray-600'>Description: {hack.description}</p>
                                    <div className='flex space-x-2 mt-3 text-gray-500'>
                                        <p>By {hack.user}</p>
                                        <p>{formattedDate}</p>
                                        <p>{hack.votes} votes</p>
                                    </div>
                                </div>
                                <div className='mt-3 flex flex-col space-y-3 md:space-y-0 md:space-x-2'>
                                    <button
                                        onClick={() => updateVotes(hack._id, 'add')}
                                        className='hover:scale-150'
                                    >
                                        <Image src="/fire.png" alt="Upvote" width={28} height={28} />
                                    </button>
                                    <button
                                        onClick={() => updateVotes(hack._id, 'subtract')}
                                        className='hover:scale-150'
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