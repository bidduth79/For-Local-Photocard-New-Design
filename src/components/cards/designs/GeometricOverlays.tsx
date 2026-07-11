import React from 'react';
import { useAppContext } from '../../../context/AppContext';

interface ShapeProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  opacity?: number;
  strokeWidth?: number | string;
}

export const GeometricCircle: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2, strokeWidth = "2" }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth={strokeWidth} fill="none" />
  </svg>
);

export const GeometricSolidCircle: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <circle cx="50" cy="50" r="45" fill={color} />
  </svg>
);

export const GeometricDottedCircle: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" fill="none" strokeDasharray="4 4" />
  </svg>
);

export const GeometricSquare: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <rect x="10" y="10" width="80" height="80" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

export const GeometricTriangle: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <path d="M50 10 L90 90 L10 90 Z" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

export const GeometricCross: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <path d="M50 20 V80 M20 50 H80" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const GeometricDots: React.FC<ShapeProps & { rows?: number; cols?: number }> = ({ 
  className, style, color = 'white', opacity = 0.2, rows = 4, cols = 4 
}) => (
  <svg viewBox={`0 0 ${cols * 20} ${rows * 20}`} className={className} style={{ ...style, opacity }}>
    {Array.from({ length: rows }).map((_, r) => 
      Array.from({ length: cols }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="3" fill={color} />
      ))
    )}
  </svg>
);

export const GeometricZigzag: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 40" className={className} style={{ ...style, opacity }}>
    <path d="M0 20 L10 10 L20 30 L30 10 L40 30 L50 10 L60 30 L70 10 L80 30 L90 10 L100 20" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round" />
  </svg>
);

export const GeometricHexagon: React.FC<ShapeProps> = ({ className, style, color = 'white', opacity = 0.2 }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    <path d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 Z" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

export const GeometricParallelLines: React.FC<ShapeProps & { count?: number }> = ({ 
  className, style, color = 'white', opacity = 0.2, count = 5 
}) => (
  <svg viewBox={`0 0 100 ${count * 10}`} className={className} style={{ ...style, opacity }}>
    {Array.from({ length: count }).map((_, i) => (
      <line key={i} x1="0" y1={i * 10 + 5} x2="100" y2={i * 10 + 5} stroke={color} strokeWidth="2" />
    ))}
  </svg>
);

export const GeometricCircleDots: React.FC<ShapeProps & { count?: number }> = ({ 
  className, style, color = 'white', opacity = 0.2, count = 12 
}) => (
  <svg viewBox="0 0 100 100" className={className} style={{ ...style, opacity }}>
    {Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const x = 50 + 40 * Math.cos(angle);
      const y = 50 + 40 * Math.sin(angle);
      return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
    })}
  </svg>
);

export const GeometricOverlay: React.FC<{ color?: string; opacity?: number }> = ({ color = 'white', opacity = 1 }) => {
  const { geometricShapesConfig } = useAppContext();

  if (geometricShapesConfig && geometricShapesConfig.length > 0) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
        {geometricShapesConfig.map((shape, i) => {
          const props = {
            className: "absolute",
            style: {
              top: shape.top,
              bottom: shape.bottom,
              left: shape.left,
              right: shape.right,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `rotate(${shape.rotation}deg)`,
              opacity: shape.opacityMultiplier
            },
            color: color,
            opacity: 1 // base opacity is handled by the wrapper and style
          };

          switch (shape.type) {
            case 'circle': return <GeometricCircle key={i} {...props} />;
            case 'cross': return <GeometricCross key={i} {...props} />;
            case 'hexagon': return <GeometricHexagon key={i} {...props} />;
            case 'square': return <GeometricSquare key={i} {...props} />;
            case 'dots': return <GeometricDots key={i} {...props} rows={Math.ceil(shape.size/20)} cols={Math.ceil(shape.size/20)} />;
            case 'parallelLines': return <GeometricParallelLines key={i} {...props} count={Math.ceil(shape.size/10)} />;
            case 'triangle': return <GeometricTriangle key={i} {...props} />;
            case 'zigzag': return <GeometricZigzag key={i} {...props} />;
            case 'circleDots': return <GeometricCircleDots key={i} {...props} count={Math.ceil(shape.size/10)} />;
            case 'dottedCircle': return <GeometricDottedCircle key={i} {...props} />;
            case 'solidCircle': return <GeometricSolidCircle key={i} {...props} />;
            default: return null;
          }
        })}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {/* Top Left Area */}
      <GeometricCircle className="absolute -top-10 -left-10 w-40 h-40" color={color} opacity={1} />
      <GeometricCross className="absolute top-20 left-40 w-8 h-8 rotate-45" color={color} opacity={1} />
      <GeometricHexagon className="absolute top-10 left-1/4 w-12 h-12" color={color} opacity={1} />
      
      {/* Top Right Area */}
      <GeometricSquare className="absolute top-10 right-10 w-32 h-32 rotate-12" color={color} opacity={1} />
      <GeometricDots className="absolute top-40 right-20 w-16 h-16" color={color} opacity={1} />
      <GeometricParallelLines className="absolute top-20 right-1/3 w-20 h-10 rotate-[135deg]" color={color} opacity={1} count={4} />
      
      {/* Middle Areas */}
      <GeometricTriangle className="absolute top-1/2 -left-10 w-24 h-24 -rotate-12" color={color} opacity={1} />
      <GeometricZigzag className="absolute top-1/3 right-1/4 w-32 h-12 rotate-12" color={color} opacity={1} />
      <GeometricCircleDots className="absolute top-1/2 right-10 w-20 h-20" color={color} opacity={1} />
      
      {/* Bottom Areas */}
      <GeometricDottedCircle className="absolute -bottom-20 right-1/3 w-64 h-64" color={color} opacity={1} />
      <GeometricCircle className="absolute -bottom-32 -right-20 w-[400px] h-[400px]" color={color} opacity={0.4} strokeWidth="10" />
      <GeometricDots className="absolute bottom-40 left-10 w-20 h-20" color={color} opacity={1} rows={5} cols={5} />
      <GeometricCross className="absolute bottom-20 right-20 w-12 h-12" color={color} opacity={1} />
      <GeometricHexagon className="absolute bottom-10 left-1/3 w-16 h-16 rotate-12" color={color} opacity={1} />
      
      {/* Floating accents */}
      <GeometricCircle className="absolute top-1/4 left-1/4 w-4 h-4" color={color} opacity={1} />
      <GeometricSquare className="absolute bottom-1/4 right-1/2 w-6 h-6 rotate-45" color={color} opacity={1} />
      <GeometricZigzag className="absolute bottom-1/3 left-1/4 w-24 h-8 -rotate-12" color={color} opacity={1} />
    </div>
  );
};
