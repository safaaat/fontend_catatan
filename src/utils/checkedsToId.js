const checkedsToId = (value) => {
    let data = value
    let hasil = []

    data.forEach(element => {
        return hasil.push(element.id)
    });

    return hasil
}

export default checkedsToId