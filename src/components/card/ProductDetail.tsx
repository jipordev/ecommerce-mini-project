import React from 'react';
import Image from "next/image";
import {FaCartPlus, FaCartShopping} from "react-icons/fa6";
import Link from "next/link";
import {ProductDetail} from "@/lib/defination";
import {increment} from "@/redux/features/counter/counterSlice";
import {addToCart} from "@/redux/features/cart/cartSlice";
import {useAppDispatch} from "@/redux/hooks";

const ProductDetailComponent = ({id, name, image, desc, price, onClick}: ProductDetail) => {

    const dispatch = useAppDispatch();
    const handleAddToCart = () => {
        dispatch(increment());
        dispatch(addToCart({id, name, image, price}));
    }

    return (
        <div  className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 container-sm mx-[20px] sm:mx-[50px] md:mx-[80px] lg:mx-[150px] my-12'>
            <div className="w-[350px] mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto">
                <Image src={image} className="rounded-md shadow-md" alt={name} width={500}
                       height={500}/>
            </div>
            <div className="p-2">
                <h1 className="text-[24px] font-medium mb-3">{name}</h1>
                <p className="">{desc}</p>
                <div className="flex items-center">
                    <p className="my-4 text-xl md:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-white">${price}</p>
                    <button onClick={() => {
                        handleAddToCart()
                    }} className='font-normal rounded-lg w-max text-white text-sm px-3 py-2 bg-gray-500'>
                        <FaCartPlus/>
                    </button>
                </div>

                <p className="my-7 font-semibold text-green-500 hover:underline hover:underline-offset-4">
                    <Link href="/">Back to home page</Link>
                </p>
            </div>
        </div>
    )
};

export default ProductDetailComponent;