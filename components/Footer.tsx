'use client'

import Link from "next/link";


import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Instagram } from "@tailgrids/icons";


export default function Footer () {
    return (
        // footer container
    <div className='mt-4 text-center'>
        {/* student  */}
        <div>
            <Badge className='text-xl text-black  rounded-xl'>68086220 ฉัตรชัย บุญช่วย</Badge>
        </div>

        {/* contact */}
        <div className='mt-4 flex justify-center gap-6 '>
           <Link href={'https://www.facebook.com/chaichai.boonschuay.7'} target="_blank">
            <Facebook className='text-blue-700'/></Link>
            
            <div className='border-l-1'></div>
            <Instagram className='text-pink-500'/>
          
            
            
        </div>
    </div>
    )
}