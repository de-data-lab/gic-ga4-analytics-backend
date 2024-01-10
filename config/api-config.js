function getGa4AccessToken() {
  const service = OAuth2.createService("GA4-Analytics")
      .setTokenUrl("https://accounts.google.com/o/oauth2/token")
      .setPrivateKey(PropertiesService.getScriptProperties().getProperty("ga4PKey"))
      .setIssuer(PropertiesService.getScriptProperties().getProperty("ga4ClientEmail"))
      .setPropertyStore(PropertiesService.getUserProperties())
      .setScope("https://www.googleapis.com/auth/analytics.readonly")

      return service.getAccessToken();
}