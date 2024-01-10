// in case a single report or set of reports need to be re-run on-demand

function runSingle(propertiesToRun, reportsToRun) {
  const storageToken = getStorageToken();
  const ga4token = getGa4AccessToken();

  if (!propertiesToRun || propertiesToRun.length === 0) {
    propertiesToRun = properties; // all properties
  } else {
    propertiesToRun = properties.filter((property) =>
      propertiesToRun.includes(property.slug)
    );
  }

  if (!reportsToRun || reportsToRun.length === 0) {
    throw new Error("Must specify at least one report");
  } else {
    reportsToRun = reports.filter((report) =>
      reportsToRun.includes(report.name)
    );
  }

  propertiesToRun.forEach((property) => {
    reportsToRun.forEach((report) => {
      let data = {
        query: report.query,
        data: fetchData(report, property, ga4token),
      };

      Logger.log(JSON.stringify(data.data));

      try {
        uploadFileToCloudStorage(
          property.slug,
          report.name,
          data,
          storageToken
        );
      } catch (err) {
        Logger.log(
          "Failed to upload " + report.name + " report for " + property.name
        );
      }
    });
  });
}