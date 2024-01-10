const getStorageToken = () =>{
  const service = OAuth2.createService('FirestoreStorage')
    .setPrivateKey(PropertiesService.getScriptProperties().getProperty("gCloudPKey"))
    .setIssuer(PropertiesService.getScriptProperties().getProperty("gCloudClientEmail"))
    .setPropertyStore(PropertiesService.getUserProperties())
    .setCache(CacheService.getUserCache())
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setScope('https://www.googleapis.com/auth/devstorage.read_write');

  return service.getAccessToken();

};