const localHost = "http://127.0.0.1:5500";
const video = document.getElementById("#webcam");
let localStream = null;
let isModelsLoaded = false;
let LabeledFaceDescriptors = null;

// Modellerin yüklenmesi..
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../faceIdModels"),
    faceapi.nets.faceLandmark68Net.loadFromUri(`../faceIdModels`),
    faceapi.nets.faceRecognitionNet.loadFromUri(`../faceIdModels`),
    faceapi.nets.ssdMobilenetv1.loadFromUri(`../faceIdModels`)
]).then(initApp);

async function initApp() {
    LabeledFaceDescriptors = await loadImages();
    faceIdButton.style.display = "block";
}

function loadImages() {
    const label = ["Gokhan"];

    return Promise.all(
        label.map(async label => {
            const descriptions = [];
            for (let i = 1; i <= 3; i++) {
                const img = await faceapi.fetchImage(
                    `${localHost}/admins/${label}/${i}.jpg`
                );

                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                descriptions.push(detections.descriptor);
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    );
}

video.addEventListener("play", async () => {
    const boxSize = {
        width: video.width,
        height: video.height
    };

    let cameraInterval = setInterval(async () => {
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
            ["Ahmet", "Handan", "İlker", "Sado"].indexOf(results[0].label) > -1
        ) {
            faceIDResult.textContent = "FaceID doğrulandı.. Yönlendiriliyorsunuz..";
            faceIDResult.classList = [];
            faceIDResult.classList.add("success");
            faceIDResult.style.display = "block";
            clearInterval(cameraInterval);
            setTimeout(() => {
                // location.href = "about.html";
            }, 10000);
        } else {
            faceIDResult.textContent = "FaceID doğrulanamadı...";
            faceIDResult.classList = [];
            faceIDResult.classList.add("error");
            faceIDResult.style.display = "block";
        }
    }, 100);
});