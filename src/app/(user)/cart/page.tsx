"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
    selectProducts,
    selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import {increment, decrement} from "@/redux/features/counter/counterSlice";

export default function Cart() {
    const products = useAppSelector(selectProducts);
    const totalPrice = useAppSelector(selectTotalPrice);
    const dispatch = useAppDispatch();
    return (
        <main className="w-max my-10 gap-12 grid grid-cols-2 mx-auto">
            <div>
                {products.length !== 0 &&
                    products.map((product) => (
                        <div
                            className="flex justify-between w-[400px] bg-gray-100 shadow-sm my-4 p-4 rounded-md"
                            key={product.id}
                        >
                            <div>
                                <h1>{product.name}</h1>
                                <h2 className="text-red-500 my-2">${product.price}</h2>
                                <Image
                                    width={1000}
                                    height={1000}
                                    className="h-[150px] w-auto"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>
                            <div className='flex flex-col justify-between my-5'>
                                <div>
                                    <button className='p-1 mx-2 rounded-lg hover:bg-white hover:border-[1px]'>
                                        ➕
                                    </button>
                                    <button className='p-1 rounded-lg hover:bg-white hover:border-[1px]'>
                                        ➖
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        dispatch(removeFromCart(product.id)) && dispatch(decrement());
                                    }}
                                    className="text-red-500 hover:text-white hover:bg-red-500 font-semibold text-[12px] p-2 rounded-xl"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                {products.length == 0 && <h1 className="text-6xl">Cart is Empty!</h1>}
            </div>
            <div>
                {products.length !== 0 && (
                    <div className='text-left'>
                        <h1 className="text-5xl font-semibold p-2">
                            Total of product{" "}
                            <span className="text-red-500">{products.length}</span>
                        </h1>
                        <h2 className="text-4xl my-3 p-2">
                            Total Price $ <span className=" text-red-500">{totalPrice}</span>
                        </h2>
                    </div>
                )}
            </div>
        </main>
    );
}
