"use client"
import {
    Map,
    MapDrawControl,
    MapDrawDelete,
    MapDrawEdit,
    MapDrawMarker,
    MapDrawPolygon,
    MapDrawPolyline,
    MapDrawUndo,
    MapPolyline,
    MapSearchControl,
    MapTileLayer,
    MapZoomControl,
    useLeaflet,
} from "@/components/ui/map"
import type { LatLngExpression } from "leaflet"
import L from "leaflet"
import { useEffect, useRef, useState } from "react"
import { useMap } from "react-leaflet/hooks"
import { MapRef } from "react-leaflet/MapContainer"
import { toast } from "sonner"

export default function HomeDynamic() {
    const TORONTO_COORDINATES = [-16.487174093465693, -68.13116567145823] satisfies LatLngExpression
    const [coordinates, setCoordinates] = useState<LatLngExpression>(TORONTO_COORDINATES)
    const [start, setStart] = useState<LatLngExpression[]>([]);
    const [end, setEnd] = useState<LatLngExpression[]>([]);
    const ref = useRef<MapRef | null>(null);
    const [points, setPoints] = useState<LatLngExpression[]>([])
    useEffect(() => {
        ref.current?.flyTo(coordinates, 20);
    }, [coordinates])
    useEffect(() => {
        if (start.length === 0 || end.length === 0) return

        const inicio = start[0] as L.LatLng
        const fin = end[0] as L.LatLng

        fetch(
            `https://router.project-osrm.org/route/v1/driving/${inicio.lng},${inicio.lat};${fin.lng},${fin.lat}?overview=full&geometries=geojson`
        )
            .then((res) => res.json())
            .then((data) => {
                const ruta = data.routes[0].geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                )

                setPoints(ruta)
            })
    }, [start, end])
    return (
        <Map ref={ref} center={coordinates}>
            <MapTileLayer />
            <MapDrawControl onLayersChange={(layers) => {
                layers.eachLayer((layer) => {
                    if (
                        layer instanceof L.Marker
                    ) {
                        const newPoint = layer.getLatLng();
                        if (start.length === 0) {
                            setStart([newPoint]);
                        } else if (start.length === 1) {
                            setEnd([newPoint]);
                        }
                    }
                })
            }}>
                <MapDrawMarker />
                <MapDrawEdit />
                <MapDrawDelete />
                <MapDrawUndo />
            </MapDrawControl>
            <MapPolyline positions={points} />
            <MapSearchControl

                onPlaceSelect={(place) => {
                    setCoordinates([place.geometry.coordinates[1], place.geometry.coordinates[0]])
                    toast.info(`Nuevas coordenadas ${coordinates}`)
                }} />

        </Map>
    )
}
