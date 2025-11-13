interface Props {
    terminalOne: string;
    terminalTwo: string;
    sealOne: string;
    sealTwo: string;
    wire: string;
    wireName: string;
}

export default function OneWireLeadset({ terminalOne, terminalTwo, sealOne, sealTwo, wire, wireName }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="913" height="90" viewBox="0 0 913 60" fill="none">
            {terminalOne && <rect x="82" y="10" width="16" height="21" fill="#D9D9D9" />}
            {terminalTwo && <rect x="831" y="31.0001" width="16" height="21" transform="rotate(180 831 31.0001)" fill="#D9D9D9" />}
            <path d="M61 20L852 20.0001" stroke="#FFA600" strokeWidth="8" />
            <path d="M85.5 20.5H828" stroke="black" strokeWidth="20" />
            <path d="M85.5 20.5H828" stroke="white" strokeWidth="8" />
            {wire && (
                <text x="45%" y="55" fill="#7C7C7C" fontSize="16">
                    {wire}
                </text>
            )}
            {wireName && (
                <text x="420" y="-2" fill="#7C7C7C" fontSize="16">
                    {wireName}
                </text>
            )}
            {sealOne && (
                <g>
                    <path
                        d="M114 5C114.552 5 115 5.44777 115 6V35C115 35.5523 114.552 36 114 36H110C109.448 36 109 35.5523 109 35V33H108V34C108 34.5523 107.552 35 107 35H106C105.448 35 105 34.5523 105 34V32H88V9H105V7C105 6.44777 105.448 6 106 6H107C107.552 6 108 6.44777 108 7V8H109V6C109 5.44777 109.448 5 110 5H114Z"
                        fill="#333333"
                    />
                    <text x="80 " y="-2" fill="#7C7C7C" fontSize="16">
                        {sealOne}
                    </text>
                </g>
            )}
            {sealTwo && (
                <g>
                    <path
                        d="M800 36C799.448 36 799 35.5522 799 35L799 6C799 5.44772 799.448 5 800 5L804 5C804.552 5 805 5.44772 805 6L805 8L806 8L806 7C806 6.44772 806.448 6 807 6L808 6C808.552 6 809 6.44772 809 7L809 9L826 9L826 32L809 32L809 34C809 34.5522 808.552 35 808 35L807 35C806.448 35 806 34.5522 806 34L806 33L805 33L805 35C805 35.5522 804.552 36 804 36L800 36Z"
                        fill="#333333"
                    />
                    <text x="750 " y="-2" fill="#7C7C7C" fontSize="16">
                        {sealTwo}
                    </text>
                </g>
            )}
            {terminalOne && (
                <g>
                    <rect x="67" y="13" width="15" height="14" fill="#D9D9D9" />
                    <rect x="67" y="19.5" width="15" height="1" fill="#7C7C7C" />
                    <rect width="70" height="40" rx="20" fill="#D9D9D9" />
                    <rect x="92" y="7" width="11" height="27" fill="#D9D9D9" />
                    <rect x="92" y="20" width="11" height="1" fill="#7C7C7C" />
                    <text x="10 " y="60" fill="#7C7C7C" fontSize="16">
                        {terminalOne}
                    </text>
                </g>
            )}
            {terminalTwo && (
                <g>
                    <rect x="846" y="28.0001" width="15" height="14" transform="rotate(180 846 28.0001)" fill="#D9D9D9" />
                    <rect x="846" y="21.5001" width="15" height="1" transform="rotate(180 846 21.5001)" fill="#7C7C7C" />
                    <rect x="913" y="41.0001" width="70" height="40" rx="20" transform="rotate(180 913 41.0001)" fill="#D9D9D9" />
                    <rect x="821" y="34.0001" width="11" height="27" transform="rotate(180 821 34.0001)" fill="#D9D9D9" />
                    <rect x="821" y="21.0001" width="11" height="1" transform="rotate(180 821 21.0001)" fill="#7C7C7C" />
                    <text x="820 " y="60" fill="#7C7C7C" fontSize="16">
                        {terminalTwo}
                    </text>
                </g>
            )}
        </svg>
    );
}
