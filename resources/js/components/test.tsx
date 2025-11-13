const Test = ({ wireCount = 2, width = 600, height = 200 }) => {
    // Определяем параметры для каждого провода
    const wires = [];

    for (let i = 0; i < wireCount; i++) {
        const yPosition = height * 0.2 + (i * height * 0.6) / (wireCount - 1 || 1);

        // Первый провод — черный, прямой
        // Второй и последующие — красные, изогнутые
        const isBlack = i === 0;
        const color = isBlack ? '#000000' : '#FF0000';
        const isCurved = !isBlack;

        wires.push({
            id: i,
            y: yPosition,
            color: color,
            isBlack: isBlack,
            isCurved: isCurved,
            connectorColor: '#A0A0A0', // Серебристый
            innerConnectorColor: isBlack ? '#FF4444' : '#FF0000', // Красная деталь внутри
            gradientStart: isBlack ? '#FFFFFF' : '#FFAAAA',
            gradientEnd: isBlack ? '#888888' : '#FF6666',
        });
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="397" height="168" viewBox="0 0 397 168" fill="none">
            {wireCount >= 2 && <path d="M394 8L3 160" stroke="black" strokeWidth="16" />}
            {wireCount >= 1 && <path d="M3 8H394" stroke="black" strokeWidth="16" />}
            {wireCount === 3 && <path d="M3 160H394" stroke="black" strokeWidth="16" />}
            {wireCount >= 2 && <path d="M394 8L3 160" stroke="#FF2727" strokeWidth="4" />}
            {wireCount >= 1 && <path d="M3 8H394" stroke="#FF2727" strokeWidth="4" />}
            {wireCount === 3 && <path d="M3 160H394" stroke="#FF2727" strokeWidth="4" />}
        </svg>
    );
};

export default Test;
