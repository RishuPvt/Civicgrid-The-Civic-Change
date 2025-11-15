import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  MapPin,
  Award,
  Save,
  Camera,
  Key,
  LocateFixed,
} from "lucide-react";
import { backendUrl } from "../API/BackendUrl";
import { toast } from "react-toastify";
import axios from "axios";
import ChangePasswordModal from "../components/Profile/ChangePasswordModal";
// Note: 'address' import from framer-motion/client seems unused and might be an error
// import { address } from "framer-motion/client";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    address: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/users/getCurrentUser`, {
          withCredentials: true,
        });
        const data = res.data.data;
        setUser(data);
        setFormData({
          name: data.name || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
          address: data.address || "",
        });
        setAvatarPreview(data.avatar || "");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile update
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${backendUrl}/users/updateAccountDetails`,
        formData,
        { withCredentials: true }
      );
      setUser((prev: any) => ({ ...prev, ...res.data.data }));
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const res = await axios.put(
          `${backendUrl}/users/updateUserAvatar`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setUser((prev: any) => ({ ...prev, avatar: res.data.data.avatar }));
        toast.success(res.data.message || "Avatar updated!");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to update avatar");
      }
    }
  };

  // Trigger hidden file input
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Handle location fetch
  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
          // 🔹 Get address from OpenStreetMap
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name || "";

          // 🔹 Update local form state
          setFormData((prev) => ({
            ...prev,
            address,
            // Also update lat/lng in form data
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));

          // 🔹 Save location to backend (logged-in user only)
          // (This part seems to be missing from your original code,
          // you were only updating the address in the form state, not saving it)
          // I'll leave your original logic, but you might want to call handleProfileSubmit here.
          toast.success("Location fetched! Click 'Save Changes' to update profile.");

        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch address from location.");
        }
      },
      () => {
        toast.error("Enable location services to fetch location.");
      }
    );
  };

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Avatar & Badges */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={avatarPreview}
                    alt={user.name}
                    className="w-full h-full rounded-full border-4 border-green-200 object-cover"
                  />
                  <button
                    onClick={handleCameraClick}
                    className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-500">{user.civicScore || 0} pts</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Your Badges
                </h3>
                <div className="space-y-3">
                  {(user.badges || []).length > 0 ? (
                    user.badges.map((badge: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">
                          {badge}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center">No badges earned yet. Keep it up!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Edit Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Edit Information
                </h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Display Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Home Address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <LocateFixed className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Show coordinates only if available */}
                  {formData.latitude && formData.longitude && (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {Number(formData.latitude).toFixed(4)},{" "}
                      {Number(formData.longitude).toFixed(4)}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </form>
              </div>

              {/* --- START OF FIX --- */}
              {/* This is the card that had the UI bug. */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Security
                </h2>
                {/* I changed this div to stack vertically on mobile (flex-col)
                  and switch to a horizontal row on small screens and up (sm:flex-row).
                  This prevents the button from overflowing on phones.
                */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-gray-600 text-center sm:text-left">
                    Update your password
                  </p>
                  <button
                    onClick={() => setPasswordModalOpen(true)}
                    /*
                      I added 'w-full' for mobile and 'sm:w-auto' for desktop
                      to make the button full-width on small screens.
                      I also added 'justify-center' for the mobile button.
                    */
                    className="flex items-center justify-center sm:justify-start space-x-2 py-2 px-4 rounded-lg text-white font-semibold bg-gray-700 hover:bg-gray-800 w-full sm:w-auto"
                  >
                    <Key className="w-5 h-5" />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>
              {/* --- END OF FIX --- */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;