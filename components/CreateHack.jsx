'use client'

import { useState } from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


export default function Component() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [user, setUser] = useState('fariraijames')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/hack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, user })
            })

            if (response.ok) {
                console.log('Hack submitted successfully')
                Swal.fire({
                    title: 'Success!',
                    text: 'Your hack has been submitted successfully.',
                    icon: 'success',
                    position: 'top-end',
                }).then(() => {
                    router.push('/')
                }
                )

            } else {
                console.log('Failed to submit hack')
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while submitting the hack.',
                    icon: 'error',

                })
            }
        } catch (error) {
            console.error('An error occurred while submitting the hack:', error)
        }
    }

    return (
        <div className="flex items-center justify-center font-akaya">
            <div className="w-full max-w-3xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add a hack</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        We'd love to hear about the hacks you use in your development projects. Add your hack and help other devs.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">

                    <div className="space-y-2">
                        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="user"
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the title"
                            className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="message"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter the description"
                            className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                            required
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit Hack
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}