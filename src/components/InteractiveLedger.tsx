import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveLedgerProps {
    growth: number;
    cogs: number;
    opex: number;
    fileName: string;
}

export const InteractiveLedger: React.FC<InteractiveLedgerProps> = ({ growth, cogs, opex, fileName }) => {
    // Basic hash of filename for varied base numbers
    const fileHash = fileName ? fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 100;
    const baseMultiplier = 1 + (fileHash % 5) * 0.2; // Varies base numbers 1x to 1.8x

    // Generate dynamic Q1-Q4 based on assumptions
    const data = React.useMemo(() => {
        const revBase = 165000 * baseMultiplier;

        return [1, 2, 3, 4].map((q) => {
            const currentGrowth = 1 + ((growth / 100) * (q - 1));
            const rev = revBase * currentGrowth;
            const cogsVal = rev * (cogs / 100);
            const gp = rev - cogsVal;
            const baseOpex = 85000 * baseMultiplier;
            const currentOpex = baseOpex * (1 + ((opex / 100) * (q - 1)));
            const ebitda = gp - currentOpex;

            const format = (n: number) => `$${Math.round(n).toLocaleString()}`;
            const formatNeg = (n: number) => `($${Math.round(n).toLocaleString()})`;

            return {
                rev: format(rev),
                cogs: formatNeg(cogsVal),
                gp: format(gp),
                opex: formatNeg(currentOpex),
                ebitda: format(ebitda)
            };
        });
    }, [growth, cogs, opex, baseMultiplier]);

    const displayData = [
        { item: "Software Subscriptions", q1: `$${Math.round(120000 * baseMultiplier).toLocaleString()}`, q2: `$${Math.round(135000 * baseMultiplier).toLocaleString()}`, q3: `$${Math.round(150000 * baseMultiplier).toLocaleString()}`, q4: `$${Math.round(168000 * baseMultiplier).toLocaleString()}` },
        { item: "Total Revenue", q1: data[0].rev, q2: data[1].rev, q3: data[2].rev, q4: data[3].rev, isBold: true },
        { item: "Cost of Goods Sold", q1: data[0].cogs, q2: data[1].cogs, q3: data[2].cogs, q4: data[3].cogs },
        { item: "Gross Profit", q1: data[0].gp, q2: data[1].gp, q3: data[2].gp, q4: data[3].gp, isBold: true },
        { item: "Operating Expenses", q1: data[0].opex, q2: data[1].opex, q3: data[2].opex, q4: data[3].opex },
        { item: "EBITDA", q1: data[0].ebitda, q2: data[1].ebitda, q3: data[2].ebitda, q4: data[3].ebitda, isBold: true },
    ];
    return (
        <div className="glass-panel w-full flex flex-col relative group">
            {/* Follow cursor gradient overlay concept */}

            <div className="p-6 border-b border-glass-border">
                <h3 className="text-xl font-sans font-bold text-white">Income Statement</h3>
            </div>

            <div className="flex-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-charcoal/80 backdrop-blur-md z-10 border-b border-glass-border">
                        <tr>
                            <th className="py-4 px-6 text-white/50 font-sans text-sm font-medium uppercase tracking-wider">Line Item</th>
                            <th className="py-4 px-6 text-white/50 font-sans text-sm font-medium uppercase tracking-wider text-right">Q1</th>
                            <th className="py-4 px-6 text-white/50 font-sans text-sm font-medium uppercase tracking-wider text-right">Q2</th>
                            <th className="py-4 px-6 text-white/50 font-sans text-sm font-medium uppercase tracking-wider text-right">Q3</th>
                            <th className="py-4 px-6 text-white/50 font-sans text-sm font-medium uppercase tracking-wider text-right">Q4</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                        {displayData.map((row, idx) => (
                            <motion.tr
                                key={row.item}
                                className={`group/row transition-colors duration-200 cursor-pointer ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                                    }`}
                                whileHover={{ backgroundColor: "rgba(138,43,226,0.15)" }}
                            >
                                <td className={`py-3 px-6 text-white/80 font-sans group-hover/row:text-white transition-colors ${row.isBold ? 'font-bold text-white' : ''}`}>
                                    {row.item}
                                </td>
                                <td className={`py-3 px-6 text-right transition-colors ${row.isBold ? 'font-bold text-accent-cyan' : 'text-white/60 group-hover/row:text-accent-cyan/80'}`}>
                                    {row.q1}
                                </td>
                                <td className={`py-3 px-6 text-right transition-colors ${row.isBold ? 'font-bold text-accent-cyan' : 'text-white/60 group-hover/row:text-accent-cyan/80'}`}>
                                    {row.q2}
                                </td>
                                <td className={`py-3 px-6 text-right transition-colors ${row.isBold ? 'font-bold text-accent-cyan' : 'text-white/60 group-hover/row:text-accent-cyan/80'}`}>
                                    {row.q3}
                                </td>
                                <td className={`py-3 px-6 text-right transition-colors ${row.isBold ? 'font-bold text-accent-cyan' : 'text-white/60 group-hover/row:text-accent-cyan/80'}`}>
                                    {row.q4}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
