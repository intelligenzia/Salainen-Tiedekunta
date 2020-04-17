module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Salainen Tiedekunta","short_name":"Salainen Tiedekunta","start_url":"/","background_color":"#fff","theme_color":"#373737","display":"minimal-ui","icon":"src/images/gatsby-icon.png"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-63351583-3","head":false,"anonymize":true,"respectDNT":true,"sampleRate":5,"siteSpeedSampleRate":10,"cookieDomain":"example.com"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
