export type ProductType = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

export type ProductDetail = {
    id: number;
    name: string;
    price: number;
    desc:string;
    category: string;
    image: string;
}


export type CartProductType = {
    name: string;
    image: string;
    price: number;
    id: number;
    onClick?: () => void;
};