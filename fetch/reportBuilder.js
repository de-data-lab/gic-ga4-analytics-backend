// This is a factory function that takes a raw GA4 API query and converts it into an Analytics Data Service-compatible request. 

function buildReport(report) {
    
    let request = AnalyticsData.newRunReportRequest();

        // utility functions ========================================
        // these functions convert report query parameters into objects that are compatible with the Analytics Data Service

        function makeMetric(metric) {
            let newMetric = AnalyticsData.newMetric()
            newMetric.name = metric.name;
            return newMetric
        }

        function makeDimension(dimension) {
            let newDimension = AnalyticsData.newDimension()
            newDimension.name = dimension.name;
            return newDimension
        }

        function makeDateRange(dateRange) {
            let newDateRange = AnalyticsData.newDateRange();
            Object.assign(newDateRange, dateRange)
            return newDateRange
        }

        function makeFilter(filter) {
            let newFilter = AnalyticsData.newFilterExpression();
            newFilter.filter = filter;
            return newFilter;
        }

        function makeOrderBy(orderBy) {
            let newOrderBy = AnalyticsData.newOrderBy();
            Object.assign(newOrderBy, orderBy)
            return newOrderBy
        }
        // ========================================

    function _buildReport() {

        if (report.query.limit) {
            request.limit = report.query.limit;
        }

        return request;
    }

    _buildReport.applyMetricsAndDimensions = function(metrics, dimensions) {
        Object.assign(request, {
            metrics: metrics.map(makeMetric),
            dimensions: dimensions.map(makeDimension)
        })
        return this
    }

    _buildReport.applyDimensionFilter = function(dimensionFilter) {
        if (!dimensionFilter) return this;

        Object.assign(request, {
            dimensionFilter: makeFilter(dimensionFilter.filter)
        })
        return this;

    }

    _buildReport.applyDateRanges = function(dateRanges) {
        Object.assign(request, {
            dateRanges: dateRanges.map(makeDateRange)
        })

        return this;
    }

    _buildReport.applyMetricFilter = function(metricFilter) {
        if (!metricFilter) return this;
        Object.assign(request, {
            metricFilter: makeFilter(metricFilter.filter)
        })
        return this;
    }

    _buildReport.applyOrderBys = function(orderBys) {
        if (!orderBys) return this;

        Object.assign(request, {
            orderBys: orderBys.map(makeOrderBy),
        })
        return this
    }

    _buildReport.init = function() {
        return _buildReport();
    }

    return _buildReport;

}


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