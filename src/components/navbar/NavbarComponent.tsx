"use client";

import { Navbar } from "flowbite-react";
import ButtonLogin from "@/components/button/ButtonLogin";
import Image from "next/image";
import {useAppSelector} from "@/redux/hooks";
import {FaCartPlus, FaCartShopping} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {increment} from "@/redux/features/counter/counterSlice";


export default function NavbarComponent() {

    const count = useAppSelector((state) => state.counter.value);
    const router = useRouter()

    return (
        <Navbar className='bg-[whitesmoke]' >
            <Navbar.Brand href="">
                <Image width={1000} height={1000} src="https://store.istad.co/media/icon_images/favicon.ico" className="w-[50px] h-[50px] mr-3 rounded-[50%]" alt="" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Chh1p</span>
            </Navbar.Brand>
            <div className="flex  md:order-2">
                <button onClick={() => router.push("/cart")} className='font-normal mr-2 rounded-lg w-max text-green-600 text-3xl px-3 py-2 relative'>
                    <FaCartShopping/>
                    {count > 0 && <sup
                        className="bg-red-500 text-white rounded-full w-5 h-5 text-xs absolute -top-1 -right-1">{count}</sup>}
                </button>
                <ButtonLogin/>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/">
                    Home
                </Navbar.Link>
                <Navbar.Link className='' href="/about">About Us</Navbar.Link>
                <Navbar.Link href="/policy">Policy</Navbar.Link>
                <Navbar.Link href="/myshop">My Shop</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
