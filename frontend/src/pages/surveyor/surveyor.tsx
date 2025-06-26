import { JSX, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import './surveyor.scss';
import { Employees } from "../../models/dto/employees_dto";
import { GetAssignedSurveyors } from "../../api/employees";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export function SurveyorPage() : JSX.Element {
    const [assignedSurveyors, setAssignedSurveyors] = useState<Employees[]>([]);
    const [trackedSurveyor, setTrackedSurveyor] = useState<string>("");
    const mapRef = useRef(null);


    useEffect(() => {
        GetAssignedSurveyors().then((survs : Employees[]) => setAssignedSurveyors(survs))
    }, [])


    return (
        <div className="surveyor-page" style={{display: 'flex', flexDirection: 'column', gap: '100px'}}>
            <div>
                <p>Track surveyor</p>
                <Dropdown onSelect={(eventKey, e) => {
                    setTrackedSurveyor(eventKey!)
                }}>
                    <Dropdown.Toggle
                        className="d-flex justify-content-between align-items-center custom-toggle"
                    >
                        <span>{trackedSurveyor || "Track an assigned surveyor..."}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '400px' }}>
                        {assignedSurveyors.map((surv : Employees) => <Dropdown.Item key={surv.id} eventKey={surv.name}>{surv.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="surveyor-map" style={{ width: "100%", height: "1000px" }}>
                <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                >
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            
        </div>
    )
}