var Browser = require('zombie');
var cheerio = require('cheerio');
var argv = require('yargs').argv;
var ical = require('ical-generator');

var stringToDate = require('./stringToDate.js');

var cal = ical({
  name: 'Rooster',
  timezone: 'Europe/Amsterdam'
});

var regexes = {
  classes: /([A-Z]{3})\s+([a-z]\w+)([ABC][0-9]{3}|media|gymz[0-9])/,
};

var travelDuration = parseInt(argv.travelDuration);

if (argv.shortRooster) {
  var hoursToTime = require('./hours.js')['40'];
} else {
  var hoursToTime = require('./hours.js')['50'];
}

var client = new Browser();

client.visit(argv.url, function() {
  client
    .fill('_nameTextBox', argv.name)
    .pressButton('Zoek', function() {
      client.pressButton('Rooster', function() {
        var $ = cheerio.load(client.html());  
        var $table = $('tbody');
        var weekPrefix = 'week : ';
        var weekID = weekPrefix + argv.week;
        var weekIsCurrent = false;

        $table.find('tr').each(function() {
          var text = $(this).text().trim();

          if (!weekIsCurrent && text != weekID) {
            return;
          } else if (!weekIsCurrent && text == weekID) {
            weekIsCurrent = true;
            return;
          } else if (weekIsCurrent && text.indexOf(weekPrefix) > -1) {
            weekIsCurrent = false;
            return;
          } else if ($( $(this).find('td')[0] ).text() == 'datum') {
            return;
          }

          if (weekIsCurrent) {
            var startTime, endTime, hour, timeIndex, hourStart, hourStop;

            var date = stringToDate( $( $(this).find('td')[0] ).text().trim() );

            for (var i = 2; i <= 9; i++) {
              if (hour = $( $(this).find('td')[i] ).text().trim().match(regexes.classes)) {
                timeIndex = i - 2;

                hourStart = hoursToTime.start[timeIndex];
                hourStop = hoursToTime.end[timeIndex];

                if (startTime === undefined) {
                  startTime = hourStart;
                }

                var desc = hour[2] + ' van ' + hour[1] + ' in ' + hour[3];

                cal.createEvent({
                  start: new Date(date + hourStart),
                  end:  new Date(date + hourStop),
                  timestamp: new Date(),
                  summary: desc,
                  description: desc,
                  location: hour[3]
                });
              } else {
                continue;
              }
            }

            endTime = hourStop;

            if (travelDuration) {
              cal.createEvent({
                end: new Date(date + startTime - (5 * 60 * 1000) ),
                start: new Date(date + startTime - (5 * 60 * 1000 ) - (travelDuration * 60 * 1000) ),
                timestamp: new Date(),
                summary: 'Reizen / fietsen',
                description: 'Reizen / fietsen',
                location: 'Op de fiets'
              });

              cal.createEvent({
                start: new Date(date + endTime + (5 * 60 * 1000) ),
                end: new Date(date + endTime + (5 * 60 * 1000 ) + (travelDuration * 60 * 1000) ),
                timestamp: new Date(),
                summary: 'Reizen / fietsen',
                description: 'Reizen / fietsen',
                location: 'Op de fiets'
              });
            }
          }
        });

        console.log(cal.toString());
      });
    });
});
