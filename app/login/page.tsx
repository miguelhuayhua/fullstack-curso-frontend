"use client"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
const PaginaLogin = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Login</h1>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(ev) => {
                        ev.preventDefault()
                        const datos = new FormData(ev.target)

                        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/signin`, {
                            method: "POST",
                            body: JSON.stringify({ email: datos.get('email'), password: datos.get('password') }),
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        }).then(async res => {
                            const data = await res.json();
                            if (data.estado == 200) {
                                toast.success(data.mensaje)
                                router.push("/dashboard")
                            } else {
                                toast.error(data.mensaje)
                            }
                        })

                    }} >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Login
                        </Button>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}



export default PaginaLogin;