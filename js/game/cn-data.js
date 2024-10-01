
/*
Herein lies the cranial nerves in a map, waiting to be called.
And some functions that support the use of this object.
*/

// Get required math function.
import { getRndInteger } from "../ultility/math.js";

// Create the map with the data set.
export const cnMap = new Map([
    [0, "terminal"],
    [1, "olfactory"],
    [2, "optic"],
    [3, "oculomotor"],
    [4, "trochlear"],
    [5, "trigeminal"],
    [6, "abducens"],
    [7, "facial"],
    [8, "vestibulochochlear"],
    [9, "glossopharyngeal"],
    [10, "vagus"],
    [11, "accessory"],
    [12, "hypoglossal"]
]);

// Function to return a array with a random CN number and name from the data map.
// Can ignore or include CN 0 (min 0 or 1).
export function randomCn () {
    let randomInt = getRndInteger(1, 12);
    return [randomInt, cnMap.get(randomInt)];
}