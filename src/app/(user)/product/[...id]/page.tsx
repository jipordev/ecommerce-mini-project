'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetProductByIdQuery } from '@/redux/service/product';
import { ProductDetail } from '@/lib/defination';
import {any} from "prop-types";

export type ParamProps = {
    params: {
        id: number;
    };
};

function DetailPage({ params }: ParamProps) {
    const id = params.id;
    const { data:product, error, isLoading } = useGetProductByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;

    if (error) { // @ts-ignore
        return <div>Error: {error.message}</div>;
    }

    if (!product) return <div>No product found.</div>;

    return (
        <main>
            <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 container-sm mx-[20px] sm:mx-[50px] md:mx-[80px] lg:mx-[150px] my-12">
                <div className="w-[350px] mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto">
                    <Image src={product.image} className="rounded-md shadow-md" alt={product.name} width={500} height={500} />
                </div>
                <div className="p-2">
                    <h1 className="text-[24px] font-medium mb-3">{product.name}</h1>
                    <p className="">{product.desc}</p>
                    <div className="flex items-center">
                        <p className="my-4 text-xl md:text-xl lg:text-2xl font-semibold text-[#ff0000] dark:text-white">${product.price}</p>
                        <button className="ml-7 md:my-1 md:text-[12px] p-2 sm:p-3 md:p-3 rounded-lg bg-[#ff8b00] lg:px-4 lg:py-3 text-center lg:text-sm font-semibold text-white hover:bg-[#ff8c00da] focus:outline-none focus:ring-4 dark:bg-[#ff8c00] dark:hover:bg-[#ff8c00da]">
                            Add to cart
                        </button>
                    </div>

                    <p className="my-7 font-normal text-[#ff8b00] hover:underline hover:underline-offset-4">
                        <Link href="/">Back to home page</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default DetailPage;