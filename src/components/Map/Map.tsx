import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "./Map.css"
import { LatLngExpression } from 'leaflet'


type Props = {
	center: LatLngExpression
	zoom: number
}

export function Map() {
	const defaultProps: Props = {
    center: [40.02193803805596, -75.16753065794771],
    zoom: 14
  }

  return (
		<MapContainer center={defaultProps.center} zoom={defaultProps.zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultProps.center}>
        <Popup>
          This is a popup
        </Popup>
      </Marker>
    </MapContainer>
  )
}
