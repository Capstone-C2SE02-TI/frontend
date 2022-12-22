function convertTime(date) {
    let t = new Date(date),
        time = t.toString().slice(16, 21)
    return `${time}`
}

export default convertTime;
