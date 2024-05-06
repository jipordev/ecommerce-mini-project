"use client";

import {Navbar, NavbarCollapse, NavbarLink} from "flowbite-react";
import ButtonLogin from "@/components/button/ButtonLogin";
import Image from "next/image";
import {useAppSelector} from "@/redux/hooks";
import {useRouter} from "next/navigation";
import {MenuList} from "./menu";
import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

type MenuItem = {
    name:string;
    path: string;
    active: boolean;
}

export default function NavbarComponent() {

    const router = useRouter()
    const [menu, setMenu] = useState<MenuItem[]>(MenuList);
    const pathname = usePathname();
    const cart = useAppSelector((state) => state.cart.products);
    let cartLength = cart?.length;

    const isLoggedIn = true;

    return (
        <Navbar className='bg-[whitesmoke]' >
            <Navbar.Brand href="">
                <Image width={1000} height={1000} src="https://store.istad.co/media/icon_images/favicon.ico" className="w-[50px] h-[50px] mr-3 rounded-[50%]" alt="" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Chh1p</span>
            </Navbar.Brand>
            <div className="flex justify-center items-center md:order-2">
                <button onClick={() => router.push("/cart")} className='font-normal mr-2 rounded-lg w-max text-green-600 text-3xl px-3 py-2 relative'>
                    🛒
                    {<sup
                        className="bg-red-500 text-white rounded-full w-5 h-5 text-xs absolute -top-1 -right-1">{cartLength}</sup>}
                </button>
                <ButtonLogin/>
                <Navbar.Toggle/>
            </div>
            <NavbarCollapse>
                {menu.map((item, index) => (
                    <NavbarLink
                        key={index}
                        as={Link}
                        href={item.path}
                        active={item.path === pathname}
                    >
                        {item.name}
                    </NavbarLink>
                ))}
            </NavbarCollapse>
        </Navbar>
    );
}
