import { motion } from "framer-motion";

interface AQIGaugeProps {
  value: number;
  size?: number;
}

const AQIGauge = ({ value, size = 120 }: AQIGaugeProps) => {
  const getColor = (aqi: number) => {
    if (aqi <= 50) return "#00ff00"; // Good - Green
    if (aqi <= 100) return "#ffff00"; // Moderate - Yellow
    if (aqi <= 150) return "#ff8c00"; // Unhealthy for Sensitive - Orange
    if (aqi <= 200) return "#ff0000"; // Unhealthy - Red
    return "#8b00ff"; // Very Unhealthy - Purple
  };

  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / 300, 1); // Max AQI shown as 300
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${getColor(value)}40)`,
          }}
        />
      </svg>
    </div>
  );
};

export default AQIGauge;