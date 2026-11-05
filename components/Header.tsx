'use client'

import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
    return (
        // header container
        <div className='mt-4 text-center'>
            {/* code badges */}
            <div className='flex justify-center items-center gap-3.5'>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-red-500 text-white font-bold -rotate-6 shadow-md'>
                    C
                </Badge>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-green-600 text-white font-bold rotate-3 shadow-md'>
                    S
                </Badge>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-blue-600 text-white font-bold -rotate-3 shadow-md'>
                    I
                </Badge>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-cyan-400 text-white font-bold rotate-6 shadow-md'>
                    2
                </Badge>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-amber-400 text-white font-bold -rotate-3 shadow-md'>
                    0
                </Badge>
                <Badge className='text-3xl rounded-xl py-3 px-5 bg-slate-600 text-white font-bold rotate-3 shadow-md'>
                    5
                </Badge>
            </div>

            {/* name */}
            <div className='mt-5 flex justify-center'>
                <Badge className='bg-black text-white text-base md:text-lg font-bold tracking-wider py-2 px-6 rounded-lg shadow-md'>
                    FRONT END SOFTWARE DEVELOPMENT
                </Badge>
            </div>
        </div>
    )
}