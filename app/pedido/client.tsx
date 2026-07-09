"use client"
import dynamic from "next/dynamic"
const HomeDynamic = dynamic(() => import("./dynamic"), { ssr: false })
export default function Home() {


    return (
        <HomeDynamic />
    )
}