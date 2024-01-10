const uploadFileToCloudStorage = (agencyName, reportName, payload, accessToken) => {

  const API = `https://www.googleapis.com/upload/storage/v1/b`;
  const location = encodeURIComponent(`test/${agencyName}/${reportName}.json`);
  const url = `${API}/${PropertiesService.getScriptProperties().getProperty("STORAGE_BUCKET")}/o?uploadType=media&name=${location}`;

  const response = UrlFetchApp.fetch(url, {
    method: 'POST',

    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });
}