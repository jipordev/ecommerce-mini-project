import React from 'react';
import Image from "next/image";


const HeroComponent = () => {
    return (
        <section className='container mx-auto w-max grid grid-cols-2'>
            <div className='w-[400px] h-auto'>
                <Image className='rounded-xl' width={350} height={400} src="https://store.istad.co/media/brand_images/hero1.jpg" alt=""/>
            </div>
            <div className='w-[600px] bg-yellow-100'>
                fs
            </div>
        </section>
    );
};

export default HeroComponent;