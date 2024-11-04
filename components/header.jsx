"use client"

import Image from 'next/image'
import { useEffect, useState } from "react"
import Link from 'next/link'

export default function Header() {
    const [contributors, setContributors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/fariraimasocha/quickhacks/contributors')
                if (!response.ok) {
                    throw new Error('Failed to fetch contributors')
                }
                const data = await response.json()
                setContributors(data)
            } catch (error) {
                console.error('Error fetching contributors:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchContributors()
    }, [])

    console.log(contributors);

    return (
        <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-3 backdrop-blur-sm flex justify-center text-gray-800 mt-5'>
            <nav className='container flex max-w-3xl py-0.5 items-center justify-between bg-white px-3 rounded-md shadow-md'>
                <Link href='/create'>
                    <div>
                        <button className='transition-colors hover:bg-gray-700 ease-out delay-150 font-akaya rounded-md hover:text-foreground text-white bg-gray-800 px-5 py-3'>
                            Add Hack
                        </button>
                    </div>
                </Link>

                <Link href='/'>
                    <div className='text-2xl font-akaya'>
                        <h2 className='mt-1'>QuickHacks</h2>
                    </div>
                </Link>

                <div>
                    {contributors.length > 0 && (
                        <div className="flex items-center font-akaya">
                            <Image
                                src={contributors[0].avatar_url}
                                alt={contributors[0].login}
                                width={64}
                                height={64}
                                className="h-16 w-16 border-2 border-primary rounded-full"
                                priority
                            />
                            <div className='flex flex-col'>
                                <span className="ml-2">by</span>
                                <span className="ml-2">{contributors[0].login.slice(0, 4)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
} 