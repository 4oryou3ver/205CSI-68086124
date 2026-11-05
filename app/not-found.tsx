'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin } from "@/utils/login";

export default function Notfound(){
   const router = useRouter()
       useEffect(() => checkLogin(router, '/'),[router]) 
}