import { LayersControl, MapContainer, Marker, Popup, TileLayer, Circle, LayerGroup, FeatureGroup, Rectangle } from 'react-leaflet'
import "./Map.css"
import { LatLngExpression } from 'leaflet'
import { PostsAPI } from '../../api/PostsAPI'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'


type Props = {
	location: {
		lat: number
		lon: number
	}
}

type PostType = {
	id: number
	message: string
	username: string
	lat: number
	lon: number
	createdAt: string
}

export function Map({ location }: Props) {
	const [posts, setPosts] = useState<PostType[]>([])
	const { lat, lon } = location
	const center = [lat, lon] as LatLngExpression
	const radiusKm = 5

	async function fetchPosts() {
		const response: PostType[] = await PostsAPI.get(`/q?lat=${lat}&lon=${lon}&distance=${radiusKm}&sortBy=distance`)
		if (!response) return
		setPosts(response)
	}

	useEffect(() => {
		fetchPosts()
	}, [location])

	return (
		<MapContainer center={center} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LayersControl position="topright">
				<LayersControl.Overlay checked name="Posts">
					<LayerGroup>
						{posts.map((post) => (
							<PostMarker key={post.id} post={post} />
						))}
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay checked name="Post radius">
					<LayerGroup>
						<Circle
							center={center}
							pathOptions={{ fillColor: "blue" }}
							radius={radiusKm * 1000}
						/>
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
		</MapContainer>
	)
}

export function PostMarker({ post }: { post: PostType }) {
	const { lat, lon } = post

	return (
		<Marker position={[lat, lon]}>
			<Popup>
				<Typography variant='h4'>{post.message}</Typography>
				<Typography variant='subtitle2'>{post.createdAt}</Typography>
				<Typography variant='subtitle2'>{post.username}</Typography>
			</Popup>
		</Marker>
	)
}
