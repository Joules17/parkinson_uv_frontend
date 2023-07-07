const Logo = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_10)">
                    <path d="M118.975 275.001C112.851 255.028 103.611 240.139 91.2569 230.332C72.725 215.623 43.2802 224.765 32.4036 209.593C21.527 194.421 40.0239 166.519 46.5146 150.056C53.0054 133.594 21.6362 127.773 25.2985 123.099C27.7401 119.983 43.5919 110.992 72.8544 96.1256C81.1687 48.7091 111.88 25.0009 164.989 25.0009C244.651 25.0009 275 92.5381 275 135.494C275 178.45 238.251 224.727 185.901 234.705C181.219 241.522 187.971 254.954 206.155 275.001" stroke="black" strokeWidth="4.66685" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M121.873 90.625C117.79 106.464 119.005 117.586 125.518 123.991C132.031 130.396 143.132 134.584 158.82 136.556C155.261 156.985 159.601 166.569 171.839 165.308C184.077 164.047 191.431 158.961 193.899 150.052C213.026 155.428 223.392 150.929 224.998 136.556C227.407 114.996 215.781 97.7969 211.015 97.7969C206.248 97.7969 193.899 97.2169 193.899 90.625C193.899 84.0325 179.474 80.3081 166.456 80.3081C153.437 80.3081 161.272 71.5325 143.395 75C131.477 77.3113 124.303 82.5194 121.873 90.625Z" fill="#2F88FF" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M190.626 159.376C184.271 163.319 175.549 169.877 171.876 175.001C162.696 187.81 155.249 195.609 153.619 203.801" stroke="black" strokeWidth="4" strokeLinecap="round" />
                    <path d="M300 0H0V300H300V0Z" fill="white" fillOpacity="0.01" />
                </g>
                <defs>
                    <clipPath id="clip0_2_10">
                        <rect width="300" height="300" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>ParkinsonUV</span>
        </div>
    );
};

export default Logo;