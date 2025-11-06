import httpClient from "../clients/httpClient";

export const downloadFile = (url: string, fileName: string, params?: any) => {
  return httpClient
    .get<Blob>(url, {
      params: params,
      responseType: "blob",
    })
    .then((response: any) => {
      let fileURL = window.URL.createObjectURL(response);
      let fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const downloadFileFromUrl = (url: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.click();
  a.remove();
};
