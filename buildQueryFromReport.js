// convert report into Analytics Data Service request and return the request 

function buildQueryFromReport(report) {
  let request = buildReport(report);
  let { query } = report;

  return request
    .applyMetricsAndDimensions(query.metrics, query.dimensions)
    .applyDateRanges(query.dateRanges)
    .applyDimensionFilter(query.dimensionFilter || null)
    .applyMetricFilter(query.metricFilter || null)
    .applyOrderBys(query.orderBys || null)
    .init()
}