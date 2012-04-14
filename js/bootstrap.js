var spotify = getSpotifyApi(1),
	models = spotify.require('sp://import/scripts/api/models'),
	views = spotify.require('sp://import/scripts/api/views'),
	ui = spotify.require("sp://import/scripts/ui"),
	player = models.player,
	library = models.library,
	application = models.application,
	playerImage = new views.Player();


// trackety track, I am a gremlin
var googletracker = spotify.require("sp://import/scripts/googletracker")
var tracker = new googletracker.GoogleTracker("UA-19804545-13");
tracker.track("app");