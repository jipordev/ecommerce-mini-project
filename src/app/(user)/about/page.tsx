import React from 'react';
import About from '@/components/card/AboutCard'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "AboutUs",
    description: "This is about us page",
    keywords: ['shop', 'ecommerce', 'sell']
};
function AboutUs() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-10">
            <h1>
                <About/>
            </h1>
        </main>
    );
}

export default AboutUs;