'use client'
import React from 'react';
import Image from "next/image";
import {addToCart, removeFromCart, increment, decrement} from "@/redux/features/cart/cartSlice";
import {CartProductType, ProductType} from "@/lib/defination";
import {useAppSelector, useAppDispatch} from "@/redux/hooks";
import {useGetProductsQuery} from "@/redux/service/product";
// import {generators} from "openid-client";
import {useState} from "react";

const CartProduct = ({id, name, price, image}:CartProductType) => {
    const dispatch = useAppDispatch();

    const products = useAppSelector((state) => state.cart.products);
    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };
    let [quantity, setQuantity] = useState(1);

    const handleIncrement = (id: number) => {
        setQuantity((quantity)=>  quantity + 1);

        dispatch(increment(id));
    };

    const handleDecrement = (id: number) => {
        if (quantity > 1) { // Ensure quantity doesn't go below 1
            setQuantity((quantity) => quantity - 1); // Update quantity state

            dispatch(decrement(id)); // Dispatch decrement action with product id
        } else {
            // If quantity is 1, remove the product from the cart
            handleRemoveFromCart(id);
        }
    };

    return (
        <div
            className="flex justify-between w-[400px] bg-gray-100 shadow-sm my-4 p-4 rounded-md"
            key={id}
        >
            <div>
                <h1>{name}</h1>
                <h2 className="text-red-500 my-2">${price}</h2>
                <Image
                    width={1000}
                    height={1000}
                    className="h-[150px] w-auto"
                    src={image}
                    alt={name}
                />
            </div>
            <div className='flex flex-col justify-between my-5'>
                    <button className='p-1 mx-2 rounded-lg hover:bg-white hover:border-[1px]'
                            onClick={()=> {handleIncrement(id)}}
                    >
                        +
                    </button>
                    <p>
                        {quantity}
                    </p>
                    <button className='p-1 rounded-lg hover:bg-white hover:border-[1px]'
                            onClick={()=> {handleDecrement(id)}}
                    >
                        -
                    </button>
                <button
                    onClick={() => {
                        handleRemoveFromCart(id)
                    }}
                    className="text-red-500 hover:text-white hover:bg-red-500 font-semibold text-[12px] p-2 rounded-xl"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartProduct;