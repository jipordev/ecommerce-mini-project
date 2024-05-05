'use client'
import { Card } from "flowbite-react";
import {CartProductType, ProductType} from "@/lib/defination";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import {useAppDispatch} from "@/redux/hooks";
import {increment} from "@/redux/features/counter/counterSlice";
import {addToCart} from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import {useGetProductsQuery} from "@/redux/service/product";
import {useRouter} from "next/navigation";

export default function CardProduct({id, name, price,image, onClick}: CartProductType) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleAddToCart = () => {
        dispatch(increment());
        dispatch(addToCart({id, name, image, price}));
    }

    // @ts-ignore
    return (
        <Card
            className="max-w-sm h-max cursor-pointer shadow-sm-light border-[0.5px]"
            renderImage={() => (
                <Image height={1000} width={1000} alt="" src={image} className="rounded-t-md h-[210px] object-cover overflow-hidden"/>
            )}
        >
            <Link href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
            </Link>
            <div className="flex items-center justify-between">
                <span className="text-sm font-normal tracking-wider text-gray-600 dark:text-white">${price}</span>
                <span className='flex justify-center items-center'>
                    <button onClick={() => {
                        handleAddToCart()
                    }} className='font-normal rounded-lg w-max text-white text-sm px-3 py-2 bg-gray-500'>
                        <FaCartPlus/>
                    </button>
                    <button className={`ml-1 font-normal rounded-lg w-max text-white text-sm py-2 px-3 bg-gray-500`} onClick={() => router.push(`/product/${id}`)}>
                Details
            </button>
                </span>
            </div>
        </Card>
    );
}
