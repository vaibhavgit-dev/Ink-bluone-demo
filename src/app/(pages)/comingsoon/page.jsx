"use client"
import React, {useState, useEffect } from 'react'
import Link from 'next/link'
import Loader from "@/app/components/Loader";

function comingsoon() {

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

    return (
        <>
    {loading ? (
    <Loader /> 
  ) : (
        <div className="grid place-content-center place-items-center pt-20 pb-30 bg-gradient-to-b from-[#FFC30033] to-[#FFFFFF33]">

            <h3 className='font-semibold pt-20 pb-10 p-5'>In the works.</h3>
            <p className='text-center '>When you wait with us, you become a part of our journey.<br />
                And together, we can create something winsome.
            </p>
            <div className='flex gap-5 pt-20 p-5'>
                <p className='pb-36 text-[#007DD7] uppercase'>Let’s take you <Link href="/"><strong>Home</strong></Link>    </p>
                <p className='pb-36 text-[#007DD7] uppercase'>Or to our <Link href="/books"><strong>Library</strong></Link>  </p>
                <p className='pb-36 text-[#007DD7] uppercase'>Or to our <Link href="/authors"><strong>Authors’ Lounge</strong></Link>  </p>
            </div>
        </div>
        )}
        </>
    )
}

export default comingsoon
