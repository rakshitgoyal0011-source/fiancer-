import React, { useEffect, useState } from 'react';

interface KPICardProps {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    isPositive?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, prefix = "", suffix = "", isPositive = true }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const duration = 1500; // 1.5 seconds

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function: easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);

            setDisplayValue(value * easeProgress);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [value]);

    const formattedValue = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0
    }).format(displayValue);

    return (
        <div className="glass-panel p-6 flex flex-col justify-center">
            <div className="text-white/60 font-sans text-sm font-medium mb-2 uppercase tracking-wider">{label}</div>
            <div className={`text-4xl font-mono font-bold tracking-tight ${isPositive ? 'neon-text-cyan' : 'neon-text-violet'}`}>
                {prefix}{formattedValue}{suffix}
            </div>
        </div>
    );
};

export interface KpiRowProps {
    growth: number;
    cogs: number;
    opex: number;
    fileName: string;
}

export const KpiRow: React.FC<KpiRowProps> = ({ growth, cogs, opex, fileName }) => {
    const fileHash = fileName ? fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 100;
    const baseMultiplier = 1 + (fileHash % 5) * 0.2; // roughly 1x to 1.8x

    // Generate dynamic Kpis
    const rev = 1420000 * baseMultiplier * (1 + (growth / 100));

    // Base GM is 68.5%, but varies inversely with COGS. If COGS input is higher, GM is lower.
    // Default cogs slider is around 28.5. 
    const gm = 68.5 - (cogs - 28.5);

    // EBITDA varies with GM and OPEX. 
    // Defaults: gm=68.5, opex=-5. EBITDA base = 350k
    // If opex increases, ebitda decreases.
    const ebitda = 350000 * baseMultiplier * (1 + (growth / 100)) - (opex + 5) * 5000;

    // Net Income is EBITDA minus some fixed costs/taxes (roughly 60% of EBITDA)
    const netIncome = ebitda * 0.61;

    return (
        <div className="grid grid-cols-4 gap-6 w-full">
            <KPICard label="Total Revenue" value={Math.round(rev)} prefix="$" isPositive={true} />
            <KPICard label="Gross Margin" value={gm} suffix="%" isPositive={true} />
            <KPICard label="Net Income" value={Math.round(netIncome)} prefix="$" isPositive={netIncome >= 0} />
            <KPICard label="EBITDA" value={Math.round(ebitda)} prefix="$" isPositive={ebitda >= 0} />
        </div>
    );
};
