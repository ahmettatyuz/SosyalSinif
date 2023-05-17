const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const createToast = (title, text, icon) => {
    Toast.fire({
        icon: icon,
        title: title,
        text: text,
    })
}

const createAlert = (title, text, icon, buttonName, timer = 3) => {
    timer *= 1000;
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        timer: timer,
        timerProgressBar: true,
        confirmButtonText: buttonName
    })
}




