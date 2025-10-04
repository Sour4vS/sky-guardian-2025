import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from 'react-draggable';
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sky Guardian, your AI companion for real-time air quality, weather, and health tips. Ask me anything about pollution, forecasts, or how to stay safe!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Check for live AQI/weather intent and greetings
    let botText = '';
    try {
      if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))\b/i.test(inputMessage.trim())) {
        botText = "Hi there! How can I help you with air quality, weather, or health tips today?";
      } else if (/aqi|air quality|weather|temperature|humidity/i.test(inputMessage)) {
        // Try to extract city from user input (e.g., "air quality in Mumbai")
        const cityMatch = inputMessage.match(/in ([a-zA-Z\s]+)/i);
        const city = cityMatch ? cityMatch[1].trim() : undefined;
        botText = await fetchWeatherAQI(city);
      } else {
        botText = getBotResponse(inputMessage);
      }
    } catch (err) {
      botText = 'Sorry, I could not fetch live data right now. Please try again later.';
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Fetch live weather and AQI from OpenWeatherMap
  const fetchWeatherAQI = async (cityInput?: string, coords?: { lat: number, lon: number }) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    let city = cityInput;
    let lat: number | undefined, lon: number | undefined;
    let url = '';
    if (coords) {
      lat = coords.lat;
      lon = coords.lon;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      return 'Please provide a location or allow location access.';
    }
    try {
      // First, get weather (and coordinates for AQI)
      const weatherRes = await fetch(url);
      if (!weatherRes.ok) throw new Error('Weather API error: ' + weatherRes.status);
      const weather = await weatherRes.json();
      if (!lat || !lon) {
        if (weather.coord) {
          lat = weather.coord.lat;
          lon = weather.coord.lon;
        } else {
          return 'Could not determine coordinates for this location.';
        }
      }
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const aqiRes = await fetch(aqiUrl);
      if (!aqiRes.ok) throw new Error('AQI API error: ' + aqiRes.status);
      const aqi = await aqiRes.json();
      const aqiValue = aqi.list[0]?.main.aqi;
      const aqiText = [
        '',
        'Good',
        'Fair',
        'Moderate',
        'Poor',
        'Very Poor'
      ][aqiValue] || 'Unknown';
      let warning = '';
      // If AQI is always 1 (Good) for India, try OpenAQ as fallback
      if (aqiValue === 1 && cityInput) {
        const openaqUrl = `https://api.openaq.org/v2/latest?city=${encodeURIComponent(city)}&country=IN&limit=1`;
        const openaqRes = await fetch(openaqUrl);
        if (openaqRes.ok) {
          const openaq = await openaqRes.json();
          let pm25 = 'N/A', pm10 = 'N/A';
          if (openaq.results && openaq.results[0] && openaq.results[0].measurements) {
            for (const m of openaq.results[0].measurements) {
              if (m.parameter === 'pm25') pm25 = m.value + ' ' + m.unit;
              if (m.parameter === 'pm10') pm10 = m.value + ' ' + m.unit;
            }
            warning = '\n⚠️ OpenWeatherMap AQI may be inaccurate for this city. Showing OpenAQ data:';
            return `Live in ${city}:\n- Weather: ${weather.weather[0].description}, ${weather.main.temp}°C\n- Humidity: ${weather.main.humidity}%\n- AQI: ${aqiValue} (${aqiText})${warning}\n- PM2.5: ${pm25}\n- PM10: ${pm10}`;
          }
        }
        warning = '\n⚠️ AQI data may be inaccurate or unavailable for this city.';
      }
      return `Live in ${city}:\n- Weather: ${weather.weather[0].description}, ${weather.main.temp}°C\n- Humidity: ${weather.main.humidity}%\n- AQI: ${aqiValue} (${aqiText})${warning}`;
    } catch (err) {
      return 'Sorry, I could not fetch live weather or AQI data. ' + (err instanceof Error ? err.message : '');
    }
  };

  // Fetch live air quality from OpenAQ
  // OpenAQ integration removed for now

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    try {
      if (input.includes('aqi') || input.includes('air quality')) {
        return 'Current AQI in your area is 142 (Unhealthy). This means sensitive groups should limit outdoor activities. Would you like specific health recommendations?';
      }
      if (input.includes('forecast') || input.includes('tomorrow')) {
        return 'Tomorrow\'s forecast shows AQI will increase to 156 (Unhealthy). I recommend staying indoors and using air purifiers. Check the forecast section for detailed predictions.';
      }
      if (input.includes('health') || input.includes('recommendation')) {
        return 'For current AQI levels, I recommend: 1) Wear N95 masks outdoors 2) Use air purifiers indoors 3) Limit outdoor exercise. Children and elderly should be extra cautious.';
      }
      if (input.includes('data') || input.includes('nasa')) {
        return 'Our predictions use NASA TEMPO satellite data combined with AI models to forecast air quality up to 3 days ahead. This helps communities prepare for poor air quality days.';
      }
      // Fallback for unrecognized queries
      return "Sorry, I didn't understand that. I can help with air quality, weather, and health tips. Try asking about AQI, weather, or health recommendations!";
    } catch (err) {
      return 'Oops! Something went wrong. Please try again or ask a different question.';
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-cyan/80 hover:to-neon-blue/80 shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
          style={{
            filter: 'drop-shadow(0 0 20px hsl(var(--neon-cyan) / 0.5))'
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <Draggable handle=".chatbot-drag-handle">
            <motion.div
                className="fixed bottom-8 right-24 z-40 w-[min(90vw,400px)] h-[min(80vh,600px)] flex flex-col"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="glass-card border border-neon-cyan/20 h-full flex flex-col overflow-hidden">
              <CardHeader className="pb-3 chatbot-drag-handle cursor-move">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="gradient-text">Sky Guardian AI</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 pt-2" style={{ minHeight: 0 }}>
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3" />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white'
                              : 'bg-muted/50 border border-border/50'
                          }`}
                        >
                          {message.text}
                        </div>
                        {message.sender === 'user' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-violet to-neon-blue flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 justify-start"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3" />
                        </div>
                        <div className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                {/* Input Form - always visible at bottom */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50 bg-background/80 sticky bottom-0 z-10">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask about air quality..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-background/50 border-border/50 focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                      disabled={isTyping}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-cyan/80 hover:to-neon-blue/80 transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          </Draggable>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;