function fetchReportsPerProperty(frequency) {

   const startTime = new Date();

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

 const endTime = new Date();

  // Calculate and log the execution time
  const executionTime = endTime - startTime;
  Logger.log("Execution time: " +( executionTime / 1000) + " seconds");

}
