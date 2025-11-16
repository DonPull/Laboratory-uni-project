export const getElementProperty = (element, property, returnAsNumber = false) => {
    var containerStyles = window.getComputedStyle(element);
    var styleValue = containerStyles.getPropertyValue(property);
    return returnAsNumber ? Math.round(parseInt(styleValue.replace("px", ""))) : styleValue;
}

export const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
}

export const getRandomIntExcluding = (min, max, excludeNumbers) => {
    const availableNumbers = [];
    
    for (let i = min; i <= max; i++) {
        if (!excludeNumbers.includes(i)) {
            availableNumbers.push(i);
        }
    }
    
    if (availableNumbers.length === 0) {
        throw new Error("No available numbers in range");
    }
    
    return availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
}
