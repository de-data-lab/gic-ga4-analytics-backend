/**
 * Prepares batches of at least 5 reports, runs them, and returns the processed responses as a one-dimensional array.
 * @param {*} reports 
 * @param {*} property 
 * @returns An array of processed GA4 reports, augmented with a `reportName` and `query` property
 */
function prepareBatches(reports, property) {

  // create batches of at least 5 converted requests (batchRunReports supports a maximum of 5 requests)
  let batches = reports.reduce((acc, curr) => {
    if (acc[acc.length - 1].length === 5) {
      acc.push([{
        "reportName": curr.name,
        "query": curr.query,
        "request": buildQueryFromReport(curr)
      }]);
    } else {
      acc[acc.length - 1].push({
        "reportName": curr.name,
        "query": curr.query,
        "request": buildQueryFromReport(curr)
      });
    }
    return acc;
  }, [[]]);

  // run each batch 
  return batches.map((batch) => {
    let processedBatches = runBatch(
      batch.map((report) => report.request),
      property,
      batch.map((report) => ({ query: report.query, reportName: report.reportName }))
    );
    return processedBatches
  }).flat() 

}

/* Runs a batch of requests and return the full processed response. 
    @param batch 
    @param property 
    @param batchMetadata – an array containing the raw query and report name for each report 
*/
function runBatch(batch, property, batchMetadata) {   

  // initiate the batch request 
  let batchRequest = AnalyticsData.newBatchRunReportsRequest()
  batchRequest.requests = batch;

  // send the batch request 
  let response = AnalyticsData.Properties.batchRunReports(batchRequest, `properties/${property.propertyId}`);

  let { reports } = response;

  let processedReports = reports.map((report, i) => {
    return {
      reportName: batchMetadata[i].reportName,
      query: batchMetadata[i].query,
      data: flattenRows(report)    // flatten rows into key-value pairs for each dimensionHeader/metricHeader 
    }
  })

  return processedReports
}










