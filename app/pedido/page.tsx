import { Metadata } from "next"
import Home from "./client"

export const metadata: Metadata = {
    title: "Pagina de pedido",
    description: "Pagina de pedido"

}

export default function Page() {

    return (
        <>
            <Home />
        </>
    )
}