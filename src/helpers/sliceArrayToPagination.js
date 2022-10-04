const sliceArrayToPagination = (array, pageNumber, pageSize) => {
    return array.slice((pageNumber-1) * pageSize, pageNumber*pageSize)
}

export default sliceArrayToPagination