'use client'

import Link from "next/link";


import { Badge } from "@/components/tailgrids/core/badge";
import { Twitter, Instagram } from "@tailgrids/icons";


export default function Footer () {
    return (
        // footer container
    <div className='mt-4 text-center'>
        {/* student  */}
        <div>
            <Badge className='text-xl text-black  rounded-xl'>68086124 Phitsanupong Pimpirat</Badge>
        </div>

        {/* contact */}
        <div className='mt-4 flex justify-center gap-6 '>
           <Link href={'https://x.com/4ory0u_'} target="_blank">
            <Twitter className='text-back-400'/></Link>
            
            <div className='border-l-1'></div>
            <Instagram className='text-back-500'/>
          
            
            
        </div>
    </div>
    )
}