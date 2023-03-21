const twoDigit = (value) => {
    if (value < 10) return `0${value}`
    return value
}


const conDate = (value) => {
    let bulan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let hari = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let data = new Date(value);
    // Hari
    let day = data.getDay();
    // Jam
    let jam = data.getHours();
    // Menit
    let menit = data.getMinutes();

    // Tanggal
    let date = data.getDate()
    // Bulan
    let month = data.getMonth()

    const hasil = `${date} ${bulan[month]} ${twoDigit(jam)}:${twoDigit(menit)} ${hari[day]}`

    return hasil
}

export default conDate

