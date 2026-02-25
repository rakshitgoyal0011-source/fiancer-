import React from 'react';

interface SidebarProps {
    onNewUpload: () => void;
    onHistoryToggle: () => void;
    onSettingsToggle: () => void;
    onAnalytics: () => void;
    onProjects: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewUpload, onHistoryToggle, onSettingsToggle, onAnalytics, onProjects }) => {
    return (
        <aside className="glass-sidebar w-64 flex-shrink-0 flex flex-col justify-between h-full z-20">
            <div className="flex flex-col h-full p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDi9KW7NA8SlinMYB8dkdFZxmFksrvJwveuls9mAfIbuoXUJdNZoHwhSm-PydWnLQhtkPf89TnR2YzbNt_Z8_K9tEQp35g2tsZ2HM2JKMyNO3M_H1X-hiVZZJYHVZy-sHWghXCLCcDJbfYK1qBUMCY-zIuT1alyWNSzbtVFA1xwadvacA9yjWmXKgE22goXBH1p3B9yfgRJg7ceWmpvw3VGjjqLlOL_m5PfyzUxvK-AVLVKlZXBM5jCIyMPeuYsfZMpwp2Bsiqd44")' }}></div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-tight">Financer</h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">Analyst View</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    <button onClick={onNewUpload} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-white hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-primary text-xl">add_box</span>
                        <p className="text-sm font-semibold">New Model</p>
                    </button>
                    <button onClick={onHistoryToggle} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-xl">history</span>
                        <p className="text-sm font-medium">History</p>
                    </button>
                    <button onClick={onAnalytics} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-xl">analytics</span>
                        <p className="text-sm font-medium">Analytics</p>
                    </button>
                    <button onClick={onProjects} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-xl">folder_open</span>
                        <p className="text-sm font-medium">Projects</p>
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
                    <button onClick={onSettingsToggle} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 w-full transition-colors text-left">
                        <span className="material-symbols-outlined text-xl">settings</span>
                        <p className="text-sm font-medium">Settings</p>
                    </button>
                    <button className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 w-full transition-colors text-left">
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <p className="text-sm font-medium">Log Out</p>
                    </button>
                </div>
            </div>
        </aside>
    );
};
