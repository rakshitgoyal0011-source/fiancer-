import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KpiRow } from './KpiRow';
import { InteractiveLedger } from './InteractiveLedger';
import { HeroChart } from './HeroChart';
import { SecondaryVisuals } from './SecondaryVisuals';
import { EditPanel } from './EditPanel';

export interface DashboardProps {
    isEditing: boolean;
    fileName: string;
    growth: number; setGrowth: (v: number) => void;
    cogs: number; setCogs: (v: number) => void;
    opex: number; setOpex: (v: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
    isEditing, fileName,
    growth, setGrowth,
    cogs, setCogs,
    opex, setOpex
}) => {
    return (
        <div className="w-full h-full flex relative overflow-hidden mt-6">
            <motion.div
                id="dashboard-content"
                className="flex-1 overflow-y-auto px-8 pb-8 space-y-6 scrollbar-hide"
                animate={{
                    scale: isEditing ? 0.95 : 1,
                    opacity: isEditing ? 0.7 : 1,
                    x: isEditing ? -100 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div id="pdf-content" className="space-y-6 w-full pt-4 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <KpiRow growth={growth} cogs={cogs} opex={opex} fileName={fileName} />
                    </motion.div>

                    <motion.div
                        className="flex space-x-6 items-stretch"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* 60% Width */}
                        <div className="w-[60%] flex flex-col">
                            <InteractiveLedger growth={growth} cogs={cogs} opex={opex} fileName={fileName} />
                        </div>
                        {/* 40% Width */}
                        <div className="w-[40%] flex flex-col">
                            <HeroChart growth={growth} cogs={cogs} opex={opex} fileName={fileName} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <SecondaryVisuals growth={growth} cogs={cogs} opex={opex} fileName={fileName} />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isEditing && (
                    <EditPanel
                        growth={growth} setGrowth={setGrowth}
                        cogs={cogs} setCogs={setCogs}
                        opex={opex} setOpex={setOpex}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
