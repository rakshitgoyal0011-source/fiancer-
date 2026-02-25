import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';



const COLORS = ['#00F0FF', '#8A2BE2', '#39FF14', '#FF4040'];

interface SecondaryVisualsProps {
    growth: number;
    cogs: number;
    opex: number;
    fileName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomWaterfallTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 1) { // >1 because payload has base and growth bars
        const isTotal = payload[0].payload.isTotal;
        return (
            <div className="glass-panel p-3">
                <p className="font-sans font-bold text-white text-sm mb-1">{payload[0].payload.name}</p>
                <p className="font-mono text-xs text-accent-cyan">
                    {isTotal ? 'Total:' : 'Growth:'} ${payload[1].value}k
                </p>
            </div>
        );
    }
    return null;
};

export const SecondaryVisuals: React.FC<SecondaryVisualsProps> = ({ growth, cogs, opex, fileName }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderShape = (props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, index } = props;
        const isActive = index === activeIndex;

        if (isActive) {
            return (
                <g>
                    <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="font-sans font-bold text-lg drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                        {payload.name}
                    </text>
                    <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#fff" className="font-mono text-sm opacity-80">
                        {`$${value}k (${(percent * 100).toFixed(0)}%)`}
                    </text>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 8} // detached/extruded by expanding outer radius
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        style={{ filter: `drop-shadow(0 0 10px ${fill})` }}
                        className="transition-all duration-300 ease-out"
                    />
                </g>
            );
        }

        return (
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                style={{ filter: `drop-shadow(0 0 10px rgba(0,0,0,0.2))` }}
                className="transition-all duration-300 ease-out"
            />
        );
    };

    // Simulated data generation influenced by inputs
    const fileHash = fileName ? fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 100;
    const baseMultiplier = 1 + (fileHash % 5) * 0.2;

    const pieData = [
        { name: 'R&D', value: Math.round(400 * baseMultiplier * (1 + (opex / 100))) },
        { name: 'Sales & Mkt', value: Math.round(300 * baseMultiplier * (1 + (opex / 100))) },
        { name: 'G&A', value: Math.round(300 * baseMultiplier) },
        { name: 'COGS', value: Math.round(200 * baseMultiplier * (cogs / 30)) }, // loosely scale with cogs slider
    ];

    // Waterfall Data (simulated MoM Revenue increase)
    const waterfallData = React.useMemo(() => {
        let currentRev = 1000 * baseMultiplier;
        const pts = [];
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

        // Base starting point
        pts.push({ name: 'Start', base: 0, growth: currentRev, isTotal: true });

        quarters.forEach(q => {
            const added = currentRev * (growth / 100) * 0.25; // distribute annual growth 
            pts.push({ name: q, base: currentRev, growth: added, isTotal: false });
            currentRev += added;
        });

        pts.push({ name: 'End', base: 0, growth: currentRev, isTotal: true });

        return pts.map(p => ({
            ...p,
            baseRound: Math.round(p.base),
            growthRound: Math.round(p.growth)
        }));
    }, [growth, baseMultiplier]);

    return (
        <div className="grid grid-cols-2 gap-6 w-full">
            <div className="glass-panel p-6 h-[350px] flex flex-col">
                <h3 className="text-xl font-sans font-bold text-white mb-2">Expense Breakdown</h3>
                <div className="flex-1 w-full mx-auto relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                shape={renderShape}
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                                stroke="rgba(0,0,0,0.2)"
                                strokeWidth={2}
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-panel p-6 h-[350px] flex flex-col">
                <h3 className="text-xl font-sans font-bold text-white mb-6">Growth Waterfall</h3>
                <div className="flex-1 w-full mx-auto relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={waterfallData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'Inter' }} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
                            <Tooltip content={<CustomWaterfallTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            {/* The invisible base bar lifts the growth bar */}
                            <Bar dataKey="baseRound" stackId="a" fill="transparent" />
                            {/* The visible bar */}
                            <Bar dataKey="growthRound" stackId="a" radius={[2, 2, 2, 2]}>
                                {
                                    waterfallData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.isTotal ? '#00F0FF' : '#39FF14'} />
                                    ))
                                }
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
