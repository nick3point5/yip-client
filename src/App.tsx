import { useEffect, useState } from 'react'
import './App.css'
import { Map } from './components/Map/Map'
import { NewFormButton } from './components/NewFormButton'
import { ModalWrapper } from './components/ModalWrapper'
import { NewPostForm } from './components/NewPostForm/NewPostForm'
import { API } from './api/API.ts'
import { AuthForm } from './components/AuthForm/AuthForm.tsx'
import { NavBar } from './components/NavBar/NavBar.tsx'

type LocationType = {
	lat: number
	lon: number
}
function App() {
	const [location, setLocation] = useState<LocationType | null>(null)
	const [showForm, setShowForm] = useState(false)
	const [refresh, setRefresh] = useState(true)
	const isLoggedIn = !!API.getToken()

	function getLocation() {
		console.log("Getting location...")
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				})
			})
		}
	}

	useEffect(() => {
		if (refresh) {
			getLocation()
			setRefresh(false)
		}
	}, [refresh, setRefresh])

	function handleRefresh() {
		setRefresh(true)
	}

	function handleShow() {
		setShowForm(true)
	}

	function handleHide() {
		setShowForm(false)
	}

	function handleLogout() {
		API.removeToken()
		setShowForm(false)
	}


	if (!location) {
		return <div>Loading...</div>
	}

	console.log(isLoggedIn)
	return (
		<>
			<NavBar handleShow={handleShow} logout={handleLogout} />
			<main>
				<ModalWrapper openState={[showForm, setShowForm]} >
					{!isLoggedIn
						? <AuthForm handleHide={handleHide} />
						: <NewPostForm handleHide={handleHide} handleRefresh={handleRefresh} location={location} />}
				</ModalWrapper>
				<Map location={location} />
				<NewFormButton handleClick={handleShow} />
			</main>
		</>
	)
}

export default App
