import "./AuthForm.css"
import { useState } from "react"
import { LoginForm } from "./LoginForm/LoginForm"
import { SignupForm } from "./SignupForm/SignupForm"
import { Button } from "@mui/material"


type Props = {
	handleHide: () => void
}

export function AuthForm({ handleHide }: Props) {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className="auth-form">
			{isLogin ? (
				<LoginForm handleHide={handleHide} />
			) : (
				<SignupForm handleHide={handleHide} />
			)}
			<Button variant="text" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</Button>
		</div>
	)
}