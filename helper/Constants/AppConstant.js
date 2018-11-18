const dbUser = 'crazydreamer';
const dbpassword = 'admin123';
const mongoUrl='mongodb://'+dbUser+':'+dbpassword+'@ds133547.mlab.com:33547/news_scraper';
//mongodb://crazydreamer:admin123@ds133547.mlab.com:33547/news_scraper
module.exports = {

'mongoUrl'                            : mongoUrl,

}
