
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const reels = [
  { user: 'Priya S.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e', thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { user: 'Rohan V.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { user: 'Aisha K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708c', thumbnail: 'https://images.pexels.com/photos/5775854/pexels-photo-5775854.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { user: 'Mike L.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709b', thumbnail: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const ReelsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Community in Action</h2>
          <p className="text-lg text-gray-600">See the impact our citizens are making every day.</p>
        </div>
        <div className="flex space-x-8 overflow-x-auto pb-4 -mx-4 px-4">
          {reels.map((reel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-64 h-96 rounded-2xl shadow-lg relative overflow-hidden group"
            >
              <img src={reel.thumbnail} alt={reel.user} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="w-16 h-16 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <img src={reel.avatar} alt={reel.user} className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="text-white font-semibold text-sm">{reel.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;