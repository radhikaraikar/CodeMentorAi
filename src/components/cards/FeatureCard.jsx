import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCode, FaBug, FaRocket, FaGraduationCap,
  FaClock, FaHistory, FaStar, FaDownload,
} from 'react-icons/fa';

const iconMap = {
  FaCode, FaBug, FaRocket, FaGraduationCap,
  FaClock, FaHistory, FaStar, FaDownload,
};

const FeatureCard = ({ feature, index = 0 }) => {
  const Icon = iconMap[feature.icon] || FaCode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <Link to={feature.link || '/explain'}>
        <div className="glass rounded-2xl p-6 h-full border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-semibold text-base mb-2 group-hover:text-indigo-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
