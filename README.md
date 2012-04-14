# Useful URLs

**Spotify docs**
https://developer.spotify.com/technologies/apps/docs/beta/

**Spotify css**
https://gist.github.com/1772337

**Echonest docs**
http://developer.echonest.com/docs/v4

**Test track uri**
spotify:track:6JEK0CvvjDjjMUBFoXShNZ

- - -

# Agenda

1. Assess skills

2. Setup a simple html app

3. Play a song

4. Create a new playlist

5. Display a playlist as cover

6. Display a playlist as a list

7. Use echonest to find information about a song

8. Use echonest to find similar songs

9. Use echonest to search for songs

10. Search Spotify for songs

11. Get the user's starred tracks

12. Display as a list

13. Get the user's library artists

14. Display as a list

15. Get the users library tracks

16. Display as a list

17. Login to facebook

18. Get playing history from facebook

19. Drop a track onto the icon

20. Let's Make Something! :)
-	Analyze playing history?
-	Analyze starred tracks?

21. Pub for soft drinks or alcholic ones depends on users preference.

- - -

# Bits of code

## App base - manifest

        {        
                "BundleType": "Application",
                "BundleVersion": "1.0.0",
                "AppIcon": {
                        "36x18": "app-icon.png"
                },
                "AppName": {
                        "en": "Dibiapp"
                },
                "SupportedLanguages": [
                        "en"
                ],
                "RequiredPermissions": [
                        "http://*.echonest.com",
                        "http://*.spotify.com",
                        "http://*.twitter.com"
                ],
                "AcceptedLinkTypes":[
                        "track"
                ],
        }

- - -

## Accessing the default styling

        // all the css file contents
        https://gist.github.com/1772337

        <link rel="stylesheet" href="sp://import/css/adam.css">
        <link rel="stylesheet" href="sp://import/css/api.css">

        adam.css
        eve.css
        api.css
        grid.css
        image.css
        list.css
        pager.css
        player.css
        popover.css

- - -

## Accessing the spotify api

        var spotify = getSpotifyApi(1),
        	models = spotify.require('sp://import/scripts/api/models'),
        	views = spotify.require('sp://import/scripts/api/views'),
        	ui = spotify.require("sp://import/scripts/ui"),
        	player = models.player,
        	library = models.library,
        	application = models.application,
        	playerImage = new views.Player();

        // trackety track, I am a gremlin
        var googletracker = sp.require("sp://import/scripts/googletracker")
        var tracker = new googletracker.GoogleTracker("UA-19804545-13");
        tracker.track("app");

- - -

## Tracks

        track = models.Track.fromURI(uri, function(track) {
            console.log("Track loaded", track.name);
        });

- - -

## Accessing the player

        // get the current track
        var currentTrack = models.player.track;

        // play a track 
        player.play(track.uri);

        player.observe(models.EVENT.CHANGE, function(event) {
                console.log("Something changed!");
        });

- - -

## Playlists

        // creating a playlist ( adding a title saves the playlist )
        playlist = new models.Playlist(title);

        playlist.add(track);

- - -

## Showing cover images for playlists

This only works with playlists or albums, not of individual tracks

        var playerView = new views.Player();
        playerView.track = null; // Don't play the track right away

        // add a playlist to the player
        playerView.context = playlist;

        // the html
        playerView.node

- - -

## Showing a list view for playlists

This only works with playlists or albums, not of individual tracks

        var playlistView = new views.List(playlist);
        //playlistView.itemHeight = "30";

        // the html
        playlistView.node;

- - -

## Accessing echonest api

### song radio
        http://developer.echonest.com/api/v4/playlist/basic?
        	api_key=N6E4NIOVYMTHNDM8J
        	&song_id=spotify-WW:track:0hCW6LbmFCYwM1uGmnjjNe
        	&format=jsonp
        	&results=20
        	&type=song-radio
                &callback=?

### song data
        http://developer.echonest.com/api/v4/song/profile?
                api_key=N6E4NIOVYMTHNDM8J
                &format=jsonp
                &bucket=audio_summary
                &track_id=spotify-WW:track:6JEK0CvvjDjjMUBFoXShNZ
                &callback=?

