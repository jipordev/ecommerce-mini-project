import { Card } from "flowbite-react";
import {CartProductType, ProductType} from "@/lib/defination";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import {useAppDispatch} from "@/redux/hooks";
import {increment} from "@/redux/features/counter/counterSlice";
import {addToCart} from "@/redux/features/cart/cartSlice";

export default function CardProduct({id, name, price,image, onClick}: CartProductType) {

    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(increment());
        dispatch(addToCart({id, name, image, price}));
    }

    // @ts-ignore
    return (
        <Card
            className="max-w-sm h-max cursor-pointer shadow-sm-light border-[0.5px]"
            renderImage={() => (
                <Image height={1000} width={1000} alt="" src={image} className="h-[210px] object-cover overflow-hidden"/>
            )}
        >
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
            </a>
            <div className="flex items-center justify-between">
                <span className="text-sm font-normal tracking-wider text-gray-900 dark:text-white">${price}</span>
                <span className='flex justify-center items-center'>
                    <button onClick={() => {handleAddToCart()}} className='font-normal rounded-lg w-max text-white text-lg px-3 py-2 bg-green-500'>
                        <FaCartPlus />
                    </button>
                </span>
            </div>

        </Card>
    );
}
