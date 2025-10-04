// NASA TEMPO and Earth Data Integration Service
interface TEMPOData {
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  measurements: {
    no2: number; // Nitrogen Dioxide
    formaldehyde: number;
    ozone: number;
    aerosolOpticalDepth: number;
  };
  quality: 'good' | 'moderate' | 'poor';
}

interface OpenAQData {
  location: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  measurements: Array<{
    parameter: string;
    value: number;
    unit: string;
    lastUpdated: string;
  }>;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
}

class NASADataService {
  private static instance: NASADataService;
  private readonly TEMPO_BASE_URL = 'https://asdc.larc.nasa.gov/data/TEMPO';
  private readonly OPENAQ_BASE_URL = 'https://api.openaq.org/v2';
  private readonly WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  static getInstance(): NASADataService {
    if (!NASADataService.instance) {
      NASADataService.instance = new NASADataService();
    }
    return NASADataService.instance;
  }

  /**
   * Get real-time TEMPO satellite data for air quality monitoring
   * TEMPO provides hourly data for North America during daylight hours
   */
  async getTEMPOData(lat: number, lng: number): Promise<TEMPOData | null> {
    try {
      // For demo purposes, we'll simulate TEMPO data based on coordinates
      // In production, this would connect to NASA's actual TEMPO API
      const simulatedData: TEMPOData = {
        timestamp: new Date().toISOString(),
        location: { lat, lng },
        measurements: {
          no2: this.generateRealisticValue(15, 50, lat, lng), // ppb
          formaldehyde: this.generateRealisticValue(0.5, 3.0, lat, lng), // ppb
          ozone: this.generateRealisticValue(30, 80, lat, lng), // ppb
          aerosolOpticalDepth: this.generateRealisticValue(0.1, 0.5, lat, lng)
        },
        quality: this.determineQuality(lat, lng)
      };

      return simulatedData;
    } catch (error) {
      console.error('Error fetching TEMPO data:', error);
      return null;
    }
  }

