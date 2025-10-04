# 🛰️ Sky Guardian 2025 - NASA Space Apps Challenge

## 🚀 NASA Space Apps Challenge 2025 Submission
**Challenge:** From EarthData to Action: Cloud Computing with Earth Observation Data for Predicting Cleaner, Safer Skies

---

## 🌟 Project Overview

**Sky Guardian 2025** is an advanced air quality monitoring and prediction platform that integrates real-time NASA TEMPO satellite data with ground-based measurements and weather data to provide comprehensive air quality intelligence for protecting public health.

### 🎯 Challenge Alignment
This project directly addresses the NASA Space Apps Challenge by:
- ✅ **Integrating NASA TEMPO satellite data** - Real-time tropospheric pollution monitoring
- ✅ **Combining satellite and ground-based data** - Enhanced accuracy through data validation
- ✅ **Weather data correlation** - Understanding pollution movement patterns  
- ✅ **Health-focused predictions** - Proactive alerts for vulnerable populations
- ✅ **Stakeholder-specific insights** - Tailored dashboards for schools, healthcare, emergency services
- ✅ **Clear data attribution** - Transparent sourcing and citations

---

## 🛰️ Key Features

### **NASA TEMPO Integration**
- Real-time nitrogen dioxide (NO₂) measurements
- Formaldehyde detection and monitoring
- Ozone (O₃) level tracking
- Aerosol optical depth analysis
- Hourly updates across North America

### **Multi-Source Data Fusion**
- **Satellite Data:** NASA TEMPO mission
- **Ground Stations:** OpenAQ network validation
- **Weather Data:** Wind, temperature, humidity correlation
- **Combined AQI:** Integrated air quality index

### **Health-Centric Alerts**
- Customizable thresholds for different user groups
- Proactive notifications for health-sensitive populations
- Browser and sound notifications
- Specialized guidance for vulnerable groups

### **Stakeholder Dashboards**
- **Schools:** Activity recommendations, student health guidance
- **Healthcare:** Expected admission increases, facility management
- **Emergency Services:** Protocol activation, vulnerable population tracking
- **Transportation:** System impact assessment, safety recommendations

### **Interactive Visualization**
- 3D Earth globe with real-time pollution markers
- Satellite and ground station data comparison
- Historical trends and forecasting
- Mobile-responsive design

---

## 🏆 Target Stakeholders (Per Challenge Requirements)

### **Health-Sensitive Groups**
- Vulnerable populations with respiratory conditions
- School administrators protecting student health
- Eldercare facilities managing senior residents
- Residents in industrial zones

### **Policy Implementation Partners**
- Government officials enacting clean air initiatives
- Transportation authorities managing traffic flows
- Parks departments coordinating outdoor activities
- School districts making athletic decisions

### **Emergency Response Networks**
- Wildfire management teams
- Disaster readiness organizations
- Meteorological service providers
- Crisis communication specialists

### **Economic Stakeholders**
- Insurance risk assessors
- Tourism boards optimizing visitor experiences
- Public health departments

---

## 🔬 Technical Implementation

### **NASA Data Integration**
```typescript
// Real-time TEMPO satellite data
interface TEMPOData {
  measurements: {
    no2: number;        // Nitrogen Dioxide (ppb)
    formaldehyde: number; // Formaldehyde (ppb)  
    ozone: number;      // Ozone (ppb)
    aerosolOpticalDepth: number;
  };
  quality: 'good' | 'moderate' | 'poor';
}
```

### **Ground Station Validation**
- OpenAQ network integration
- Real-time measurement comparison
- Data quality assessment
- Enhanced accuracy through validation

### **Weather Correlation**
- Wind patterns affecting pollution dispersion
- Temperature inversions trapping pollutants
- Humidity impact on particle behavior
- Atmospheric stability analysis

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Modern web browser
- Internet connection for real-time data

### **Installation**
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd sky-guardian-2025

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### **Environment Setup (Optional)**
```env
# For enhanced features, add your API keys to .env:
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_NASA_API_KEY=your_nasa_api_key
```

**Note:** The app works with realistic simulated data even without API keys for demo purposes.

---

## 🌍 Data Sources & Attribution

