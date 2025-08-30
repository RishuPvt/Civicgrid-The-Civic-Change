import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Upload, CheckCircle, X, LocateFixed, Video } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const SubmitReportPage: React.FC = () => {
  const { addToast } = useToast();
  const [title, setTitle] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const issueTypes = [
    'Garbage/Waste',
    'Pothole',
    'Water Leak',
    'Streetlight Issue',
    'Traffic Problem',
    'Graffiti',
    'Broken Infrastructure',
    'Other',
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (mediaFiles.length + newFiles.length > 3) {
        addToast('You can upload a maximum of 3 files.', 'error');
        return;
      }
      setMediaFiles((prevFiles) => [...prevFiles, ...newFiles]);
      addToast('Files selected successfully!', 'success');
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          addToast('Location fetched successfully!', 'success');
        },
        () => {
          addToast('Unable to get location. Please enable location services.', 'error');
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mediaFiles.length === 0) {
      addToast('Please upload at least one image or video.', 'error');
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after success message
      setTimeout(() => {
        setShowSuccess(false);
        setTitle('');
        setDescription('');
        setIssueType('');
        setLocation('');
        setMediaFiles([]);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a New Report</h1>
        <p className="text-gray-600 mb-6">Help improve your community by reporting issues that need attention.</p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Overflowing garbage bin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
            <select
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select an issue type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images or a Short Video (up to 3 files)</label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, MP4, MOV up to 25MB</p>
              </div>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`preview ${index}`} 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-black rounded-lg flex items-center justify-center">
                      <Video className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <button 
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Click the button to get your location"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                title="Get Current Location"
              >
                <LocateFixed className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                Report Submitted!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for helping improve our community. Your report is under review.
              </p>
              <div className="text-green-600 font-semibold">
                +50 Civic Points Earned!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubmitReportPage;
