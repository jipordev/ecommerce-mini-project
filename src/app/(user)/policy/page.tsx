// pages/policy.js

import PolicyCard from "@/components/card/PolicyCardComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Policy",
    description: "This is policy page",
    keywords: ['shop', 'ecommerce', 'sell']
};

const PolicyPage = () => {
    return (
        <main className="h-screen bg-whitesmoke gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center container-sm mx-auto">
            <PolicyCard
                title="Terms of Service"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero at felis tempus tempor. Fusce in enim magna."
            />

            {/* Add more PolicyCard components as needed */}
            <PolicyCard
                title="Refund Policy"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero at felis tempus tempor. Fusce in enim magna."
            />
            <PolicyCard
                title="Shipping Policy"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero at felis tempus tempor. Fusce in enim magna."
            />
        </main>
    );
};

export default PolicyPage;