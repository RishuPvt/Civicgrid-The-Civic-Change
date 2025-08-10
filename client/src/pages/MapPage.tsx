
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// This is a standard fix for a known issue with the default marker icon.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// We'll use mock data for now. Later, this will come from your backend.
const nearbyTasks = [
  { id: 1, position: [28.6139, 77.2090], description: 'Overflowing bin near India Gate' },
  { id: 2, position: [28.6315, 77.2167], description: 'Illegal dumping at Connaught Place' },
  { id: 3, position: [28.5245, 77.1855], description: 'Pothole on the road in Hauz Khas Village' },
];

const MapPage: React.FC = () => {
  // The map will be centered on Delhi by default.
  const defaultPosition: [number, number] = [28.6139, 77.2090]; 

  return (
    // This container sets the z-index of the map lower than the sidebar's z-index (z-40)
    <div className="w-full h-[calc(100vh-4rem)] rounded-2xl overflow-hidden shadow-lg relative z-10">
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {nearbyTasks.map(task => (
          <Marker key={task.id} position={[task.position[0], task.position[1]]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{task.description}</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Lat: {task.position[0]}, Lng: {task.position[1]}</span>
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
