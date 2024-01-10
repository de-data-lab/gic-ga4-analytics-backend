function fetchAggregatedReport(frequency) {
  reports
    .filter((report) => report.frequency === frequency)
    .forEach((report) => {
      const urls = properties.map(
        (property) =>
          `https://storage.googleapis.com/degic/test/${property.slug}/${report.name}.json`
      );
      const res = UrlFetchApp.fetchAll(urls);
      const parsedReports = res.map((response) =>
        JSON.parse(response.getContentText())
      );

      const metrics = parsedReports[0].query.metrics.map(
        (metric) => metric.name
      );
      const dimensions = parsedReports[0].query.dimensions.map(
        (dim) => dim.name
      );

      const reduced = [
        ...parsedReports.map((parsedReport) => parsedReport.data),
      ]
        .flat()
        .reduce((acc, curr) => {
          const matchIndex = acc.findIndex((row) => {
            return dimensions.every(
              (dimension) => row[dimension] === curr[dimension]
            );
          });

          if (matchIndex > -1) {
            metrics.forEach((metric) => {
              acc[matchIndex][metric] += curr[metric];
            });
          } else {
            acc.push({ ...curr });
          }
          return acc;
        }, []);

      let data = {
        query: report.query,
        data: reduced.filter(
          (datum) => JSON.stringify(datum) !== JSON.stringify({})
        ),
      };

      const storageToken = getStorageToken();

      try {
        uploadFileToCloudStorage("all", report.name, data, storageToken);
      } catch (err) {
        Logger.log("Failed to upload aggregate report");
      }
    });
}

function runFunc() {
  fetchAggregatedReport("daily");
}
