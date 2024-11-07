import React from 'react'
import Image from 'next/image'

export default function Hero() {
    return (
        <div>
            <section className='mt-20'>
                <div className='container max-w-3xl'>
                    <h1 className='text-5xl font-bold font-akaya text-gray-800 text-center'>Top 50 programming hacks chosen by the internet and you</h1>
                    <p className='mt-5 text-2xl text-center font-akaya text-gray-700'>
                        Give your favourites an <span className='text-gray-800 underline decoration-orange-500'>Upvote</span> and a < span className='text-gray-800 underline decoration-orange-500'>Comment</span>. Write as best you can. No account is required!
                    </p>
                    <div className='flex justify-center mt-8'>
                        <div className='rounded bg-white text-gray-800 font-akaya shadow-md py-4 px-4 flex items-center'>
                            <Image src='/fire.gif' alt='Fire Emoji' width={20} height={20} priority unoptimized />
                            <h2 className='mr-2'>#Be Part of the Quick family</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
