const toLocalTime = (x)=>{
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric" };
    x = x.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
    x.forEach(y => {
        y.createdAt = new Date(y.createdAt).toLocaleDateString("tr-TR", options);
    });
    return x;
}

const toLocalTimeSingle = (y)=>{
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric" };
    y.createdAt = new Date(y.createdAt).toLocaleDateString("tr-TR", options);
    return y;
}

module.exports = {
    toLocalTime,
    toLocalTimeSingle
}