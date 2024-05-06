import React from 'react';
import Image from "next/image";

export default function About(){
    return(
        <>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div>
                <Image width={400} height={400} src="https://i.pinimg.com/564x/a7/11/04/a711048f2d124ee4c69b36b6931d4846.jpg" alt="png"></Image>
            </div>
            <div className="flex-row justify-center text-xl mt-10 mb-3">
                <p>Our journey began with a simple idea: to curate a collection of products that inspire, empower, and
                    enhance everyday lives. What started as a vision has now evolved into a thriving platform,
                    connecting customers with the finest selection of goods from around the globe.</p>

                <div className="my-5">
                    <p>
                        What sets us apart? our unwavering commitment to excellence in every aspect of what we do. From
                        meticulously handpicking each item to ensuring seamless transactions and exceptional customer
                        service, we strive to exceed your expectations at every turn. we are a team of dedicated
                        individuals
                        who are passionate about what we do. Behind every product and every purchase, there is a story
                        waiting to be told. Whether it is the artisan crafting a masterpiece or the small business owner
                        chasing their dreams, we take pride in supporting creators and entrepreneurs from all walks of
                        life.
                    </p>
                </div>

                <div className="my-5">
                    <p>
                        As we continue to grow and evolve, our mission remains the same: to inspire, empower, and enrich
                        the
                        lives of our customers, one exceptional product at a time. Thank you for choosing, we are
                        honored to
                        be a part of your journey.
                    </p>
                </div>

                <div>
                    <p>
                        Join us, and explore the extraordinary together.
                    </p>
                </div>

            </div>
        </div>
        </>
    )
}