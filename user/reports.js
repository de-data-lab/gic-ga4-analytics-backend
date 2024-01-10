// A list of all reports to be pulled from the API for each property. 
// The "query" property contains the raw API query for each report. Any changes to reporting parameters should be made here. 

const reports = [
  {
    "name": "downloads-30-days",
    "frequency": "daily",
    "realtime": false, 
    "query": {"dimensions":[{"name":"eventName"},{"name":"fileExtension"},{"name":"fileName"},{"name":"fullPageUrl"},{"name":"unifiedScreenName"}],"metrics":[{"name":"eventCount"}],"dateRanges":[{"startDate":"30daysAgo","endDate":"today"}],"dimensionFilter":{"filter":{"fieldName":"eventName","stringFilter":{"matchType":"EXACT","value":"file_download"}}},"metricFilter":{"filter":{"fieldName":"eventCount","numericFilter":{"operation":"GREATER_THAN","value":{"int64Value":"1"}}}}},
    "meta": {
      "name": "Top Downloads, 30 days",
      "description": "Top downloads from the last 30 days (includes files with at least 1 download)."
    }
  },
  {
    "name": "devices",
    "frequency": "daily",
    "realtime": false,
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "deviceCategory"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "today"
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "name": "Device Categories",
      "description": "Device Categories."
    }
  },
  {
    "name": "os",
    "frequency": "daily",
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "operatingSystem"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "yesterday"
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "names": "Operating Systems",
      "description": "90 days of visits, broken down by operating system and date, for all sites."
    }
  },
  {
    "name": "browsers",
    "frequency": "daily",
    "query": {
      "dimensions": [
        {
          "name": "browser"
        },
        {
          "name": "date"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "yesterday"
        }
      ],
      "orderBys": [
        {
          "dimension": {
            "orderType": "ALPHANUMERIC",
            "dimensionName": "date"
          },
          "desc": true
        }
      ],
      "keepEmptyRows": true,
      "metricAggregations": [
        "TOTAL"
      ]
    },
    "meta": {
      "names": "Browsers",
      "description": "90 days of visits, broken down by browser."
    }
  },
  {
    "name": "windows",
    "frequency": "daily",
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "operatingSystem"
        },
        {
          "name": "operatingSystemVersion"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "yesterday"
        }
      ],
      "dimensionFilter": {
        "filter": {
          "fieldName": "operatingSystem",
          "stringFilter": {
            "matchType": "CONTAINS",
            "value": "Windows",
            "caseSensitive": false
          }
        }
      },
      "orderBys": [
        {
          "dimension": {
            "orderType": "ALPHANUMERIC",
            "dimensionName": "date"
          }
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "names": "Windows",
      "description": "90 days of visits from Windows users, broken down by operating system version and date, for all sites."
    }
  },
  {
    "name": "top-cities-realtime",
    "realtime": true,
    "frequency": "realtime",
    "query": {
      "dimensions": [
        {
          "name": "city"
        }
      ],
      "metrics": [
        {
          "name": "activeUsers"
        }
      ]
    }
  },
  {
    "name": "top-countries-realtime",
    "realtime": true,
    "frequency": "realtime",
    "query": {
      "dimensions": [
        {
          "name": "country"
        }
      ],
      "metrics": [
        {
          "name": "activeUsers"
        }
      ]
    }
  },
  {
    "name": "visitors-today",
    "frequency": "hourly",
    "query": {
      "dimensions": [
        {
          "name": "date"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "today",
          "endDate": "today"
        }
      ]
    }
  },
  {
    "name": "visitors-hourly",
    "frequency": "hourly",
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "hour"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "today",
          "endDate": "today"
        }
      ],
      "keepEmptyRows": true
    }
  },
  {
    "name": "top-pages-today",
    "frequency": "daily",
    "realtime": false,
    "query": {"dimensions":[{"name":"fullPageUrl"},{"name":"pageTitle"}],"metrics":[{"name":"sessions"},{"name":"totalUsers"}],"dateRanges":[{"startDate":"yesterday","endDate":"today"}],"metricFilter":{"filter":{"fieldName":"totalUsers","numericFilter":{"operation":"GREATER_THAN_OR_EQUAL","value":{"int64Value":"5"}}}},"orderBys":[{"metric":{"metricName":"totalUsers"},"desc":true}]},
    "meta": {
      "name": "Top Pages Yesterday and Today",
      "description": "Top pages yesterday and today (10 or more sessions)."
    }
  },
  {
    "name": "top-pages-7-days",
    "frequency": "daily",
    "realtime": false,
    "query": {"dimensions":[{"name":"fullPageUrl"},{"name":"pageTitle"}],"metrics":[{"name":"sessions"},{"name":"totalUsers"}],"dateRanges":[{"startDate":"7daysAgo","endDate":"today"}],"metricFilter":{"filter":{"fieldName":"totalUsers","numericFilter":{"operation":"GREATER_THAN_OR_EQUAL","value":{"int64Value":"10"}}}},"orderBys":[{"metric":{"metricName":"totalUsers"},"desc":true}]},
    "meta": {
      "name": "Top Pages 7 days",
      "description": "Top pages last 7 days (10 or more sessions)."
    }
  },
  {
    "name": "top-pages-30-days",
    "frequency": "daily",
    "realtime": false,
    "query": {"dimensions":[{"name":"fullPageUrl"},{"name":"pageTitle"}],"metrics":[{"name":"sessions"},{"name":"totalUsers"}],"dateRanges":[{"startDate":"30daysAgo","endDate":"today"}],"metricFilter":{"filter":{"fieldName":"totalUsers","numericFilter":{"operation":"GREATER_THAN_OR_EQUAL","value":{"int64Value":"10"}}}},"orderBys":[{"metric":{"metricName":"totalUsers"},"desc":true}]},
    "meta": {
      "name": "Top Pages 30 days",
      "description": "Top pages last 30 days (10 or more sessions)."
    }
  },
  {
    "name": "device_model",
    "frequency": "daily",
    "realtime": false,
    "query": {"dimensions":[{"name":"date"},{"name":"mobileDeviceModel"}],"metrics":[{"name":"sessions"}],"dateRanges":[{"startDate":"90daysAgo","endDate":"today"}],"metricFilter":{"filter":{"fieldName":"sessions","numericFilter":{"operation":"GREATER_THAN_OR_EQUAL","value":{"int64Value":"10"}}}},"orderBys":[{"metric":{"metricName":"sessions"},"desc":true}]},
    "meta": {
      "name": "Device Model",
      "description": "90 days of visits by Device Model for all sites."
    }
  },
  {
    "name": "language",
    "frequency": "daily",
    "realtime": false,
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "language"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "yesterday"
        }
      ],
      "orderBys": [
        {
          "metric": {
            "metricName": "sessions"
          },
          "desc": true
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "name": "Browser Language",
      "description": "90 days of visits by browser language for all sites."
    }
  },
  {
    "name": "screen-size",
    "frequency": "daily",
    "realtime": false,
    "query": {
      "dimensions": [
        {
          "name": "date"
        },
        {
          "name": "screenResolution"
        }
      ],
      "metrics": [
        {
          "name": "sessions"
        }
      ],
      "dateRanges": [
        {
          "startDate": "90daysAgo",
          "endDate": "yesterday"
        }
      ],"metricFilter":{"filter":{"fieldName":"sessions","numericFilter":{"operation":"GREATER_THAN_OR_EQUAL","value":{"int64Value":"10"}}}},
      "orderBys": [
        {
          "dimension": {
            "orderType": "ALPHANUMERIC",
            "dimensionName": "date"
          }
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "name": "Screen Resolution",
      "description": "90 days of Screen Resolution visits for all sites."
    }
  },
  {
    "name": "top-traffic-sources-30-days",
    "frequency": "daily",
    "realtime": false,
    "query": {
      "dimensions": [
        {
          "name": "pageReferrer"
        }
      ],
      "metrics": [
        {
          "name": "averageSessionDuration"
        },
        {
          "name": "screenPageViews"
        },
        {
          "name": "screenPageViewsPerSession"
        },
        {
          "name": "sessions"
        },
        {
          "name": "totalUsers"
        }
      ],
      "dateRanges": [
        {
          "startDate": "30daysAgo",
          "endDate": "yesterday"
        }
      ],
      "limit": "20",
      "orderBys": [
        {
          "metric": {
            "metricName": "sessions"
          },
          "desc": true
        }
      ],
      "keepEmptyRows": true
    },
    "meta": {
      "name": "Screen Resolution",
      "description": "90 days of Screen Resolution visits for all sites."
    }
  },
  {
    "name": "windows-browsers", 
    "frequency": "daily",
    "query":  {"dimensions":[{"name":"browser"},{"name":"date"},{"name":"operatingSystemWithVersion"}],"metrics":[{"name":"sessions"}],"dateRanges":[{"startDate":"90daysAgo","endDate":"yesterday"}],"dimensionFilter":{"filter":{"fieldName":"operatingSystemWithVersion","stringFilter":{"matchType":"CONTAINS","value":"windows"}}},"orderBys":[{"dimension":{"orderType":"ALPHANUMERIC","dimensionName":"date"},"desc":false},{"metric":{"metricName":"sessions"},"desc":true}]}
  },
  {
    "name": "os-browsers", 
    "frequency": "daily",
    "query":  {"dimensions":[{"name":"browser"},{"name":"date"},{"name":"operatingSystem"}],"metrics":[{"name":"sessions"}],"dateRanges":[{"startDate":"90daysAgo","endDate":"yesterday"}],"orderBys":[{"dimension":{"orderType":"ALPHANUMERIC","dimensionName":"date"},"desc":false},{"metric":{"metricName":"sessions"},"desc":true}]}
  }
]