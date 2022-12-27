export const joinObjectPropertyValueInArray = (array, property) => {
    return array.reduce((finalValue, currentValue) =>
        finalValue + currentValue[property]
        , "");
}