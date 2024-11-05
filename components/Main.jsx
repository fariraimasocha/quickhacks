"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

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
        try {
            const response = await axios.patch('/api/hack', { id, action });
            const updatedHacks = hacks.map(hack =>
                hack._id === id ? { ...hack, votes: response.data.votes } : hack
            );
            setHacks(updatedHacks);
        } catch (error) {
            console.error("Error updating votes:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Optional loading state
    }

    return (
        <section className='mt-20'>
            <div className='container max-w-3xl flex flex-col space-y-3'>
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
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-gray-800'>Title: {hack.title}</h1>
                                    <p className='text-gray-600'>Description: {hack.description}</p>
                                    <div className='flex space-x-2 mt-3 text-gray-500'>
                                        <p>By {hack.user}</p>
                                        <p>{formattedDate}</p>
                                        <p>{hack.votes} votes</p> {/* Updated to show votes */}
                                    </div>
                                </div>
                                <div className='mt-3 flex flex-col space-y-2'>
                                    <button
                                        onClick={() => updateVotes(hack._id, 'add')}
                                        className='hover:scale-150'
                                    >
                                        <Image src="/fire.png" alt="Upvote" width={30} height={30} />
                                    </button>
                                    <button
                                        onClick={() => updateVotes(hack._id, 'subtract')}
                                        className='hover:scale-150'
                                    >
                                        <Image src="/poop.png" alt="Downvote" width={24} height={24} />
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