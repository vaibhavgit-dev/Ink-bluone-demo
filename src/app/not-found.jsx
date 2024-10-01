import React from 'react'
import Link from 'next/link'
function notfound() {
    return (
        <div className='w-full bg[gradient-to-b #FFFFFF33,#FFC30033] p-4'>
            <div className="grid place-content-center place-items-center pt-40 ">
                <div>
                    <h2 className='font-semibold pb-10'>What you seek is seeking you…</h2>
                    <h2 className='font-semibold ml-24 pb-24'>… but you’re off by a small margin.</h2>
                </div>
                <Link href="/">
                    <button className='bg-[#FF8100] p-2 text-white rounded-3xl w-36 flex justify-center mb-5'>
                        Take a Step Back
                    </button>
                </Link>
                <p className='pb-36 text-[#007DD7]'><em>(or use the links in the Footer) </em></p>
            </div>
        </div>
    )
}

export default notfound
