"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToken } from "@/providers/token-provider"


export const ModalCrearProducto = () => {
    const { token } = useToken();
    return <>
        <Dialog>

            <DialogTrigger render={<Button variant="outline">Crear nuevo producto</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={(ev) => {
                    ev.preventDefault()
                    let form = new FormData(ev.target)

                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/productos`, {
                        method: "POST",
                        body: form,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                }}>
                    <DialogHeader>
                        <DialogTitle>Crear nuevo producto</DialogTitle>

                    </DialogHeader>
                    <FieldGroup className="mt-5">
                        <Field>
                            <Label>Nombre del producto</Label>
                            <Input name="nombre" placeholder="Ingrese el nombre del producto" />
                        </Field>
                        <Field>
                            <Label>Precio</Label>
                            <Input type="number" name="precio" placeholder="Ingrese el precio del producto" />
                        </Field>
                        <Field>
                            <Label>Stock</Label>
                            <Input type="number" name="stock" placeholder="Ingrese el stock del producto" />
                        </Field>
                        <Field>
                            <Label>Imagen</Label>
                            <Input name="imagen" type="file" />
                        </Field>

                    </FieldGroup>
                    <DialogFooter className="mt-5">
                        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    </>
}