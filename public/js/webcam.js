async function openCamera() {
  const video = document.querySelector("#webcam");
  await navigator.mediaDevices.getUserMedia({
    video: true
  })
    .then(stream => {
      window.localStream = stream;
      video.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });
    $("#webcam").css("display","block");
}

function turnOffCamera() {
  const video = document.querySelector("#webcam");
  localStream.getVideoTracks()[0].stop();
  video.src = "";
  video.srcObject = null;
  localStream = null;
  $("#webcam").css("display","none");
  
}

async function loginOpenCamera() {
  $("#pencilLoader").css("display", "block");
  $("#loginLoader").css("display", "none");
  await openCamera();

  $("#face-id-open").css("display", "none");
  $("#face-id-close").css("display", "inline-block");
  $("#camera-trigger").css("display", "inline-block");

  $("#pencilLoader").css("display", "none");
  $("#loginLoader").css("display", "block");

}

function loginTurnOffCamera() {
  $("#face-id-open").css("display", "inline-block");
  $("#face-id-close").css("display", "none");
  turnOffCamera();
  $("#pencilLoader").css("display", "none");
  $("#loginLoader").css("display", "inline-block");
}

async function profileOpenCamera(){
  $("#pencilLoader").css("display", "block");
  await openCamera();
  $(".profileCameraButtons").css("display","block");
  $("#pencilLoader").css("display", "none");
  $("#profileCameraOutput").css("display","none");
}

function profileTurnOffCamera(){
  turnOffCamera();
  $(".profileCameraButtons").css("display","none");
  $("#profileCameraOutput").css("display","inline-block");
}

function cameraTrigger() {
    const video = document.querySelector("#webcam");
    const takenPhoto = document.querySelector("#takenPhoto");
    const cameraOutput = document.querySelector("#profileCameraOutput");
    takenPhoto.width = video.videoWidth;
    takenPhoto.height = video.videoHeight;
    takenPhoto.getContext("2d").drawImage(video, 0, 0);
    cameraOutput.src = takenPhoto.toDataURL("image/webp");
}

$(document).ready(function () {
  $("#face-id-open").click(function () {
    console.log("face id open btn çalıştı");
    loginOpenCamera();

  });

  $("#face-id-close").click(function () {
    console.log("face id close btn çalıştı.");
    loginTurnOffCamera();
  })

  $("#profileOpenCamera").click(function(){
    console.log("profile open camera çalıştı.")
    profileOpenCamera();
  })

  $("#profileTurnOffCamera").click(function () {
    console.log("profile camera iptal çalıştı.");
    $("#profileCameraOutput").attr("src","");
    profileTurnOffCamera();
  })

  $("#profileCameraTrigger").click(function(){
    console.log("profile camera trigger çalıştı.");
    cameraTrigger();
    profileTurnOffCamera();
  })
})
