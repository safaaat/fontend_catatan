
const filterCatatanByFolder = (checkeds, catatans) => {
    let checked = checkeds
    let catatan = catatans
    let filterCatatan = [];

    checked.forEach((e) => {
        let data = catatan.filter((data) => {
            return data.folderId === e.id
        })
        data.forEach((e) => {
            filterCatatan.push(e.id);
        })
    })

    return filterCatatan
}

export default filterCatatanByFolder