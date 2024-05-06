// components/PolicyCard.js

import {PolicyType} from "@/lib/defination";

const PolicyCard = ({ title, description }: PolicyType) => {
    return (
        <div className="container mx-auto max-w-sm py-5 px-8 bg-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default PolicyCard;
