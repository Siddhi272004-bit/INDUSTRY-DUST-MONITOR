import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import axios from "axios";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_POSITION = [51.505, -0.09];

function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  return null;
}

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [airQuality, setAirQuality] = useState(null);
  const [pollutants, setPollutants] = useState({});

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      );
      if (res.data.length > 0) {
        const lat = parseFloat(res.data[0].lat);
        const lon = parseFloat(res.data[0].lon);
        setPosition([lat, lon]);
        fetchAirQuality(lat, lon);
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const apiKey = "6f0d396f584163675485322c2ac8ad45";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = res.data;
      const aqi = data.list[0].main.aqi;
      const components = data.list[0].components;
      setAirQuality(aqi);
      setPollutants(components);
    } catch (err) {
      console.error("Error fetching AQI:", err);
    }
  };

  const getAQIText = (aqi) => {
    switch (aqi) {
      case 1: return { text: "Good", color: "success" };
      case 2: return { text: "Moderate", color: "warning" };
      case 3: return { text: "Unhealthy", color: "danger" };
      case 4: return { text: "Very Unhealthy", color: "dark" };
      case 5: return { text: "Hazardous", color: "secondary" };
      default: return { text: "Unknown", color: "light" };
    }
  };

  const fetchLiveLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setPosition([lat, lon]);
        setSearchTerm("Your Location");
        fetchAirQuality(lat, lon);
      },
      (error) => {
        console.error("Geolocation error:", error); // 👈 more helpful
        alert("Error getting location: " + error.message);
      }
    );
    } else {
     alert("Geolocation is not supported by this browser.");
    }
  };


  const aqiInfo = getAQIText(airQuality);

  const getGradientColor = (quality) => {
  switch (quality) {
    case "Good":
      return "linear-gradient(135deg, #00b09b, #00b09b77)";
    case "Moderate":
      return "linear-gradient(135deg, #ff9a00, #ff9a0077)";
    case "Unhealthy":
      return "linear-gradient(135deg, #ff4757, #ff475777)";
    case "Very Unhealthy":
      return "linear-gradient(135deg, #8b0000, #8b000077)";
    case "Hazardous":
      return "linear-gradient(135deg, #800080, #80008077)";
    default:
      return "linear-gradient(135deg, #333, #333)";
  }
};


  return (
    <Container className="text-center my-4">
      {/* First Row: Map + AQI Summary */}
      <Row className="justify-content-center mb-3">
        <Col md={8} className="mx-1 my-1">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} className="text-light">
            <Card.Header>Air Quality Map</Card.Header>
            <Card.Body>
              <Form className="mb-3 d-flex justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Enter a location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2 me-2"
                />
                <Button variant="primary" className="me-2 mb-2" onClick={handleSearch}>
                  Search
                </Button>
                <Button variant="success" className="mb-2" onClick={fetchLiveLocation}>
                  Use My Location
                </Button>
              </Form>
              <MapContainer center={DEFAULT_POSITION} zoom={13} style={{ height: "300px" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToLocation position={position} />
                <Marker position={position}>
                  <Popup>
                    Location: {searchTerm || "Default"} <br />
                    AQI: {aqiInfo.text}
                  </Popup>
                </Marker>
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mx-2" style={{marginTop: "140px"}}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} className="text-light h-80">
            <Card.Header>Air Quality Index</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            {airQuality ? (
                <>
                <div
                    id="airQualityCircle"
                    style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: getGradientColor(aqiInfo.text),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "10px"
                    }}
                >
                    {aqiInfo.text}
                </div>
                <div id="airQualityText">{aqiInfo.text}</div>
                </>
            ) : (
                <p>Search a location to get AQI.</p>
            )}
            </Card.Body>
        </Card>
        </Col>
      </Row>

      {/* Second Row: Pollutants */}
      <Row className="justify-content-center">
        {airQuality &&
          [
            { label: "PM2.5", value: pollutants.pm2_5, icon: "bi bi-cloud-fog-fill" },
            { label: "PM10", value: pollutants.pm10, icon: "bi bi-cloud-haze2-fill" },
            { label: "CO", value: pollutants.co, icon: "bi bi-cloud-lightning-rain-fill" },
            { label: "NO₂", value: pollutants.no2, icon: "bi bi-cloud-drizzle-fill" },
            { label: "O₃", value: pollutants.o3, icon: "bi bi-cloud-sun-fill" },
          ].map((pollutant, index) => (
            <Col key={index} xs={0.1} md={4} className="mx-1 my-2">
              <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} className="text-light">
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <i className={`${pollutant.icon} me-2`}></i>
                  {pollutant.label}: {pollutant.value}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
