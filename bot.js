console.log('The TweetBot program has started');

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

// setup a user stream
const stream = T.stream("user");
var my_screen_name = null;
var my_name_on_account = null;
var tweeterHandle = null;

var exec = require('child_process').exec;
var fs = require('fs');


// the bot's info 
T.get('account/verify_credentials', { skip_status: true },
    function(err, data, response) {
        if (err) {
            console.log("error: ", err);
        }
        my_screen_name = data.screen_name;
        my_name_on_account = data.name;
        // console.log("whats inside response??  :  ", response);
    });

// the tweeter's info
stream.on('tweet', function(tweeter) {
    tweeterHandle = tweeter.user.screen_name;
    if (my_screen_name !== tweeter.user.screen_name) {
        tweetIt("hello @" + tweeter.user.screen_name);
    }
});

// setInterval(tweetIt, 5000);
// tweetIt("testing tweet to myself");

function tweetIt(txt) {
    console.log("I have received a tweet, I will now work on a response.");
    var cmd = 'processing-java --sketch=`pwd`/tweetSketch --run';

    // write/overwrite & save txt argument to datafile.txtx
    var data2 = fs.writeFileSync('tweetSketch/datafile.txt', '@' + tweeterHandle,'utf8', dataWritten);

    function dataWritten(error){
        if(error) throw error;
        console.log("dataFile is written")

    }

    exec(cmd, processing);

    function processing() {
        var filename = 'tweetSketch/custom-tweet.png';
        var params = {
            encoding: 'base64'
        }
        var b64content = fs.readFileSync(filename, params);


        // must first upload the image before the tweet can be posted
        T.post('media/upload', { media_data: b64content }, uploaded);

        function uploaded(err, data, response) {
            // the image will be ready, This is where I will tweet ! 
            if (err) {
                console.warn("An error occurred while posting", err);
            }

            // data will have an id on it 
            // I need to refer to when I tweet
            var id = data.media_id_string;

            // create a tweet object 
            var tweet = {
                status: txt,
                media_ids: [id]
            }

            T.post('statuses/update', tweet, tweeted);

            function tweeted(err, data, response) {
                if (err) {
                    console.log("Something went wrong when posting the tweet!");
                    console.log("err: ", err);
                } else {
                    console.log("tweet has been posted.");
                }
            }
        }
    }
}