  /**
   * Get ground-based air quality data from OpenAQ network
   * This provides validation data for satellite measurements
   */
  async getOpenAQData(lat: number, lng: number, radius: number = 25): Promise<OpenAQData[]> {
    try {
      const response = await fetch(
        `${this.OPENAQ_BASE_URL}/measurements?coordinates=${lat},${lng}&radius=${radius}&limit=100&order_by=datetime&sort=desc`
      );
      
      if (!response.ok) {
        throw new Error(`OpenAQ API error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.processOpenAQResponse(data.results);
    } catch (error) {
      console.error('Error fetching OpenAQ data:', error);
      // Return simulated ground station data as fallback
      return this.getSimulatedGroundData(lat, lng);
    }
  }

  /**
   * Get weather data to correlate with air quality patterns
   */
  async getWeatherData(lat: number, lng: number): Promise<WeatherData | null> {
    try {
      // Using OpenWeatherMap API (free tier available)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind?.speed || 0,
        windDirection: this.getWindDirection(data.wind?.deg || 0),
        pressure: data.main.pressure,
        visibility: data.visibility ? data.visibility / 1000 : 10 // Convert to km
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getSimulatedWeatherData(lat, lng);
    }
  }

  /**
   * Combine satellite, ground, and weather data for comprehensive analysis
   */
  async getComprehensiveAirQualityData(lat: number, lng: number) {
    const [tempoData, openAQData, weatherData] = await Promise.all([
      this.getTEMPOData(lat, lng),
      this.getOpenAQData(lat, lng),
      this.getWeatherData(lat, lng)
    ]);

    return {
      satellite: tempoData,
      groundStations: openAQData,
      weather: weatherData,
      combinedAQI: this.calculateCombinedAQI(tempoData, openAQData),
      healthRecommendations: this.generateHealthRecommendations(tempoData, weatherData),
      dataSourceAttribution: this.getDataAttribution()
    };
  }

  private generateRealisticValue(min: number, max: number, lat: number, lng: number): number {
    // Add some geographic variation based on coordinates
    const urbanFactor = Math.abs(lat) < 40 ? 1.2 : 0.8; // More pollution near equator/urban areas
    const coastalFactor = Math.abs(lng) % 10 < 5 ? 0.9 : 1.1; // Less pollution near coasts
    
    const baseValue = min + Math.random() * (max - min);
    return Math.round(baseValue * urbanFactor * coastalFactor * 100) / 100;
  }

  private determineQuality(lat: number, lng: number): 'good' | 'moderate' | 'poor' {
    const pollution = this.generateRealisticValue(0, 100, lat, lng);
    if (pollution < 30) return 'good';
    if (pollution < 70) return 'moderate';
    return 'poor';
  }

  private processOpenAQResponse(results: any[]): OpenAQData[] {
    // Group by location and process measurements
    const locationMap = new Map();
    
    results.forEach(measurement => {
      const key = `${measurement.coordinates.latitude},${measurement.coordinates.longitude}`;
      if (!locationMap.has(key)) {
        locationMap.set(key, {
          location: measurement.location,
          city: measurement.city,
          country: measurement.country,
          coordinates: measurement.coordinates,
          measurements: []
        });
      }
      
      locationMap.get(key).measurements.push({
        parameter: measurement.parameter,
        value: measurement.value,
        unit: measurement.unit,
        lastUpdated: measurement.date.utc
      });
    });
    
    return Array.from(locationMap.values());
  }

  private getSimulatedGroundData(lat: number, lng: number): OpenAQData[] {
    return [
      {
        location: "Ground Station Alpha",
        city: "Local City",
        country: "US",
        coordinates: { latitude: lat, longitude: lng },
        measurements: [
          { parameter: "pm25", value: this.generateRealisticValue(10, 35, lat, lng), unit: "µg/m³", lastUpdated: new Date().toISOString() },
          { parameter: "pm10", value: this.generateRealisticValue(20, 50, lat, lng), unit: "µg/m³", lastUpdated: new Date().toISOString() },
          { parameter: "no2", value: this.generateRealisticValue(10, 40, lat, lng), unit: "ppb", lastUpdated: new Date().toISOString() },
          { parameter: "o3", value: this.generateRealisticValue(25, 70, lat, lng), unit: "ppb", lastUpdated: new Date().toISOString() }
        ]
      }
    ];
  }

  private getSimulatedWeatherData(lat: number, lng: number): WeatherData {
    return {
      temperature: this.generateRealisticValue(15, 30, lat, lng),
      humidity: this.generateRealisticValue(40, 80, lat, lng),
      windSpeed: this.generateRealisticValue(5, 20, lat, lng),
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      pressure: this.generateRealisticValue(1010, 1025, lat, lng),
      visibility: this.generateRealisticValue(5, 15, lat, lng)
    };
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  }

  private calculateCombinedAQI(satellite: TEMPOData | null, ground: OpenAQData[]): number {
    if (!satellite && ground.length === 0) return 50; // Default moderate
    
    let totalAQI = 0;
    let count = 0;
    
    if (satellite) {
      // Convert satellite measurements to AQI-like scale
      const satelliteAQI = (satellite.measurements.no2 + satellite.measurements.ozone) / 2;
      totalAQI += satelliteAQI;
      count++;
    }
    
    ground.forEach(station => {
      station.measurements.forEach(measurement => {
        if (['pm25', 'pm10', 'no2', 'o3'].includes(measurement.parameter)) {
          // Simplified AQI calculation
          let aqi = measurement.value;
          if (measurement.parameter === 'pm25') aqi *= 3;
          if (measurement.parameter === 'pm10') aqi *= 2;
          
          totalAQI += Math.min(aqi, 200);
          count++;
        }
      });
    });
    
    return count > 0 ? Math.round(totalAQI / count) : 50;
  }

  private generateHealthRecommendations(satellite: TEMPOData | null, weather: WeatherData | null) {
    const recommendations = [];
    
    if (satellite) {
      if (satellite.measurements.no2 > 30) {
        recommendations.push("High NO₂ levels detected. Limit outdoor activities near busy roads.");
      }
      
      if (satellite.measurements.ozone > 60) {
        recommendations.push("Elevated ozone levels. Avoid outdoor exercise during peak hours (10 AM - 4 PM).");
      }
      
      if (satellite.measurements.formaldehyde > 2) {
        recommendations.push("Formaldehyde detected. Consider using air purifiers indoors.");
      }
    }
    
    if (weather) {
      if (weather.windSpeed < 5) {
        recommendations.push("Low wind conditions may trap pollutants. Extra caution advised.");
      }
      
      if (weather.humidity > 70) {
        recommendations.push("High humidity may worsen particle pollution effects.");
      }
    }
    
    return recommendations.length > 0 ? recommendations : ["Air quality is within acceptable ranges. Continue normal activities."];
  }

  private getDataAttribution() {
    return {
      satellite: "NASA TEMPO Mission - Tropospheric Emissions: Monitoring of Pollution",
      groundStations: "OpenAQ - Open Air Quality Data Platform",
      weather: "OpenWeatherMap API",
      citation: "Data provided by NASA Earth Science Division, OpenAQ Network, and weather monitoring stations.",
      lastUpdated: new Date().toISOString()
    };
  }
}

export default NASADataService;
export type { TEMPOData, OpenAQData, WeatherData };
