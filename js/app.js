
var app = {

	displayCurrentTrack: function() {
		var currentTrack = player.track;
		if (currentTrack === null) {
			$('body').html("No current track being played");
			return;
		}

		var that = this;
		echonest.songRadio(currentTrack, function(results) {
			var tracks = [];
			var count = 0;
			console.log(results);
			if (results.response.status.code === 0) {
				$('body').html("");

				for(var i = 0; i< results.response.songs.length;i++) {
					// search spotify song
					var song = results.response.songs[i];
					that.searchSpotify(song.artist_name, song.title, function(returnedTracks) {
						count++;
						
						for (var j=0;j<returnedTracks.length;j++) {
							var track = returnedTracks[j];	
							$('body').append(that.renderImageView([track]).node);

							tracks.push(track);
							//that.displayTracks(tracks);
						}
					})
				}
			} else {
				$('body').html("none found");
			}

		});
		//$('body').html(currentTrack.name + " by " + currentTrack.artists[0].name );
	},

	displayTracks: function(tracks) {
		var playlistView = this.renderListView(tracks);
		console.log(tracks);
		$('body').html(playlistView);
		return playlistView;
	},

	searchSpotify: function(artist, title, callback) {
		var search = new models.Search(artist+" "+title);

		search.localResults = models.LOCALSEARCHRESULTS.APPEND;

		search.observe(models.EVENT.CHANGE, function() {
			var results = [];
			search.tracks.forEach(function(track) {
				results.push(track);
			});
			callback(results);
		});

		search.appendNext();
	},

	createPlaylist: function(tracks,title) {
		var playlist = title ? new models.Playlist(title) : new models.Playlist();
		for (var i = 0;i<tracks.length;i++) {
			playlist.add(tracks[i]);
		}
		return playlist;
	},

	renderListView: function(tracks) {
		var dummyPlaylist = this.createPlaylist(tracks);
		var playerView = new views.List(dummyPlaylist);
		return playerView;
	},

	renderImageView: function(tracks) {
		var playerView = new views.Player();
		var dummyPlaylist = this.createPlaylist(tracks);
		playerView.context = dummyPlaylist;
		return playerView;
	},

	init: function() {
		this.displayCurrentTrack();
	}
}

player.observe(models.EVENT.CHANGE, function(e) {
	app.displayCurrentTrack();
});


$(document).ready(function() {
	app.init();
})


var uri = "spotify:track:6JEK0CvvjDjjMUBFoXShNZ";

//player.play(uri);



