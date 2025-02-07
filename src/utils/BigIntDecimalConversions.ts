export function bigIntToDecimal(bigint:BigInt, decimals = 18) {
    let str = bigint.toString();
    if (str.length <= decimals) {
        return "0." + str.padStart(decimals, '0');
    }
    return str.slice(0, -decimals) + "." + str.slice(-decimals);
}



export function decimalToBigInt(decimalStr:string, decimals = 18) {
    if (!decimalStr.includes(".")) {
        return BigInt(decimalStr + "0".repeat(decimals));
    }
    
    let [intPart, fracPart] = decimalStr.split(".");
    fracPart = fracPart.padEnd(decimals, '0').slice(0, decimals); // Ensure correct decimal places
    return BigInt(intPart + fracPart);
}


