'use client'

import Link from 'next/link'

type TLogo = {
  color?: string
  bgColor?: string
}

export default function Logo({
  color = '#000000',
  bgColor = '#ffea00',
}: TLogo) {
  return (
    <Link
      href="/"
      className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse"
    >
      <svg
        viewBox="0 0 60 60"
        x="0"
        y="0"
        width="30"
        height="30"
        className="image-svg-svg bn"
        style={{ overflow: 'visible' }}
      >
        <g>
          <g>
            <svg
              fill={bgColor}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
              version="1.1"
              x="0"
              y="0"
              style={{ overflow: 'visible' }}
              width="60"
              height="60"
            >
              <g transform="scale(1, 1) skewX(0)">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g fill={bgColor}>
                    <path d="M49.001,0 L10.999,0 C4.934,0 0,4.934 0,10.999 L0,49.001 C0,55.066 4.934,60 10.999,60 L49.001,60 C55.065,60 60,55.066 60,49.001 L60,10.999 C60,4.934 55.065,0 49.001,0"></path>
                  </g>
                </g>
              </g>
            </svg>
          </g>
          <g>
            <svg
              fill={color}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 65.88000000000001 50.976000000000006"
              width="40"
              height="40"
              x="10"
              y="10"
              className="image-svg-letter"
            >
              <path
                transform="translate(-3.9600000000000004 50.976000000000006)"
                d="M46.87-26.42L43.92-15.77L43.70-15.77L43.56-26.42L40.82-44.35L31.03-44.35L22.82-26.50L20.09-15.77L19.80-15.77L19.94-26.57L17.35-50.98L3.96-50.98L11.59 0L23.54 0L29.52-14.18L33.12-25.78L33.34-25.78L33.48-14.11L36.07 0L48.02 0L69.84-50.98L56.52-50.98Z"
              ></path>
            </svg>
          </g>
        </g>
      </svg>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        WEEKEND
      </span>
    </Link>
  )
}
