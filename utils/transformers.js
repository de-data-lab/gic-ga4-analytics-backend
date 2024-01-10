
// flatten the data to key:value pairs using dimension and metric headers 

const flattenRows = (data) => { 
  if(!data.rows) {
    const {dimensionHeaders, metricHeaders} = data; 

    let obj = {}; 

    // dimensionHeaders.forEach((header, i) => header.name === "date" 
    //           ? Object.assign(obj, {date: new Date()}) 
    //           : header.name === "hour"
    //           ? Object.assign(obj, {hour: 0}) 
    //           : Object.assign(obj, {[header.name]: null}));

        dimensionHeaders.forEach((header, i) => header.name === "hour"
              ? Object.assign(obj, {hour: 0}) 
              : Object.assign(obj, {[header.name]: null}));


    metricHeaders.forEach((header, i) => Object.assign(obj, {[header.name]: 0}))
    return obj
  }
    return data.rows.map((row) => {
    const {dimensionHeaders, metricHeaders} = data; 
    let obj = {}; 
    dimensionHeaders.forEach((header, i) => Object.assign(obj, {[header.name]: row.dimensionValues[i].value}))
    metricHeaders.forEach((header, i) => Object.assign(obj, {[header.name]: +row.metricValues[i].value}))

    return obj 
})
}

 
