"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from "react"

export default function Header() {
    const [contributors, setContributors] = useState([])

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

    return (
        <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-3 backdrop-blur-sm flex justify-center text-gray-800 mt-5'>
            <nav className='container flex max-w-3xl items-center justify-between bg-white py-3 px-7 rounded-md shadow-md'>
                <div>
                    <button className='transition-colors font-akaya rounded-md hover:text-foreground text-white bg-gray-800 px-3 py-2'>
                        Add Hack
                    </button>
                </div>

                <div className='text-2xl font-akaya'>
                    <h2 className='mt-1'>QuickHacks</h2>
                </div>

                <div>
                    <Link href='/' className=''>
                        <Image src='/icon.svg' alt='Logo' width={40} height={40} />
                    </Link>
                </div>
            </nav>
        </header>
    )
}