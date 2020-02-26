// Special thanks: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload

export default function convertBinaryFileToBase64String(file, successCallback, errorCallback) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const base64ContentString = event.target.result;
        const fileName = file.name;
        successCallback(base64ContentString, fileName);
    };
    fileReader.onerror = errorCallback;
    fileReader.readAsDataURL(file);
}
