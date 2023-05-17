const formArrayToJson = (formData) => {
    const formJson = {};
    formData.forEach(function (item, index) {
        if(formJson[item.name]){
            if(typeof formJson[item.name] == "string")
                formJson[item.name]=formJson[item.name].split();
            formJson[item.name].push(item.value);

        }else{
            formJson[item.name] = item.value;
        }
    });
    return formJson;
}

const emptyKeyCheck = (formSerializeData) => {
    console.log(formSerializeData);
    let emptykey = "";
    for (let i = 0; i < formSerializeData.length; i++) {
        if (formSerializeData[i].value == "") {
            emptykey = formSerializeData[i].name;
            break;
        }
    }
    return emptykey;
    // formSerializeData.forEach(function(item,index){
    //     if(item.value==''){
    //         return item.name;
    //     }
    // });
    // return "";
}

const yonlendir = (adres, saniye = 0) => {
    if (saniye == 0) {
        window.location.href = adres;
        return;
    }
    saniye--;
    setTimeout(function () {
        yonlendir(adres, saniye);
    }, 1000);
}

