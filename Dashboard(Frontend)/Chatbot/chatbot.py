from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import requests
import google.generativeai as genai
import re

# === CONFIG ===
os.environ["GEMINI_API_KEY"] = "AIzaSyD_h1jIdo_slfl0J--no2vqGlTpZvXq0mA"  # Replace with your Gemini key
OPENWEATHER_API_KEY = "02ea3b1ca1f643f03f1211768875f716"  # Replace with your OpenWeatherMap key

# Setup Gemini API client
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("models/gemini-2.0-flash-001")

# FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class Query(BaseModel):
    message: str

# Extract city from message using regex
def extract_city_from_text(text: str) -> Optional[str]:
    match = re.search(r'\b(?:in|at|of)\s+([A-Za-z\s]+)', text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return None

# Get location data using Nominatim
def get_location(city: str):
    try:
        response = requests.get(
            "https://nominatim.openstreetmap.org/search",
            params={"city": city, "format": "json"},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Location error: {e}")
        return []

# Get current weather from OpenWeatherMap
def get_weather_data(lat: float, lon: float):
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"lat": lat, "lon": lon, "appid": OPENWEATHER_API_KEY, "units": "metric"}
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        print("✅ Weather API Response:", data)  # Debug log
        return {
            "temp": data["main"]["temp"],
            "high": data["main"]["temp_max"],
            "low": data["main"]["temp_min"],
            "condition": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "wind_deg": data["wind"]["deg"],
        }
    except Exception as e:
        print(f"Weather error: {e}")
        return None

# Chatbot POST endpoint
@app.post("/ask")
async def ask_gemini(query: Query):
    try:
        user_input = query.message
        city = extract_city_from_text(user_input) or "Patna"

        weather_info = ""
        if "weather" in user_input.lower():
            location_data = get_location(city)
            if location_data:
                lat = float(location_data[0]["lat"])
                lon = float(location_data[0]["lon"])
                weather = get_weather_data(lat, lon)
                if weather:
                    weather_info = (
                        f"\n[REAL-TIME WEATHER DATA - trusted input]\n"
                        f"City: {city}\n"
                        f"Temperature: {weather['temp']}°C (High: {weather['high']}°, Low: {weather['low']}°)\n"
                        f"Condition: {weather['condition']}\n"
                        f"Wind Speed: {weather['wind_speed']} km/h\n"
                        f"Wind Direction: {weather['wind_deg']}°\n"
                        f"Humidity: {weather['humidity']}%\n"
                        f"--- End of data ---\n\n"
                        "You are to respond ONLY based on the above real-time weather data, which has already been retrieved from a reliable weather API. "
                        "Do not say you lack access to real-time data. Do not attempt to fetch or speculate about weather. Just use the facts given.\n"
                    )

        system_prompt = (
            "You are a weather-aware assistant integrated into a dust monitoring system. "
            "Your job is to analyze and respond using ONLY the real-time data provided to you. "
            "NEVER say that you lack access to weather data. Assume the data block above is accurate and current.\n"
        )

        # Create a fresh chat instance per request to avoid shared state issues
        chat = model.start_chat(history=[])
        final_prompt = system_prompt + weather_info + "User: " + user_input
        response = chat.send_message(final_prompt)

        return {"response": response.text}

    except Exception as e:
        print(f"Error in /ask endpoint: {e}")
        return {"error": "Internal server error"}, 500
