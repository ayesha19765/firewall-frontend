import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = L.icon({
	iconUrl: "./location-dot-solid.svg", // Replace with your custom image path
	iconSize: [30, 50], // Adjust icon size
	iconAnchor: [15, 50], // Position of the icon's anchor
	popupAnchor: [0, -40], // Position of the popup relative to the icon

	shadowSize: [50, 50], // Adjust shadow size
});

const MapComponent = ({ coordinates }) => {
	const defaultCenter = { lat: 23.0225, lng: 72.5714 }; // Fallback center
	// console.log(coordinates);

	return (
		<MapContainer
			center={[defaultCenter.lat, defaultCenter.lng]}
			zoom={10}
			className='-z-10 flex justify-center items-center'
			style={{ height: "45vh", width: "full" }}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>

			{/* Loop through coordinates and add markers */}
			{coordinates.map((coord, index) =>
				coord.lat && coord.lng ? (
					<Marker
						key={coord.lat}
						position={[coord.lat, coord.lng]}
						icon={customIcon}>
						<Popup>{coord.label || "No label provided"}</Popup>
					</Marker>
				) : null
			)}
		</MapContainer>
	);
};

export default MapComponent;
