// function buildQueryFromReport(report) {


//   let { query } = report; 

//   let request = AnalyticsData.newRunReportRequest();

//   if(query.limit) {
//     Object.assign(request, {limit: query.limit})
//   }

//  if(query.metricAggregations) {
//   request.metricAggregations = query.metricAggregations 
//  }

//   if (query.dimensionFilter) {
//     let dimensionFilter = AnalyticsData.newFilterExpression()
//     dimensionFilter.filter = query.dimensionFilter.filter;

//     Object.assign(request, { dimensionFilter })
//   }

//     applyOrderBys(request, query);
//     applyMetricFilter(request, query);

//   let metrics = query.metrics.map((metric) => {
//     let newMetric = AnalyticsData.newMetric()
//     newMetric.name = metric.name;
//     return newMetric
//   })

//   let dimensions = query.dimensions.map((dimension) => {
//     let newDimension = AnalyticsData.newDimension()
//     newDimension.name = dimension.name;
//     return newDimension
//   })

//   let dateRanges = query.dateRanges.map((dateRange) => {
//     let newDateRange = AnalyticsData.newDateRange();
//     newDateRange.endDate = dateRange.endDate;
//     newDateRange.startDate = dateRange.startDate;
//     return newDateRange
//   })


//   Object.assign(request, { metrics, dimensions, dateRanges })

//   return request 

  
//   // const report = AnalyticsData.Properties.runReport(
//   //   request,
//   //   'properties/352689476'
//   // )

//   // Logger.log(JSON.stringify(flattenRows(report)))

// }


// function applyMetricFilter(request, query) {
//     if(!query.metricFilter) return; 
//     let metricFilter = AnalyticsData.newFilterExpression()
//     metricFilter.filter = query.metricFilter.filter;
//     Object.assign(request, { metricFilter })
//     return request; 
// }

// function applyOrderBys(request, query) {
//   if(!query.orderBys) return; 
     
//      let orderBys = query.orderBys.map((orderBy) => {
//       let newOrderBy = AnalyticsData.newOrderBy();
//       Object.assign(newOrderBy, orderBy)
//       return newOrderBy
//     })

//    Object.assign(request, { orderBys })
//    return request; 
// }




// // prepare batches of 5 reports

// function prepareBatches() {
//   reportsToBatch = reports.filter((report) => report.frequency === "hourly"); 
  
//   batches = reportsToBatch.reduce((acc, curr) => (acc[acc.length - 1].length === 5 ? acc.push([buildQueryFromReport(curr)]) : acc[acc.length - 1].push(buildQueryFromReport(curr)), acc), [[]]); 

// Logger.log(batches)


//   batches.forEach(batch => {
//     let request = AnalyticsData.newBatchRunReportsRequest()
//     request.requests = batch; 

//     let response = AnalyticsData.Properties.batchRunReports(
//       request,
//       'properties/352689476'
//     ); 

//   Logger.log("NEW REPORT:")
//   Logger.log("==============================================================")
//   Logger.log("\n")
  
//   let { reports } = response; 

//   Logger.log(reports.length)


//   }) 


  
// }


// function buildReport() {

// }





