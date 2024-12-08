import "./NewPostForm.css"
import { useState } from "react"
import { Button, TextField } from "@mui/material"
import { PostsAPI } from "../../api/PostsAPI"

type Props = {
	handleHide: () => void
	handleRefresh: () => void
	location: {
		lat: number
		lon: number
	}
}

export function NewPostForm({ handleHide, handleRefresh, location }: Props) {
	const [message, setMessage] = useState("")

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			await PostsAPI.post({ message, lat: location.lat, lon: location.lon })
			handleRefresh()
			handleHide()
		} catch (error) {

		}
	}

	return (
		<form onSubmit={handleSubmit} className="post-form">
			<TextField
				label="Message"
				name="message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>

			<Button type="submit" variant="contained">
				Submit
			</Button>
		</form>
	)
}