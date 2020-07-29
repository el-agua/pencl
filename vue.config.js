module.exports = {
  devServer:{
    proxy: {
      "/api/*": {
          target: "https://rocky-sierra-96058.herokuapp.com/",
          changeOrigin: true,
        logLevel: "debug",
 
          secure: false
      }
}}}