### search
        http://developer.echonest.com/api/v4/song/search?
                api_key=N6E4NIOVYMTHNDM8J
                &bucket=audio_summary
                &format=jsonp
                &results=20
                &max_danceability=0.3
                &min_danceability=0.2
                &callback=?
    
#### available params
        title
        artist
        description
        style
        mood
        min_tempo
        max_tempo
        min_duration
        max_duration
        min_loudness
        max_loudness
        song_min_hotttnesss
        song_max_hotttnesss
        artist_min_familiarity
        artist_max_familiarity
        artist_start_year_before
        artist_start_year_after
        artist_end_year_before
        artist_end_year_after
        artist_min_hotttnesss
        artist_max_hotttnesss
        min_longitude
        max_longitude
        min_latitude
        max_latitude
        max_danceability
        min_danceability
        min_energy
        max_energy
        mode
        key

- - -

## Searching spotify for songs

        // setup a new search
        var search = new models.Search("Counting Crows");

        // add local files to the search too
        search.localResults = models.LOCALSEARCHRESULTS.APPEND;

        // listen out of a change
        search.observe(models.EVENT.CHANGE, function() {

        	// foreach track do something
        	search.tracks.forEach(function(track) {
        		console.log(track.name);
        	});
        });

        // listen out for an error
        search.observe(models.EVENT.LOAD_ERROR, function() {

        	console.log("error");
        });

        // start the search
        search.appendNext();

- - -

## Get a playlist of user's starred tracks

        library.starredPlaylist

- - -   

## Get a playlist of all user's tracks

Takes quite a while

        playlist = new models.Playlist();
        for (var i = 0;i < library.tracks.length;i++) {
                playlist.add(library.tracks[i]);
        }

- - -

## Log the user into facebook

        var auth = spotify.require('sp://import/scripts/api/auth');

        /* Set the permissions you want from the user. For more
         * info, check out http://bit.ly/A4KCW3 */
        var permissions = ['user_about_me'];
        var app_id = '126891607432106';

        auth.authenticateWithFacebook(app_id, permissions, {
                onSuccess: function(accessToken, ttl) {
                    alert("success! accessToken: "+accessToken);
                },
                onFailure: function(error) {
                        alert("failed");
                },
                onComplete: function() { 
                }
        });

- - -

## Get the users listening history

THIS WILL BREAK
add *.facebook.com to manifest
        
        var auth = spotify.require('sp://import/scripts/api/auth');

        /* Set the permissions you want from the user. For more
         * info, check out http://bit.ly/A4KCW3 */
        var permissions = ['user_actions.music'];
        var app_id = '126891607432106';
        var request_url = 'https://graph.facebook.com/me/music.listens';
        auth.authenticateWithFacebook(app_id, permissions, {
                onSuccess: function(accessToken, ttl) {
                        var url = request_url + '?access_token=' + accessToken;
                        $.getJSON(url, function(data) {
                                var listens = data.data;
                                for(var i=0;i<listens.length;i++) {
                                        var uri = listens[i].data.song.url.replace("http://open.spotify.com/track/", "spotify:track:");
                                        models.Track.fromURI(uri, function(track) {
                                                playlist.add(track);
                                        })
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

- - -

## Dropping things onto the icon

        application.observe(m.EVENT.LINKSCHANGED, function (event) {
            var links =  sp.core.getLinks();
            console.log(links);
        });

- - -

## Licencing Issues

        track.availableForPlayback

- - -

## Adverts

        track.data.isAd === true

### Test ads

Bottom ad
        spotify:ad:0f5ab96681064bedb93cf7079fbf983b
Right Side ad:
        spotify:ad:0539c58f47e642b1ac95483c4ff3548d
Commercial track ad
        spotify:ad:9ca1a889f34945d59fc521759dd177a7
Lightbox ad
        spotify:ad:fc6d42c4f0d54114ac68821acadf7995
        spotify:ad:738ff332b5f8421d97643471ad0adeb4
