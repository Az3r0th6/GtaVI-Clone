import React from 'react';

export function ViLogoSvg({ className = 'w-11 h-8' }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 46 35"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M46.2661 0.800781H34.7236V34.4008H46.2661V0.800781Z" fill="currentColor" />
      <path
        d="M33.9162 0.800781L17.3358 34.4008L0.776855 0.800781H12.3139L17.3332 11.5445L22.3766 0.800781H33.9162Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RockstarStarSvg({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46158 8.24829H9.43888C10.7887 8.24829 11.9568 7.83799 11.9568 6.33698C11.9568 5.14605 10.9311 4.89311 9.94489 4.89311H7.1748L6.46158 8.24829ZM18.252 16.2711H23L18.7152 19.2304L19.4081 23.8935L15.6956 21.0792L10.7134 24L13.0429 19.0576C13.0429 19.0576 10.3333 16.2384 10.3355 16.2384C10.1533 15.9985 10.0924 15.3804 10.0924 15.1145C10.0924 14.7783 10.114 14.4378 10.1369 14.0751C10.163 13.6619 10.1909 13.2199 10.1909 12.7227C10.1909 11.4958 9.64767 10.8542 8.31965 10.8542H5.82976L4.74562 15.9186H1L3.97871 2H11.0275C13.6468 2 15.646 2.64299 15.646 5.60795C15.646 7.69498 14.6166 9.17746 12.3456 9.48874V9.52873C13.4135 9.78202 13.8135 10.5027 13.8135 11.8459C13.8135 12.3821 13.7972 12.8526 13.7818 13.2953C13.7681 13.6882 13.7553 14.0592 13.7553 14.4344C13.7553 14.9154 13.8805 15.7015 14.196 16.2384H14.7164L17.4989 11.6004L18.252 16.2711ZM17.6626 16.9514H20.8136L17.9728 18.9127L18.4804 22.3323L15.747 20.2582L12.2768 22.2913L13.8654 18.9255L11.9338 16.9183H15.1096L17.1185 13.5697L17.6626 16.9514Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ScrollChevronSvg({ className = 'w-8 h-3.5' }: { className?: string }) {
  return (
    <svg
      width="34"
      height="14"
      viewBox="0 0 34 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlayCircleSvg({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="20" cy="20" r="20" fill="white" className="opacity-95 group-hover:opacity-100 transition-opacity" />
      <path
        d="M16.8988 14.426C16.7193 14.3106 16.4911 14.3024 16.3038 14.4047C16.1165 14.5069 16 14.7033 16 14.9167V25.4167C16 25.6301 16.1165 25.8264 16.3038 25.9287C16.4911 26.0309 16.7193 26.0227 16.8988 25.9074L25.0654 20.6574C25.2324 20.55 25.3333 20.3652 25.3333 20.1667C25.3333 19.9682 25.2324 19.7833 25.0654 19.676L16.8988 14.426Z"
        fill="#11101d"
      />
    </svg>
  );
}

export function ArrowRightSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13L5 13C4.44771 13 4 12.5523 4 12C4 11.4477 4.44771 11 5 11L16.5858 11L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Ps5BadgeSvg({ className = 'h-4 w-auto' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 93 20"
      className={className}
      aria-label="PlayStation 5"
    >
      <path d="M8.5 3.2V16.8L12.1 18V5.9C12.1 5.1 12.5 4.7 13.2 4.9L15.8 5.7C17.6 6.3 18.6 5.4 18.6 3.5C18.6 1.6 17.4 0.4 15.5 -0.2L8.5 3.2Z" />
      <text x="24" y="15" fill="currentColor" fontSize="13.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="1.5">
        PS5
      </text>
    </svg>
  );
}

export function XboxBadgeSvg({ className = 'h-4 w-auto' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 158 20"
      className={className}
      aria-label="Xbox Series X|S"
    >
      <path d="M10.5 8.02C13.52 10.31 18.64 15.94 17.08 17.53C15.32 19.07 13.02 20 10.5 20C7.98 20 5.68 19.07 3.92 17.53C2.36 15.94 7.48 10.31 10.47 8.04L10.5 8.02ZM15.71 1.46C14.18 0.55 12.52 0 10.5 0C8.48 0 6.82 0.55 5.29 1.46C7.26 1.11 10.2 2.78 10.48 2.95H10.52C10.8 2.78 13.74 1.11 15.68 1.53L15.71 1.46ZM3.5 2.87C1.63 4.71 0.5 7.22 0.5 10C0.5 12.28 1.26 14.38 2.54 16.06C1.84 13.67 5.74 7.96 7.75 5.56C4.7 2.46 3.67 2.78 3.5 2.87ZM13.25 5.49C15.25 7.95 19.15 13.66 18.39 16.02C19.73 14.37 20.49 12.27 20.49 9.99C20.49 7.22 19.36 4.7 17.53 2.89C17.32 2.77 16.29 2.45 13.24 5.49H13.25Z" />
      <text x="26" y="14.5" fill="currentColor" fontSize="11.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="1.2">
        XBOX SERIES X|S
      </text>
    </svg>
  );
}
