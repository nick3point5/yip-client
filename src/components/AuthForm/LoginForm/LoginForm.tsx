import { useState } from "react"
import { login } from "../../../api/AuthAPI"
import { Button, TextField } from "@mui/material"

type Props = {
	handleHide: () => void
}

export function LoginForm({handleHide}: Props) {
	const [body, setBody] = useState({ username: "", password: "" })
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const response = await login(body.username, body.password)
		if (!response) return
		handleHide()
	}

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<TextField
				label="Username"
				name="username"
				value={body.username}
				onChange={(e) => setBody({ ...body, username: e.target.value })}
			/>
			<TextField
				label="Password"
				name="password"
				type="password"
				value={body.password}
				onChange={(e) => setBody({ ...body, password: e.target.value })}
			/>

			<Button type="submit" variant="contained">
				Login
			</Button>
		</form>
	)
}