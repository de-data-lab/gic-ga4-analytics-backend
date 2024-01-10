/**
 * Creates a subset of reports to be run, runs them, and then uploads them to GCS
 * 
 * @param {"daily"|"hourly"|"realtime"} frequency The report's frequency
 * @returns void
 */
function fetchReportsPerProperty(frequency) {

  let reportsToFetch = reports.filter(report => report.frequency === frequency)
  const storageToken = getStorageToken(); 


  properties.forEach((property) => {
    let data = prepareBatches(reportsToFetch, property);
    data.forEach((processedReport) => {
      try {
        uploadFileToCloudStorage(property.slug, processedReport.reportName, processedReport, storageToken);
      } catch (err) {
        Logger.log("Failed to upload " + processedReport.reportName + " report for " + property.name);
      }
    })
  })

}
