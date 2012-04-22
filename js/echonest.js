
var echonest = {
	key: "N6E4NIOVYMTHNDM8J",

	baseUrl: "http://developer.echonest.com/api/v4/",

	execute: function(url, params, callback) {
		
		url = this.baseUrl+url+"?api_key="+this.key+"&format=jsonp&callback=?";

		for (i in params) {
			url += "&"+i+"="+params[i];
		}

		$.getJSON(url, callback);
	},

	songRadio: function(track, callback) {
		this.execute("playlist/basic", {
			song_id:track.uri.replace("spotify:", "spotify-WW:"),
			type: "song-radio",
			results:"20"
		}, callback)
	},

	songProfile:function(uri, callback) {
		this.execute("song/profile", {
			track_id:uri.replace("spotify:", "spotify-WW:"),
			bucket:"audio_summary"
		}, callback);
	},

	songSearch: function(artist, track, callback) {

		this.execute("song/search", {
				artist:artist,
				title:track,
				bucket:"audio_summary"
			}, callback)

	}

}