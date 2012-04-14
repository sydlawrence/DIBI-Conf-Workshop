
var app = {



	init: function() {

	}
}


$(document).ready(function() {
	app.init();
})


// get the current track
var uri = "spotify:track:6JEK0CvvjDjjMUBFoXShNZ";
var title = "hello world";
track = models.Track.fromURI(uri, function(track) {
    console.log("Track loaded", track.name);
});






var playlist = new models.Playlist();

addToPlaylistFromURI = function(uri) {
	//console.log(listens[i].data.song.title);
    models.Track.fromURI(uri, function(track) {
    	playlist.add(track);
    })
}


var auth = spotify.require('sp://import/scripts/api/auth');

/* Set the permissions you want from the user. For more
 * info, check out http://bit.ly/A4KCW3 */
var permissions = ['user_actions.music'];
var app_id = '126891607432106';
var request_url = 'https://graph.facebook.com/me/music.listens';
auth.authenticateWithFacebook(app_id, permissions, {
        onSuccess: function(accessToken, ttl) {
                var url = request_url + '?access_token=' + accessToken;
                console.log(url);
                $.getJSON(url, function(data) {
                        var listens = data.data;
                        console.log(listens);
                        for(var i=0;i<listens.length;i++) {
                                var uri = listens[i].data.song.url.replace("http://open.spotify.com/track/", "spotify:track:");
                                addToPlaylistFromURI(uri);
                        }
                        var playlistView = new views.List(playlist);
                        $('body').append(playlistView.node);
                });
        },
        onFailure: function(error) {
                alert("failed");
        },
        onComplete: function() { 
        }
});