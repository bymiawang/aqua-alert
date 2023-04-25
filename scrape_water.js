var CronJob = require('cron').CronJob;
var job = new CronJob(
	'0 0 0 */7 * 1',
	function() {
		const axios = require("axios");
    const cheerio = require("cheerio");
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: '304.itpwebdev.com', 
      user: 'itp460_team2',
      password: 'u$cItp2023',
      database: 'itp460_team2'
    });
    connection.connect((error) => {
      if (error) {
        console.error('Error connecting to MySQL server' + error.stack);
        return;
      }
      console.log('Connected to MySQL server with ID: ' + connection.threadId);
    });

    axios
      .get("https://www.cityofavalon.com/271/Water-Conservation")
      .then((htmlString) => {
        // use Cheerio to parse htmlString
        const $ = cheerio.load(htmlString.data);
        $("div > table > tbody > tr").each((index, element) => {
          if (index != 0 && index < 58) {
            const date = $(element).find("td")[0].children[0].data;
            const acreFeet = $(element).find("td")[1].children[0].data;
            const ftSeaLevel = $(element).find("td")[2].children[0].data;
            if (date && acreFeet && ftSeaLevel){
              var date1 = new Date(date.trim()).toLocaleDateString('en-GB', {year: 'numeric', month:'2-digit', day:'2-digit'}).split('/').reverse().join('-')
              const tableRow = [date1, acreFeet, ftSeaLevel]
              const sql = 'UPDATE water_level SET date = ?, water_levels = ?, sea_levels=?';
              const data = tableRow
              
              connection.query(sql, data, (error, results) => {
                if (error) {
                  console.error('Error inserting data into table: ' + error.stack);
                  return;
                }
                console.log('Inserted data into table with ID: ' + results.insertId);
                connection.end((error) => {
                  if (error) {
                    console.error('Error closing MySQL connection: ' + error.stack);
                    return;
                  }
                  console.log('Closed MySQL connection.');
                });
              });
            }
          }
        });

      });
	},
	null,
	true,
	'America/Los_Angeles'
);

job.start()