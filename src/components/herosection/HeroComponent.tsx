import React from 'react'
import Image from "next/image";

export default function HeroSectionComponent() {
    return (
        <section className="container-sm mx-5 md:mx-[100px] grid sm:grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex flex-col justify-evenly gap-4 m-auto">
                <h3 className='mb-3 text-gray-600 text-lg sm:text-xl md:text-xl lg:text-2xl font-normal'>Life is short, please buy my products</h3>
                <h2 className="text-gray-700 text-2xl sm:text-3xl md:text-4xl font-bold pb-2 leading-normal">Welcome to Chh1p Shop</h2>
                <p className={`text-sm text-gray-600`}>From blossoming flowers to refreshing scents, Chh1p Shop brings you the finest selection of seasonal delights. Whether you are looking to brighten up your home or refresh your wardrobe, our handpicked items capture the essence of springtime beauty. Experience the joy of the season with Spring Shop today.</p>
                <button className='rounded-xl font-light text-[14px] mr-auto my-5 px-6 py-1 border-[1px] w-max border-green-500 hover:bg-green-500 hover:text-white'>View more</button>
            </div>
            <div className="m-auto">
                <Image className='rounded-xl' width={350} height={400} src="https://store.istad.co/media/brand_images/hero1.jpg" alt=""/>
            </div>
        </section>
    )
}
