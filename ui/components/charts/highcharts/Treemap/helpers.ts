// Map Percentage to Number [0, 1]
export function mapPercentageToNumber(inputNumber: number) {
    // Convert the inputNumber to a positive value
    inputNumber = Math.abs(inputNumber);

    // Define the custom steps and their corresponding mapped values
    const steps = [
        { from: 0, to: 1, value: 0.001 }, // Numbers between 0 and 1
        { from: 1, to: 5, value: 0.01 }, // Numbers between 1 and 5
        { from: 5, to: 10, value: 0.1 }, // Numbers between 5 and 10
        { from: 10, to: 25, value: 0.25 }, // Numbers between 10 and 25
        { from: 25, to: 50, value: 0.5 }, // Numbers between 25 and 50
        { from: 50, to: 75, value: 0.75 }, // Numbers between 50 and 75
        { from: 75, to: 100, value: 1 }, // Numbers between 75 and 100
    ];

    let mappedValue = 0;
    for (const step of steps) {
        if (inputNumber <= step.to) {
            const rangeSize = step.to - step.from;
            const stepPercentage = (inputNumber - step.from) / rangeSize;
            mappedValue = step.value * Math.floor(stepPercentage / step.value);
            break;
        }
    }

    // Round the result to 2 decimal places
    return parseFloat(mappedValue.toFixed(2));
}

// Create Gradient between min and max color, and get appropriate color based on place
export function getGradientColor(minColor: string, maxColor: string, floatNumber: number): string | null {
    // Function to convert a decimal value to a two-digit hexadecimal string
    function decimalToHex(value: number) {
        var hex = Math.round(value * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    // Convert colors to RGB values
    function hexToRgb(color: string) {
        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.toString());
        return rgb
            ? {
                r: parseInt(rgb[1], 16) / 255,
                g: parseInt(rgb[2], 16) / 255,
                b: parseInt(rgb[3], 16) / 255,
            }
            : null;
    }

    var minRGB = hexToRgb(minColor);
    var maxRGB = hexToRgb(maxColor);

    if (!minRGB || !maxRGB) {
        // Invalid color format, return null
        return null;
    }

    // Interpolate the color components based on floatNumber
    var r = minRGB.r + (maxRGB.r - minRGB.r) * floatNumber;
    var g = minRGB.g + (maxRGB.g - minRGB.g) * floatNumber;
    var b = minRGB.b + (maxRGB.b - minRGB.b) * floatNumber;

    // Clamp the color components to the valid range [0, 1]
    r = Math.min(Math.max(r, 0), 1);
    g = Math.min(Math.max(g, 0), 1);
    b = Math.min(Math.max(b, 0), 1);

    // Convert back to hexadecimal
    var hexColor = "#" + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);

    return hexColor;
}