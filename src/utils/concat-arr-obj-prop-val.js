export const concatArrOfObjPropVal = (array, property) => {
    return array.reduce((finalValue, currentValue) =>
        finalValue + currentValue[property]
        , "");
}