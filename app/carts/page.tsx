'use client'

import { useContext } from "react"
import { globalDataContext } from "../layout"
import { Product } from "@/data/products"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin } from "@/utils/login";

export default function CartPage() {
  const router = useRouter()
    useEffect(() => checkLogin(router, '/carts'),[router])

    const { products, setProducts, carts, setCarts } = useContext(globalDataContext)

    // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า และคืนสินค้ากลับไปที่หน้า Product
    const removeFromCart = (product: Product) => {
        // ลบออกจาก carts
        setCarts(carts.filter((p: Product) => p.id !== product.id))
        // คืนกลับไปที่ products
        setProducts([...products, product])
    }

    // คำนวณราคารวมทั้งหมด
    const totalPrice = carts.reduce((sum: number, p: Product) => sum + p.price, 0)

    return (
        <div className="mt-4 bg-cyan-50 w-3xl mx-auto p-3 border border-gray-300 rounded-lg">
            {/* ตารางแสดงรายการสินค้าในตะกร้า */}
            <div className="grid grid-cols-5 gap-3 max-h-96 overflow-y-auto p-1">
                {carts.map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col shadow-sm"
                    >
                        <div className="relative w-full h-32">
                            <Image
                                src={product.thumbnailUrl}
                                alt="image"
                                fill
                                className="object-cover rounded-t-xl"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-2 py-1 line-clamp-2">
                                {product.title}
                            </div>
                            <div className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                                ${product.price}
                            </div>
                        </div>
                        <div className="w-full bg-white px-0 pb-0">
                            <button
                                type="button"
                                className="w-full bg-red-50 text-red-600 border border-red-500 hover:bg-red-100 text-center py-2.5 rounded-b-xl rounded-t-none text-sm font-semibold cursor-pointer transition-colors block"
                                onClick={() => removeFromCart(product)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* แถบสรุปจำนวนสินค้าและราคารวมด้านล่าง */}
            <div className="mt-4 pt-3 border-t border-gray-300 flex justify-center items-center gap-4">
                <div className="bg-amber-400 text-white text-sm font-bold px-6 py-2 rounded-full shadow-md">
                    Count: {carts.length} items
                </div>
                <div className="bg-rose-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-md">
                    Price: ${totalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    )
}