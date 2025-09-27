import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      text: 'Hi! I\'m your AI assistant for air quality insights. Ask me about AQI levels, health recommendations, or forecasts!',
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

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
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
    
    return 'I can help you with air quality information, health recommendations, forecasts, and explain how our NASA-powered system works. What would you like to know?';
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
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 h-96"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="glass-card border border-neon-cyan/20 h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="gradient-text">AirQuality AI</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 px-4">
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
                </ScrollArea>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask about air quality..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-background/50 border-border/50 focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                      disabled={isTyping}
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
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;