const axiosPost = async function (link, data) {
    return await axios.post(link, data);
}

const axiosGet = async function(link){
    return await axios.get(link);
}

const axiosDelete = async function(link){
    return await axios.delete(link);
}