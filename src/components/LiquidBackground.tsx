import React from 'react';

export const LiquidBackground: React.FC = () => {
    return (
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="15" />
                    <feColorMatrix in="blur" mode="matrix" result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>
            <div className="liquid-container pointer-events-none">
                <div className="void-blob w-[800px] h-[800px] top-[-20%] left-[-10%] animate-blob-flow"></div>
                <div className="void-blob w-[900px] h-[900px] bottom-[-30%] right-[-20%] animate-blob-flow-reverse"></div>

                <div className="absolute inset-0 gooey-filter opacity-90">
                    <div className="metallic-blob w-[400px] h-[400px] top-[20%] left-[25%] animate-blob-bounce animate-liquid-morph"></div>
                    <div className="metallic-blob w-[350px] h-[350px] bottom-[20%] right-[30%] animate-blob-flow animate-liquid-morph" style={{ animationDelay: '-5s' }}></div>
                    <div className="metallic-blob w-[250px] h-[250px] top-[40%] right-[20%] animate-blob-flow-reverse animate-liquid-morph" style={{ animationDelay: '-2s', background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.8), rgba(13, 223, 242, 0.4), rgba(5, 11, 12, 0.9))' }}></div>
                </div>

                <div className="absolute inset-0 blur-3xl opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400 rounded-full mix-blend-overlay animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500 rounded-full mix-blend-overlay animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>
        </>
    );
};
