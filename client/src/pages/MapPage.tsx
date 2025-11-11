// FILE: src/pages/MapPage.tsx
// This version fetches real, nearby task data from your backend.

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, LocateFixed, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../API/BackendUrl';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// This is a standard fix for a known issue with the default marker icon.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define a type for our task data to make the code safer
interface Task {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
}

const MapPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Centered on Delhi
  const { user } = useAuth();
  const { showToast } = useToast();

  const fetchTasks = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/users/getNearbyTasks`, {
        params: {
          radius: 10, // You can make this dynamic if needed
        },
        withCredentials: true,
      });
      setTasks(response.data.data);
    } catch (error) {
      console.error("Failed to fetch nearby tasks:", error);
      showToast("Failed to load nearby tasks.", "error");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation && user) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          showToast("Location updated.", "success");
        },
        (error) => {
          console.error("Geolocation error:", error);
          showToast("Unable to get your location. Displaying default location.", "error");
          setLoading(false);
          setUserLocation(defaultPosition);
        }
      );
    } else {
      setLoading(false);
      setUserLocation(defaultPosition);
    }
  };

  useEffect(() => {
    // Attempt to get user location on component mount
    getUserLocation();
  }, []);

  useEffect(() => {
    // Fetch tasks whenever the user's location is set
    if (userLocation) {
      fetchTasks(userLocation[0], userLocation[1]);
    }
  }, [userLocation]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] rounded-2xl overflow-hidden shadow-lg relative">
      {loading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-80">
          <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
            <p className="mt-2 text-gray-700 font-semibold">Loading map data...</p>
          </div>
        </div>
      ) : (
        <MapContainer
          center={userLocation || defaultPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Task Markers */}
          {tasks.map(task => (
            <Marker key={task.id} position={[task.latitude, task.longitude]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Lat: {task.latitude.toFixed(4)}, Lng: {task.longitude.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${task.status === 'PENDING_VERIFICATION' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                      {task.status}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Component to recenter the map on user location */}
          <RecenterMap userLocation={userLocation} />

        </MapContainer>
      )}

      {/* Manual refresh button */}
      <button
        onClick={getUserLocation}
        className="absolute bottom-4 right-4 z-[999] p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      >
        <LocateFixed className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
};

// This is a helper component to recenter the map when userLocation state changes
const RecenterMap = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation);
    }
  }, [userLocation]);
  return null;
};

export default MapPage;