// const localHost = "http://localhost:3000";

let isModelsLoaded = false;
let LabeledFaceDescriptors = null;

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
  $("#webcam").css("display", "block");
}

function turnOffCamera() {
  const video = document.querySelector("#webcam");
  localStream.getVideoTracks()[0].stop();
  video.src = "";
  video.srcObject = null;
  localStream = null;
  $("#webcam").css("display", "none");

}

async function loginOpenCamera() {
  $("#pencilLoader").css("display", "block");
  $("#loginLoader").css("display", "none");
  let idAndFaceId = await axios.get("/api/user/faceId");
  idAndFaceId = idAndFaceId.data;
  // console.log(idAndFaceId);
  let ids = idAndFaceId.map(item => item._id);
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../faceIdModels"),
    faceapi.nets.faceLandmark68Net.loadFromUri(`../faceIdModels`),
    faceapi.nets.faceRecognitionNet.loadFromUri(`../faceIdModels`),
    faceapi.nets.ssdMobilenetv1.loadFromUri(`../faceIdModels`)
  ]).then(() => {
    initApp(idAndFaceId);
  });
  await openCamera();

  const video = document.querySelector("#webcam");
  video.addEventListener("play", async () => {
    $("#pencilLoader").css("display", "block");
    $("#loginLoader").css("display", "none");
    // console.log(video);
    const boxSize = {
      width: 300,
      height: 400
    };
    let time = 0;
    let cameraInterval = setInterval(async () => {
      time++;
      if (time > 20) {
        clearInterval(cameraInterval);
        $("#pencilLoader").css("display", "none");
        $(".error-checkmark").css("display", "block");
      } else {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, boxSize);

        const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);

        const results = resizedDetections.map(d =>
          faceMatcher.findBestMatch(d.descriptor)
        );
        if (
          results.length > 0 &&
          ids.indexOf(results[0].label) > -1
        ) {
          clearInterval(cameraInterval);
          $("#pencilLoader").css("display", "none");
          $(".success-checkmark").css("display", "block");
          const sonuc = await axios.post("/api/user/faceIdGiris", { id: results[0]._label });
          if (sonuc.data.status == 404) {
            createToast("Hata", sonuc.data.mesaj, "error");
          } else {
            createToast("Bilgi", sonuc.data.mesaj, "success");
            yonlendir("/", 2);
          }
        } else {
          console.log("yüz tanıma işlemi devam ediyor...");
        }
      }

    }, 500);
  });
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
  $(".error-checkmark").css("display", "none");
  $(".success-checkmark").css("display", "none");
  $("#loginLoader").css("display", "inline-block");
}

async function profileOpenCamera() {
  $("#profileCameraOutput").css("display", "none");

  $("#pencilLoader").css("display", "block");
  await openCamera();
  $(".profileCameraButtons").css("display", "block");
  $("#pencilLoader").css("display", "none");

}

function profileTurnOffCamera() {
  turnOffCamera();
  $(".profileCameraButtons").css("display", "none");
  $("#profileCameraOutput").css("display", "inline-block");
}

function cameraTrigger() {
  const video = document.querySelector("#webcam");
  const takenPhoto = document.querySelector("#takenPhoto");
  const cameraOutput = document.querySelector("#profileCameraOutput");
  const downloadimage = document.querySelector("#downloadimage");
  takenPhoto.width = video.videoWidth;
  takenPhoto.height = video.videoHeight;
  takenPhoto.getContext("2d").drawImage(video, 0, 0);
  cameraOutput.src = takenPhoto.toDataURL("image/jpeg");
  // downloadimage.href = cameraOutput.src;
  // downloadimage.download = "1.jpg";
  // downloadimage.click();
}

async function initApp(idAndFaceId) {
  LabeledFaceDescriptors = await loadImages(idAndFaceId);
}

async function loadImages(idAndFaceId) {
  // bu diziye id ler gelecek
  // const label = ["2"];

  // idAndFaceId=idAndFaceId.data;
  // console.log(idAndFaceId);
  return Promise.all(
    idAndFaceId.map(async item => {
      const descriptions = [];
      //fetch Image fonsksiyonuna id'ye ait resim gelecek

      const img = await faceapi.fetchImage(item.faceId);

      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
      // console.log(descriptions);
      // for (let i = 1; i <= 1; i++) {
      //     const img = await faceapi.fetchImage(
      //         `${localHost}/faceImages/${label}/${i}.jpg`
      //     );

      //     const detections = await faceapi
      //         .detectSingleFace(img)
      //         .withFaceLandmarks()
      //         .withFaceDescriptor();
      //     descriptions.push(detections.descriptor);
      // }
      return new faceapi.LabeledFaceDescriptors(item._id, descriptions);
    })
  );
}

async function uploadImage(image) {
  const token = Cookies.get('token');
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };
  // console.log(image);
  const result = await axios.post("/api/user/faceId", {
    faceId: image
  }, config);
  // console.log(result);
  if (result.data.status == 404) {
    createToast("Hata", result.data.mesaj, "error");
  } else {
    createToast("Bilgi", result.data.mesaj, "success");
  }
}

$(document).ready(function () {

  $("#face-id-open").click(function (e) {
    e.preventDefault();

    console.log("face id open btn çalıştı");
    loginOpenCamera();

  });

  $("#face-id-close").click(function (e) {
    e.preventDefault();
    console.log("face id close btn çalıştı.");
    loginTurnOffCamera();
  })

  $("#profileOpenCamera").click(function (e) {
    e.preventDefault();
    console.log("profile open camera çalıştı.")
    profileOpenCamera();
  })

  $("#profileTurnOffCamera").click(function (e) {
    e.preventDefault();
    console.log("profile camera iptal çalıştı.");
    $("#profileCameraOutput").attr("src", "");
    profileTurnOffCamera();
  })

  $("#profileCameraTrigger").click(function (e) {
    e.preventDefault();
    console.log("profile camera trigger çalıştı.");
    cameraTrigger();
    profileTurnOffCamera();
    const image = $("#profileCameraOutput").attr("src");
    // console.log(image);
    uploadImage(image);

  })


})
