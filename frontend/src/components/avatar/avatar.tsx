import React from 'react';

/**
 * Helper to describe an SVG arc path from startAngle→endAngle (in degrees).
 * Returns a string you can feed into <path d="…" />.
 */
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180.0);
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

interface AvatarWithArcsProps {
  src: string;               // user photo URL
  size?: number;             // total SVG size in px
  strokeWidth?: number;      // arc stroke width in px
  style? : React.CSSProperties
}

export const AvatarWithArcs: React.FC<AvatarWithArcsProps> = ({
  src,
  size = 40,
  strokeWidth = 3,
}) => {
  const center = size / 2;
  // Make sure the image radius + stroke fits inside
  const imgRadius = center - strokeWidth;
  const arcRadius = center - strokeWidth / 2;

  // Define your arcs
  const goldArc = describeArc(
    center, center, arcRadius,
    /* 1° → 179° */ 3, 177
  );
  const blueArc = describeArc(
    center, center, arcRadius,
    /* 181° → 359° */ 183, 357
  );

  return (
    <svg
      width={size}
      height={size}
      style={{ cursor: 'pointer' }}
    >
      {/* Clip path for circular cropping */}
      <defs>
        <clipPath id="avatar-clip">
          <circle
            cx={center}
            cy={center}
            r={imgRadius}
          />
        </clipPath>
      </defs>

      {/* User photo, cropped to circle */}
      <image
        href={src}
        x={center - imgRadius}
        y={center - imgRadius}
        width={2 * imgRadius}
        height={2 * imgRadius}
        clipPath="url(#avatar-clip)"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Blue arc (181°→359°) */}
      <path
        d={blueArc}
        stroke="#002f5f"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Gold arc (1°→179°) */}
      <path
        d={goldArc}
        stroke="#eeaf30"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};
