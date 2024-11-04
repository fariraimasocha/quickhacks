"use client"

'use client'

import { useState } from 'react'

export default function Component() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ name, email, message })
    }

    return (
        <div className="flex items-center justify-center font-akaya">
            <div className="w-full max-w-3xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Add a hack</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We'd love to hear about the hacks you use in your development projects. Add your hack and help other devs.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter the title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter the description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
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