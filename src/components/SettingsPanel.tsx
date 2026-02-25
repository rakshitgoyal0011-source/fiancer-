import React from 'react';
import { motion } from 'framer-motion';
import { X, Moon, Sun, User, Bell } from 'lucide-react';

interface SettingsPanelProps {
    onClose: () => void;
    isLightMode: boolean;
    onToggleLightMode: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose, isLightMode, onToggleLightMode }) => {
    const [toastMsg, setToastMsg] = React.useState<string | null>(null);

    const handleAction = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };
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
                    <h2 className="text-2xl font-bold font-sans text-white mb-1">Settings</h2>
                    <p className="text-white/50 text-sm font-sans">App preferences.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 shrink-0">
                    <X className="w-5 h-5 text-white/70" />
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-white/60 font-sans text-sm font-semibold tracking-wide mb-3 uppercase">Appearance</h3>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {isLightMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-white/70" />}
                            <span className="text-white font-medium text-sm">{isLightMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </div>
                        <button
                            onClick={onToggleLightMode}
                            className={`w-10 h-5 rounded-full relative transition-colors ${isLightMode ? 'bg-amber-400' : 'bg-accent-cyan'}`}
                        >
                            <div className={`absolute top-1 w-3 h-3 bg-obsidian rounded-full transition-all ${isLightMode ? 'left-1' : 'right-1'}`}></div>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-white/60 font-sans text-sm font-semibold tracking-wide mb-3 uppercase">Account</h3>
                    <div className="space-y-2 relative">
                        {toastMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-12 left-0 right-0 bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan text-xs text-center py-2 rounded-lg font-mono z-50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                            >
                                {toastMsg}
                            </motion.div>
                        )}
                        <button
                            onClick={() => handleAction("Profile management coming soon in v2.0.")}
                            className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] flex items-center space-x-3 transition-colors text-left"
                        >
                            <User className="w-5 h-5 text-white/70" />
                            <span className="text-white font-medium text-sm">Profile Details</span>
                        </button>
                        <button
                            onClick={() => handleAction("Notification preferences are disabled for this preview.")}
                            className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] flex items-center space-x-3 transition-colors text-left"
                        >
                            <Bell className="w-5 h-5 text-white/70" />
                            <span className="text-white font-medium text-sm">Notifications</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
