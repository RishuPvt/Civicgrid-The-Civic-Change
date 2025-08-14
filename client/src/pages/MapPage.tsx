// FILE: src/pages/MapPage.tsx
// This version fetches real task data from your backend.

import React, { useState, useEffect } from 'react'; // 1. Import useState and useEffect
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import axios from 'axios'; // 2. Import axios to make API calls

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
  description: string;
  latitude: number;
  longitude: number;
}

const MapPage: React.FC = () => {
  // 3. Use state to store the tasks. It starts as an empty array.
  const [tasks, setTasks] = useState<Task[]>([]);
  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Centered on Delhi

  // 4. Use the useEffect hook to fetch data when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Make a GET request to your friend's backend endpoint
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data); // Store the fetched tasks in our state
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        // You could show an error message to the user here
      }
    };

    fetchTasks();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  return (
    <div className="w-full h-[calc(100vh-4rem)] rounded-2xl overflow-hidden shadow-lg relative z-10">
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* 5. Map over the 'tasks' from our state instead of the mock data */}
        {tasks.map(task => (
          <Marker key={task.id} position={[task.latitude, task.longitude]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{task.description}</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Lat: {task.latitude}, Lng: {task.longitude}</span>
                </div>
                <button className="w-full bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
