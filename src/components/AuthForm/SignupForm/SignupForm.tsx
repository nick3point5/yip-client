import { useState } from "react"
import { signup } from "../../../api/AuthAPI"
import { Button, TextField } from "@mui/material"

type Props = {
	handleHide: () => void
}

export function SignupForm({handleHide}: Props) {
	const [body, setBody] = useState({ username: "", password: "", confirmPassword: "" })
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if(body.password !== body.confirmPassword) return
		const response = await signup(body.username, body.password)
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
			<TextField
				label="Confirm Password"
				name="confirmPassword"
				type="password"
				value={body.confirmPassword}
				error={body.password !== body.confirmPassword}
				onChange={(e) => setBody({ ...body, confirmPassword: e.target.value })}
			/>

			<Button type="submit" variant="contained">
				Signup
			</Button>
		</form>
	)
}