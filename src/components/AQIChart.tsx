import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { day: 'Mon', aqi: 72, predicted: false },
  { day: 'Tue', aqi: 68, predicted: false },
  { day: 'Wed', aqi: 75, predicted: false },
  { day: 'Thu', aqi: 82, predicted: false },
  { day: 'Fri', aqi: 85, predicted: true },
  { day: 'Sat', aqi: 78, predicted: true },
  { day: 'Sun', aqi: 70, predicted: true },
];

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--neon-cyan))",
  },
};

const AQIChart = () => {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="aqi" 
              stroke="hsl(var(--neon-cyan))" 
              strokeWidth={3}
              dot={{ 
                fill: 'hsl(var(--neon-cyan))', 
                strokeWidth: 2, 
                r: 4,
                filter: 'drop-shadow(0 0 6px hsl(var(--neon-cyan)))'
              }}
              activeDot={{ 
                r: 6, 
                fill: 'hsl(var(--neon-cyan))',
                filter: 'drop-shadow(0 0 8px hsl(var(--neon-cyan)))'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default AQIChart;