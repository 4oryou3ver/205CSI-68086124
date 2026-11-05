"use client";
import "./globals.css";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button, buttonStyles } from "@/components/tailgrids/core/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProducts, Product } from "@/data/products";
import { createContext, useEffect, useState } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";
import { Credential } from "@/data/credential"; // นำเข้า Credential Type

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [role, setRole] = useState<string | null>(null); // State สำหรับเก็บ role ผู้ใช้งาน

  // ดึง role จาก localStorage เมื่อเปิดหน้าเว็บหรือเปลี่ยนเส้นทาง
  useEffect(() => {
    const credentialString = localStorage.getItem('credential');
    if (credentialString) {
      try {
        const credential: Credential = JSON.parse(credentialString);
        setRole(credential.role); // กำหนดค่า role เช่น 'admin', 'manager', 'user'
      } catch (e) {
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [pathname]);

  useEffect(()=> {
    fetchProducts()
    .then((data) => setProducts(data as Product[]))
    .catch((error) => setProducts([] as Product[]))
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  const hanleLogout = () => {
    doLogout(router, '/login')
  }

  return (
    <globalDataContext.Provider value={{ products, setProducts, carts, setCarts }} >
    <html>
      <body>
        <Header />
        <nav className="flex justify-center gap-3 mt-4 items-center">
         
         <Link href={"/"} 
         className={buttonStyles({
            appearance:pathname === "/" ? "fill" : "outline",
              variant:"primary",
              size:"sm",
         })}>
             HOME
         </Link>
         
         {/* Admin: จะไม่เห็น Animation และ Calculator */}
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

         {/* Manager: จะไม่เห็น Todos */}
         {role !== 'manager' && (
           <Link href={"/todos"} className={buttonStyles({
             appearance:pathname === "/todos" ? "fill" : "outline",
               variant:"primary",
               size:"sm",
           })}>
               Todos
           </Link>
         )}

         <Link href={"/products"} className={buttonStyles({
           appearance:pathname === "/products" ? "fill" : "outline",
             variant:"primary",
             size:"sm",
         })}>
             Products
         </Link>
         
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