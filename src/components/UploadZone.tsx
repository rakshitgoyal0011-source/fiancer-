import React, { useState } from 'react';

interface UploadZoneProps {
    onUploadStart: (fileName?: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUploadStart }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const processFile = (file: File) => {
        setUploadedFile(file);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    onUploadStart(file.name);
                }, 500);
            }
        }, 50);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {uploadedFile && (
                <div className="absolute top-6 right-8 z-50 flex items-start gap-3">
                    <div className="glass-panel rounded-lg p-3 w-64 border border-white/10 shadow-lg animate-fade-in-up">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Upload Status Monitor</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: #8829</span>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                    <span className="text-slate-200 truncate w-32">Processing {uploadedFile.name}</span>
                                    <span className="text-primary font-bold">{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full rounded-full shadow-[0_0_8px_#0ddff2] transition-all duration-75" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                                <span className="text-[11px] text-slate-400">System check: Optimized</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="glass-panel p-2.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>
                        <button className="glass-panel p-2.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-xl">help</span>
                        </button>
                    </div>
                </div>
            )}

            <header className="w-full px-8 pt-8 pb-4">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Initiate Data Model</h2>
                    <p className="text-slate-400 text-sm mt-1 max-w-xl leading-relaxed">System architecture ready. Consolidate your quarterly datasets to generate refined fiscal projections.</p>
                </div>
            </header>

            <div className="flex-1 px-8 py-4">
                <div className="w-full max-w-5xl">
                    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl">
                        <div className="bg-surface-dark/30 p-10 flex flex-col items-center">

                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".xlsx,.xls,.csv,.pdf,.json"
                                onChange={handleFileInput}
                            />

                            <label
                                htmlFor="file-upload"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`w-full border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-700/50 hover:border-primary/50 bg-white/[0.02]'} transition-all duration-300 rounded-xl p-10 flex flex-col items-center gap-6 cursor-pointer group`}
                            >
                                <div className="w-16 h-16 rounded-xl bg-surface-dark border border-white/5 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(13,223,242,0.2)] transition-all">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">upload_file</span>
                                </div>

                                <div className="space-y-1 text-center">
                                    <h3 className="text-xl font-bold text-white tracking-tight">Deploy Your Financial Datasets</h3>
                                    <p className="text-slate-400 text-xs">Batch support for .XLSX, .CSV, .JSON (System capacity: 50MB per instance)</p>
                                </div>

                                <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                                    <div className="w-full bg-white text-slate-950 hover:bg-primary transition-all font-bold text-xs py-3 rounded-lg uppercase tracking-widest shadow-lg shadow-primary/10 text-center">
                                        Browse Files
                                    </div>

                                    <div className="w-full mt-4 bg-black/20 rounded-xl p-1 border border-white/5" onClick={(e) => e.preventDefault()}>
                                        <div className="flex items-center justify-between p-2 mb-1 border-b border-white/5">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase px-2 tracking-wider">Queue History</span>
                                            <span className="text-[10px] text-primary/60 cursor-pointer hover:text-primary transition-colors">Clear all</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group/item cursor-default">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary/70 text-lg">draft</span>
                                                    <div className="text-left leading-tight">
                                                        <p className="text-[12px] text-slate-200 font-semibold truncate w-40">Q3_Revenue_Model.xlsx</p>
                                                        <p className="text-[10px] text-slate-500">2.4 MB • 2h ago</p>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-600 group-hover/item:text-white cursor-pointer text-sm">close</span>
                                            </div>

                                            <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group/item cursor-default">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-accent-violet/70 text-lg">table_rows</span>
                                                    <div className="text-left leading-tight">
                                                        <p className="text-[12px] text-slate-200 font-semibold truncate w-40">Market_Analysis_2023.csv</p>
                                                        <p className="text-[10px] text-slate-500">856 KB • 1d ago</p>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-600 group-hover/item:text-white cursor-pointer text-sm">close</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
