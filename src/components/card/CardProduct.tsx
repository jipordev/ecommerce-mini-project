import { Card } from "flowbite-react";
import {ProductType} from "@/lib/defination";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {increment} from "@/redux/features/counter/counterSlice";

export default function CardProduct({id, name, price,image}: ProductType) {

    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

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
                    <button onClick={() => dispatch(increment())} className='font-normal rounded-lg w-max text-white text-lg px-3 py-2 bg-green-500'>
                        <FaCartPlus />
                    </button>
                </span>
            </div>

        </Card>
    );
}