### **Satellite Data**
- **NASA TEMPO Mission** - Tropospheric Emissions: Monitoring of Pollution
- **Coverage:** North America, hourly daytime measurements
- **Parameters:** NO₂, Formaldehyde, O₃, Aerosols

### **Ground Validation**
- **OpenAQ Network** - Global air quality measurements
- **Real-time validation** of satellite observations
- **Local accuracy enhancement**

### **Weather Integration**
- **OpenWeatherMap API** - Meteorological conditions
- **Wind patterns** - Pollution dispersion modeling
- **Atmospheric conditions** - Stability and inversion detection

### **Citation**
"Data provided by NASA Earth Science Division TEMPO Mission, OpenAQ Network, and meteorological monitoring stations. This project was developed for the 2025 NASA Space Apps Challenge."

---

## 🏥 Health Impact Features

### **Vulnerable Population Protection**
- **Children:** School activity recommendations
- **Elderly:** Enhanced protection protocols  
- **Respiratory Patients:** Medication reminders
- **Athletes:** Exercise modification guidance

### **Proactive Health Alerts**
- Customizable AQI thresholds
- Real-time browser notifications
- Emergency protocol activation
- Health recommendation engine

### **Organization-Specific Guidance**
- **Schools:** PE class cancellation recommendations
- **Healthcare:** Admission increase predictions
- **Emergency Services:** Resource allocation guidance
- **Transportation:** Visibility and safety warnings

---

## 🎨 Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **3D Visualization:** Three.js, React Three Fiber
- **UI Components:** shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** React Hooks
- **Build Tool:** Vite
- **Deployment:** Ready for cloud platforms

---

## 🏆 NASA Space Apps Challenge Impact

### **Innovation Highlights**
1. **First real-time TEMPO integration** in a public-facing health app
2. **Multi-stakeholder approach** addressing diverse community needs
3. **Predictive health modeling** using satellite + ground data fusion
4. **Emergency response integration** for crisis management
5. **Educational component** raising awareness about air quality

### **Public Health Benefits**
- **Reduced exposure** through proactive alerts
- **Informed decision-making** for vulnerable populations  
- **Emergency preparedness** for air quality events
- **Community awareness** of pollution sources
- **Data-driven policy** support for clean air initiatives

### **Scalability & Future**
- **Global expansion** beyond North America
- **Additional satellites** (Sentinel-5P, GOES integration)
- **Machine learning** enhanced predictions
- **IoT integration** with personal air quality sensors
- **API platform** for third-party developers

---

## 📊 Demo Scenarios

### **School District Use Case**
1. High AQI detected via TEMPO satellite
2. Automatic alert to school administrators
3. PE classes moved indoors, recess modified
4. Parent notifications sent automatically
5. Health monitoring for asthmatic students

### **Healthcare Facility Response**
1. Pollution spike prediction from weather + satellite data
2. Staff alerted to expect respiratory admissions increase
3. Additional medications and oxygen prepared
4. Air filtration systems activated
5. Patient advisory communications sent

### **Emergency Services Activation**
1. Wildfire smoke detected by satellite
2. Emergency protocols automatically triggered
3. Vulnerable population alerts activated
4. Public advisory systems broadcasting
5. Resource allocation optimized

---

## 🔮 Future Enhancements

- **AI/ML Predictions:** Advanced forecasting models
- **Citizen Science:** Community air quality reporting
- **Wearable Integration:** Personal exposure monitoring
- **AR/VR Visualization:** Immersive air quality education
- **Global Expansion:** Worldwide coverage beyond North America

---

## 📧 Contact & Team

**Developed for NASA Space Apps Challenge 2025**

- **Challenge Category:** Earth Science
- **Difficulty Level:** Intermediate/Advanced
- **Technologies:** AI/ML, Data Analysis, Web Development
- **NASA Data Sources:** TEMPO, Earth Science Division

---

## 📄 License

This project is open source and available under the MIT License. Developed for the NASA Space Apps Challenge 2025.

---

## 🙏 Acknowledgments

- **NASA Earth Science Division** for TEMPO mission data
- **OpenAQ Network** for ground station measurements
- **NASA Space Apps Challenge** for the inspiration and platform
- **Open source community** for amazing tools and libraries

**"From EarthData to Action - Protecting communities through space-based air quality intelligence"** 🛰️🌍💚
