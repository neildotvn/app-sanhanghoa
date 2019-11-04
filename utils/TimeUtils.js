export const parseTime = createdAt => {
    const date = new Date(createdAt.replace(" ", "T"));
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const createdAtStr = `${day}/${month}/${year} - ${hour}:${minutes}`;
    return createdAtStr;
};
