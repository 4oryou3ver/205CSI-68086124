"use client";
import "./globals.css";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import Header from "@/components/Header"; // <--- นำเข้า Header กลับมา
import Footer from "@/components/Footer";
import { fetchProducts, Product } from "@/data/products";
import { createContext, useEffect, useState } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";
import { Credential } from "@/data/credential";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  
  const [userInfo, setUserInfo] = useState<Credential | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const credentialString = localStorage.getItem('credential');
    if (credentialString) {
      try {
        const credential: Credential = JSON.parse(credentialString);
        setUserInfo(credential);
        setRole(credential.role);
      } catch (e) {
        setUserInfo(null);
        setRole(null);
      }
    } else {
      setUserInfo(null);
      setRole(null);
    }
  }, [pathname]);

  useEffect(()=> {
    fetchProducts()
    .then((data) => setProducts(data as Product[]))
    .catch((error) => setProducts([] as Product[]))
  }, [])

  const hanleLogout = () => {
    doLogout(router, '/login')
  }

  return (
    <globalDataContext.Provider value={{ products, setProducts, carts, setCarts }} >
    <html>
      <body>
        {/* เรียกใช้ Header (โลโก้ C-S-I-2-0-5 และ Front End Software Development) กลับมา */}
        <Header />

        {/* ส่วนแสดงข้อมูล ROLE, NAME, EMAIL */}
        <div className="flex justify-center items-center gap-6 my-3 text-sm text-black">
          <div>
            <span className="font-bold mr-1">ROLE:</span> 
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-semibold uppercase">
              {userInfo?.role || 'GUEST'}
            </span>
          </div>
          <div>
            <span className="font-bold mr-1">NAME:</span> 
            <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
              {userInfo?.name || 'Not logged in'}
            </span>
          </div>
          <div>
            <span className="font-bold mr-1">EMAIL:</span> 
            <span className="px-3 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {userInfo?.email || '-'}
            </span>
          </div>
        </div>

        {/* แถบเมนูปุ่มนำทาง */}
        <nav className="flex justify-center gap-3 mt-2 items-center">
         <Link href={"/"} 
         className={buttonStyles({
            appearance:pathname === "/" ? "fill" : "outline",
              variant:"primary",
              size:"sm",
         })}>
             HOME
         </Link>
         
         {role !== 'admin' && (
           <>
             <Link href={"/animation"} className={buttonStyles({
               appearance:pathname === "/animation" ? "fill" : "outline",
                 variant:"primary",
                 size:"sm",
             })}>
                 Animation
             </Link>
             <Link href={"/calculator"} className={buttonStyles({
               appearance:pathname === "/calculator" ? "fill" : "outline",
                 variant:"primary",
                 size:"sm",
             })}>
                 Calculator
             </Link>
           </>
         )}

         {role !== 'manager' && (
           <Link href={"/todos"} className={buttonStyles({
             appearance:pathname === "/todos" ? "fill" : "outline",
               variant:"primary",
               size:"sm",
           })}>
               Todos
           </Link>
         )}
        <div className="relative">
         <Link href={"/products"} className={buttonStyles({
           appearance:pathname === "/products" ? "fill" : "outline",
             variant:"primary",
             size:"sm",
         })}>
             Products
         </Link>
         <Badge size="sm" 
           className="absolute -top-2 -right-2 bg-blue-600 text-white">
             {products.length}
           </Badge>
         </div>
         <div className="relative">
           <Link href={"/carts"} className={buttonStyles({
             appearance:pathname === "/carts" ? "fill" : "outline",
               variant:"primary",
               size:"sm",
           })}>
               Carts
           </Link>
           <Badge size="sm" 
           className="absolute -top-2 -right-2 bg-red-500 text-white">
             {carts.length}
           </Badge>
         </div>

         <Button 
         appearance='outline'
         variant='danger'
         size='sm'
         className='ml-1'
         onClick={() => hanleLogout()}
         >Logout</Button>
        </nav>

        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </globalDataContext.Provider>
  );
}