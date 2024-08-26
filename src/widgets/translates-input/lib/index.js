function removeEmptyColumns(array) {
    const columnsToKeep = [];

    for (let col = 0; col < array[0].length; col++) {
        let isEmptyColumn = true;

        for (let row = 0; row < array.length; row++) {
            if (array[row][col] !== null && array[row][col] !== undefined && array[row][col] !== '') {
                isEmptyColumn = false;
                break;
            }
        }

        if (!isEmptyColumn) {
            columnsToKeep.push(col);
        }
    }
    return array.map(row => columnsToKeep.map(col => row[col]));
}


export {removeEmptyColumns}