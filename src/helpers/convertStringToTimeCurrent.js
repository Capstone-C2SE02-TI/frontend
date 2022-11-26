function convertStringToTimeCurrent(timeString) {
     timeString = timeString?.toString();
    const date = `${timeString?.slice(6, 8)}/${timeString?.slice(4, 6)}/${timeString?.slice(0, 4)}`;

    const minutes = timeString?.slice(10, 12);
    const seconds = timeString?.slice(12, 14);
    const hours =
        timeString?.slice(8, 10) > '12'
            ? `${timeString?.slice(8, 10) - 12}:${minutes}: ${seconds} PM`
            : `${timeString?.slice(8, 10)}:${minutes}: ${seconds} AM`;

    return `${date} ${hours}`;
}

export default convertStringToTimeCurrent;