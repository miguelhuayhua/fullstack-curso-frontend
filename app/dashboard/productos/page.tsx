"use client"
import { useToken } from "@/providers/token-provider"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { ModalCrearProducto } from "./crear"
import { Button } from "@/components/ui/button"
import { ModalModificarProducto } from "./modificar"


interface Producto {
    id: string
    nombre: string
    codigo_barra: string
    imagen: string
    precio: number
    stock: number
    fecha_vencimiento: string
    requiere_receta: boolean
    activo: boolean
    creado_en: string
    proveedor: any
    marca: any
    detalle_ventas: any[]

}


export default function PageProductos() {

    const { loading, token } = useToken();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [open, setOpen] = useState(false);
    const router = useRouter()
    useEffect(() => {
        if (token) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/productos`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(async (res) => {
                const body = await res.json();
                setProductos(body);
            })
        }
    }, [token])

    if (loading) return "cargando"
    if (!token) {
        router.push("/login")
    }
    return (
        <div className="container mx-auto my-20">
            <h1 className="text-3xl mb-5">Productos</h1>
            <ModalCrearProducto />
            {
                producto && (<ModalModificarProducto setOpen={setOpen} open={open} producto={producto} />)
            }
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Producto</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.id}>
                            <TableCell className="font-medium">
                                <img
                                    width={100}
                                    height={100}
                                    alt="producto"
                                    src={process.env.NEXT_PUBLIC_BACKEND_URL + producto.imagen} />
                                {producto.nombre}</TableCell>
                            <TableCell>{producto.precio}</TableCell>
                            <TableCell>{producto.stock}</TableCell>
                            <TableCell>
                                <Button onClick={() => {
                                    setProducto(producto);
                                    setOpen(true)
                                }}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>
        </div>
    )
}