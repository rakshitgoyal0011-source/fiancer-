import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface HeaderProps {
    onEditToggle: () => void;
    isEditing: boolean;
    growth?: number;
    cogs?: number;
    opex?: number;
    fileName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onEditToggle, isEditing, growth, cogs, opex, fileName }) => {
    const [title, setTitle] = useState("Q4 Revenue Projections");
    const [exportOpen, setExportOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (type: string) => {
        setExportOpen(false);
        setIsExporting(true);

        try {
            if (type === 'PDF') {
                const element = document.getElementById('pdf-content');
                if (!element) throw new Error("Dashboard not found");

                const isLight = document.body.classList.contains('light-mode');

                const dataUrl = await toJpeg(element, {
                    quality: 0.95,
                    pixelRatio: 1.5,
                    backgroundColor: isLight ? '#F8FAFC' : '#0A0A0A',
                    style: {
                        transform: 'scale(1)',
                        transformOrigin: 'top left'
                    }
                });

                const pdfWidth = element.scrollWidth;
                const pdfHeight = element.scrollHeight;

                if (pdfWidth > 0 && pdfHeight > 0) {
                    const pdf = new jsPDF({
                        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [pdfWidth, pdfHeight]
                    });

                    pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`FINANCER_Export_${title.replace(/\s+/g, '_')}.pdf`);
                } else {
                    throw new Error("Canvas rendering failed, dimensions are 0.");
                }

            } else {
                // Excel / Text Fallback
                const content = `FINANCER EXPORT - ${type.toUpperCase()}\n\n` +
                    `Project: ${title}\n` +
                    `Source File: ${fileName || 'None'}\n` +
                    `------------------------\n` +
                    `Growth Assumption: ${growth}%\n` +
                    `COGS Margin: ${cogs}%\n` +
                    `Operating Expenses: ${opex}%\n\n` +
                    `Report generated on: ${new Date().toLocaleString()}`;

                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `FINANCER_Export_${title.replace(/\s+/g, '_')}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Export failed:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <header className="fixed top-0 left-16 right-0 h-20 px-8 flex items-center justify-between z-40 bg-obsidian/40 backdrop-blur-sm border-b border-glass-border">
            {/* Editable Project Title */}
            <div className="relative group flex items-center">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-transparent border-none text-2xl font-sans font-semibold text-white/90 focus:outline-none focus:text-white transition-colors w-[400px]"
                />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-accent-cyan/50 to-transparent scale-x-0 group-hover:scale-x-100 focus-within:scale-x-100 transition-transform origin-left duration-300" />
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-4 glass-panel px-2 py-2 rounded-full">
                <button
                    onClick={onEditToggle}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isEditing
                        ? 'bg-accent-violet/20 text-accent-violet border border-accent-violet/50 shadow-[0_0_15px_rgba(138,43,226,0.3)]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Edit Assumptions</span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => !isExporting && setExportOpen(!exportOpen)}
                        disabled={isExporting}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-bold border transition-all ${isExporting ? 'bg-white/5 text-white/50 border-white/10 cursor-not-allowed' : 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30 hover:border-accent-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'}`}
                    >
                        {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        <span>{isExporting ? 'Exporting...' : 'Export'}</span>
                        {!isExporting && <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Export Dropdown */}
                    {exportOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute top-12 right-0 glass-panel p-2 flex flex-col min-w-[160px] shadow-2xl z-50 rounded-xl"
                        >
                            <button
                                className="text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => handleExport('PDF')}
                            >
                                Styled PDF
                            </button>
                            <button
                                className="text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                onClick={() => handleExport('Excel')}
                            >
                                Unlocked Excel
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};
