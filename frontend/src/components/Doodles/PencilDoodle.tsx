import React from 'react';

interface PencilDoodleProps {
    size?: number;
    color?: string;
}

const PencilDoodle: React.FC<PencilDoodleProps> = ({
    size = 40,
    color = '#FF8C42',
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M28 6L36 14L14 36L6 42L8 34L28 6Z"
            fill={color}
            stroke="#1A1A1A"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        <path
            d="M28 6L36 14"
            stroke="#1A1A1A"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <path
            d="M6 42L8 34L14 36L6 42Z"
            fill="#1A1A1A"
        />
        <path
            d="M30 8L34 12"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

export default PencilDoodle;
