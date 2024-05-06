import React from 'react';
import About from '@/components/card/AboutCard'

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