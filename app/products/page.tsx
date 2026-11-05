"use client";

import { useContext } from "react";
import { globalDataContext } from "../layout";
import { Product } from "@/data/products";
import Image from "next/image";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin } from "@/utils/login";

export default function Page() {

  const router = useRouter()
  useEffect(() => checkLogin(router, '/products'), [router])

  const { products, setProducts, carts, setCarts } =
    useContext(globalDataContext);

  const addToCart = (product: Product) => {
    //remove product from products
    setProducts(products.filter((p: Product) => p.id !== product.id));

    //append product to carts
    setCarts([...carts, product]);
  };

  return (
    // กลับมาใช้ความกว้างเท่าเดิม (w-3xl และ mx-auto) พร้อมจำกัดความสูงและเปิด scroll เฉพาะด้านใน
    <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-[520px] overflow-y-auto border border-gray-300 p-3 rounded-lg shadow-sm">
      <div className="grid grid-cols-5 gap-3">
        {products.map((product: Product) => (
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
        className="w-full bg-emerald-50 text-emerald-700 border border-emerald-500 hover:bg-emerald-100 text-center py-2.5 rounded-b-xl rounded-t-none text-sm font-semibold cursor-pointer transition-colors block"
        onClick={() => addToCart(product)}
    >
        Add to Carts
    </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}