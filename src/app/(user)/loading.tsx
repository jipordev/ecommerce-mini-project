"use client";

import { Spinner } from "flowbite-react";
import {black} from "next/dist/lib/picocolors";

export default function Loading() {
    return (
        <div className={`grid h-screen place-content-center`}>
            <Spinner color={'black'} size={"xl"} aria-label="Default status example"/>
        </div>
    );
}
