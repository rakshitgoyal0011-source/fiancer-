import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-4 outline-none">
                <p className="font-sans font-bold text-white mb-2">{label}</p>
                <p className="font-mono text-accent-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                    Rev: ${payload[0].value}k
                </p>
                <p className="font-mono text-accent-violet drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]">
                    Exp: ${payload[1].value}k
                </p>
            </div>
        );
    }
    return null;
};

interface HeroChartProps {
    growth: number;
    cogs: number;
    opex: number;
    fileName: string;
}

export const HeroChart: React.FC<HeroChartProps> = ({ growth, cogs, opex, fileName }) => {
    const fileHash = fileName ? fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 100;
    const baseMultiplier = 1 + (fileHash % 5) * 0.2; // Varies base numbers 1x to 1.8x

    const data = React.useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let currentRev = 100 * baseMultiplier;
        let currentOpex = 80 * baseMultiplier;

        return months.map((m, i) => {
            // Apply a fraction of the annual growth rate per month
            if (i > 0) {
                currentRev *= (1 + (growth / 100) / 12);
                currentOpex *= (1 + (opex / 100) / 12);
            }
            // Add cogs
            const totalExp = currentOpex + (currentRev * (cogs / 100));

            return {
                name: m,
                revenue: Math.round(currentRev),
                expenses: Math.round(totalExp)
            };
        });
    }, [growth, cogs, opex, baseMultiplier]);

    return (
        <div className="glass-panel w-full h-full p-6 flex flex-col">
            <h3 className="text-xl font-sans font-bold text-white mb-6">Revenue vs Expenses</h3>
            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0} />
                            </linearGradient>

                            {/* Neon Glow Filter */}
                            <filter id="neonGlowCyan">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="neonGlowViolet">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'Inter' }} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#00F0FF"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRev)"
                            filter="url(#neonGlowCyan)"
                            activeDot={{ r: 6, fill: "#00F0FF", stroke: "#fff", strokeWidth: 2, filter: "url(#neonGlowCyan)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#8A2BE2"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExp)"
                            filter="url(#neonGlowViolet)"
                            activeDot={{ r: 6, fill: "#8A2BE2", stroke: "#fff", strokeWidth: 2, filter: "url(#neonGlowViolet)" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
