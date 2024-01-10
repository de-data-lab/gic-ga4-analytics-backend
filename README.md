# About this Project 

This is the Google Apps Script backend code for the Delaware Government Information Center-maintained web analytics platform. 

This project is notionally inspired by [18F's Analytics Reporter](https://github.com/18F/analytics-reporter), which powered the analytics websites of many state and municipal-level governments, as well as that of the federal government (analytics.usa.gov). It uses the [Google Analytics v4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1) to pull Google Analytics reports for various Delaware state agencies and upload them to the cloud.

The scripts are deployed to the [Google Apps Script platform](https://www.google.com/script/), where the data are fetched and uploaded at specified intervals using [time-driven triggers](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers). 

This repo also uses [clasp](https://github.com/google/clasp) to facilitate version control and enable local development. 

## Basic Data Flow

1. The lists of GA4 properties to include and reports to run are configured inside `gic/properties` and `gic/reports`
2. For each property, each report is transformed (by `reportBuilder.buildReport`) into an object compatible with Google Apps Script's [Analytics Data Service](https://developers.google.com/apps-script/advanced/analyticsdata). 
3. Non-realtime reports are batched into groups of no more than 5 to take advantage of [request batching](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports). 
4. Each batch request is sent to the API. The response data rows are flattened to match `{[dimension name]: [metric value]}`. 
5. Aggregate reports that sum data across all properties are generated using `fetchAggregatedReport`. 
6. Realtime requests are sent to the API one-by-one (the API does not expose a method for batching realtime requests). 

## How to Reproduce

1. `clasp create` a new empty Google Apps Script project, or do so through the Apps Script interface
2. `git clone` the repo to your local machine and `cd` into the new folder
3. `clasp push` the code to the Apps Script remote 
4. Update the `properties` config variable to include the properties you need to include (these must be GA4-enabled properties or they will not work, and the Google account from which the scripts will run [must have the proper level of access](https://support.google.com/analytics/answer/9305587?hl=en#zippy=%2Cin-this-article))
5. If needed, update the `reports` config variable 
6. Use the [Properties Service](https://developers.google.com/apps-script/guides/properties) to set the following variables: 
   1. `gCloudPKey`: The value of the `private_key` property from of a valid [service account](https://cloud.google.com/iam/docs/keys-create-delete) JSON key file
   2. `gCloudClientEmail`: The value of the `client_email` property from of a valid [service account](https://cloud.google.com/iam/docs/keys-create-delete) JSON key file
   3. `STORAGE_BUCKET`: The name of the root Cloud Storage bucket where you want your data to live
7. Using the Apps Script interface, click on "Libraries" from the editor's left pane and add the OAuth2 library by entering the script ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`. (Documentation for this library is available [here](https://github.com/googleworkspace/apps-script-oauth2))
8. Now, each of the functions in `runDaily`, `runHourly` and `runRealtime` should successfully upload processed analytics reports to Google Cloud Storage. 

### Caveats and Notes

* Service accounts must be properly configured to access Google Cloud Storage. See Amit Agarwal's [Upload Files from Google Drive to Google Cloud Storage with Google Apps Script](https://www.labnol.org/code/20074-upload-files-to-google-cloud-storage#create-storage-service-account) if you get stuck.
* If for some reason you are unable to use `clasp`, you could simply copy and paste the code from this repo into Google Apps Script.  
* Please be mindful of all relevant [GA4 Analytics Data API quotas](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas).