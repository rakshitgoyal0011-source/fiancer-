import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Calendar } from 'lucide-react';

interface HistoryPanelProps {
    onClose: () => void;
    onLoadHistory?: (fileName: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose, onLoadHistory }) => {
    const historyData = [
        { id: 1, name: "Q3_Financials_Draft.pdf", date: "Oct 12, 2026", status: "Completed" },
        { id: 2, name: "Startup_Pitch_Y3.xlsx", date: "Sep 28, 2026", status: "Completed" },
        { id: 3, name: "Competitor_Analysis_Q2.pdf", date: "Aug 15, 2026", status: "Archived" },
        { id: 4, name: "Cap_Table_Seed_Round.csv", date: "Jul 02, 2026", status: "Completed" },
    ];

    return (
        <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[380px] h-[calc(100vh-80px)] glass-panel fixed left-16 top-0 z-40 p-6 flex flex-col overflow-y-auto border-l-0 rounded-l-none"
        >
            <div className="flex justify-between items-center mb-8 mt-4 w-full">
                <div>
                    <h2 className="text-2xl font-bold font-sans text-white mb-1">Model History</h2>
                    <p className="text-white/50 text-sm font-sans">Recently analyzed documents.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 shrink-0">
                    <X className="w-5 h-5 text-white/70" />
                </button>
            </div>

            <div className="space-y-4">
                {historyData.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onLoadHistory && onLoadHistory(item.name)}
                        className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-gradient-to-br from-accent-cyan/20 to-transparent rounded-lg shrink-0">
                                <FileText className="w-5 h-5 text-accent-cyan" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-sm truncate group-hover:text-accent-cyan transition-colors">{item.name}</h4>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Calendar className="w-3 h-3 text-white/40" />
                                    <span className="text-white/40 text-xs font-mono">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
