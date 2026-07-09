"use client"
import { Button } from "@/components/ui/button";
import ProductoComponent from "./producto";
import { useState } from "react";
import { useEffect } from "react";
import { useToken } from "@/providers/token-provider";
interface producto {
    nombre: string
    precio: number
    descuento: boolean
    descripcion: string
    imagen?: string
}

const Catalogo = ({ producto }: { producto: producto }) => {

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/prueba`, {
            method: "GET"

        }).then(async (res) => {
            const data = await res.json();
            console.log(data)
        })

    }, [])


    return (
        <div>
            <h1 className="text-sky-500 font-bold">
                Catalogo
            </h1>


        </div>
    )
}

export default Catalogo;