import { LOCATION_WIRES } from '@/lib/constants';
import { LocationWires } from '@/types';

interface ThreeWireLeadsetProps {
    leadsetOne: string;
    leadsetTwo: string;
    leadsetThree: string;
    terminalOne: string;
    terminalTwo: string;
    terminalThree: string;
    terminalFour: string;
    sealOne: string;
    sealFour: string;
    locationWiresTwo: string;
    locationWiresOne: string;
}

export default function ThreeWireLeadset({
    leadsetOne,
    leadsetTwo,
    leadsetThree,
    terminalOne,
    terminalTwo,
    terminalThree,
    terminalFour,
    locationWiresTwo,
    locationWiresOne,
}: ThreeWireLeadsetProps) {
    function isLocationWires(value: string): value is LocationWires {
        return value === 'inside' || value === 'near';
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="913" height="280" viewBox="0 0 913 250" fill="none">
            {terminalFour && (
                <rect x="831" y="241" width="16" height="21" transform="rotate(180 831 241)" fill="#D9D9D9">
                    <title>Контакт 4</title>
                </rect>
            )}
            {terminalTwo && (
                <rect x="831" y="31" width="16" height="21" transform="rotate(180 831 31)" fill="#D9D9D9">
                    <title>Контакт 2</title>
                </rect>
            )}
            {terminalOne && (
                <rect x="82" y="10" width="16" height="21" fill="#D9D9D9">
                    <title>Контакт 1</title>
                </rect>
            )}
            {terminalThree && (
                <rect x="82" y="220" width="16" height="21" fill="#D9D9D9">
                    <title>Контакт 3</title>
                </rect>
            )}
            <path d="M61 20L852 20.0001" stroke="#FFA600" strokeWidth="8" />
            <path d="M61 230C146.758 230 852 230 852 230L61 230Z" stroke="#FFA600" strokeWidth="8" />
            <path
                d="M827.817 20.5C664.075 20.5 597.57 109.5 439.37 129.53C281.17 149.561 212.65 230.5 79.6414 230.5"
                stroke="#FFA600"
                strokeWidth="8"
            />
            <text x="778 " y="-2" fill="#7C7C7C" fontSize="16">
                {isLocationWires(locationWiresOne) ? LOCATION_WIRES[locationWiresOne] : ''}
            </text>
            <path d="M85.5 20.5H828" stroke="black" strokeWidth="20" />
            <path d="M85.5 230.5C166 230.5 828 230.5 828 230.5H85.5Z" stroke="black" strokeWidth="20" />
            <path d="M85.5 230.5C166 230.5 828 230.5 828 230.5H85.5Z" stroke="white" strokeWidth="8" />
            <text x="90" y="260" fill="#7C7C7C" fontSize="16">
                {isLocationWires(locationWiresTwo) ? LOCATION_WIRES[locationWiresTwo] : ''}
            </text>
            <path d="M85.5 20.5H828" stroke="#f5f5f5" strokeWidth="8" />
            <path d="M828 20.5C665.5 20.5 599.5 109.5 442.5 129.53C285.5 149.561 217.5 230.5 85.5 230.5" stroke="green" strokeWidth="20" /> /// 111
            <path d="M828 20.5C665.5 20.5 599.5 109.5 442.5 129.53C285.5 149.561 217.5 230.5 85.5 230.5" stroke="#FF3F3F" strokeWidth="8" />
            {terminalOne && (
                <g>
                    <title>Контакт 1</title>
                    <rect x="67" y="13" width="15" height="14" fill="#D9D9D9" />
                    <rect x="67" y="19.5" width="15" height="1" fill="#7C7C7C" />
                    <rect y="3.05176e-05" width="70" height="40" rx="20" fill="#D9D9D9" />
                    <rect x="92" y="7" width="11" height="27" fill="#D9D9D9" />
                    <rect x="92" y="20" width="11" height="1" fill="#7C7C7C" />
                    <text x="0 " y="65" fill="#7C7C7C" fontSize="16">
                        {terminalOne}
                    </text>
                </g>
            )}
            {terminalTwo && (
                <g>
                    <title>Контакт 2</title>
                    <rect x="846" y="28" width="15" height="14" transform="rotate(180 846 28)" fill="#D9D9D9" />
                    <rect x="846" y="21.5" width="15" height="1" transform="rotate(180 846 21.5)" fill="#7C7C7C" />
                    <rect x="913" y="41" width="70" height="40" rx="20" transform="rotate(180 913 41)" fill="#D9D9D9" />
                    <rect x="821" y="34" width="11" height="27" transform="rotate(180 821 34)" fill="#D9D9D9" />
                    <rect x="821" y="21" width="11" height="1" transform="rotate(180 821 21)" fill="#7C7C7C" />
                    <text x="820 " y="65" fill="#7C7C7C" fontSize="16">
                        {terminalTwo}
                    </text>
                </g>
            )}
            {terminalFour && (
                <g>
                    <title>Контакт 4</title>
                    <rect x="846" y="238" width="15" height="14" transform="rotate(180 846 238)" fill="#D9D9D9" />
                    <rect x="846" y="231.5" width="15" height="1" transform="rotate(180 846 231.5)" fill="#7C7C7C" />
                    <rect x="913" y="251" width="70" height="40" rx="20" transform="rotate(180 913 251)" fill="#D9D9D9" />
                    <rect x="821" y="244" width="11" height="27" transform="rotate(180 821 244)" fill="#D9D9D9" />
                    <rect x="821" y="231" width="11" height="1" transform="rotate(180 821 231)" fill="#7C7C7C" />
                    <text x="820 " y="200" fill="#7C7C7C" fontSize="16">
                        {terminalFour}
                    </text>
                </g>
            )}
            {terminalThree && (
                <g>
                    <title>Контакт 3</title>
                    <rect x="67" y="223" width="15" height="14" fill="#D9D9D9" />
                    <rect x="67" y="229.5" width="15" height="1" fill="#7C7C7C" />
                    <rect y="210" width="70" height="40" rx="20" fill="#D9D9D9"></rect>
                    <rect x="92" y="217" width="11" height="27" fill="#D9D9D9" />
                    <rect x="92" y="230" width="11" height="1" fill="#7C7C7C" />
                    <text x="0" y="200" fill="#7C7C7C" fontSize="16">
                        {terminalThree}
                    </text>
                </g>
            )}
        </svg>
    );
}
