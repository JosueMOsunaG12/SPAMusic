/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');
var FavoriteList = require('./FavoriteList')

var API_URL = "https://ws.audioscrobbler.com/2.0/?"
var API_KEY = "a8da4176b3e227778d267fdc4df7ab36"
var API_LIMIT = "10"
var API_FORMAT = "json"

var ArtistRow = React.createClass({
    handleFavorite: function () {
        var favorite = {'artist':this.props.artist,
                        'name':this.props.track.name,
                        'image':this.props.track.image[3]["#text"]}
        var favorites = JSON.parse(localStorage.getItem('favorites'));
        var favoritesDOM = document.getElementById("favorites");

        favorites.push(favorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        React.render(
            <FavoriteList />, favoritesDOM
        );
    },
    render: function() {
        return (
            <div className="col-md-12 col-sm-12 artist-item">
                <h4 className="col-md-5 col-md-offset-2 col-sm-7">
                    {this.props.track.name}
                </h4>
                <p className="col-md-3 col-sm-5">
                    <button 
                        className="btn btn-default btn-primary" 
                        type="button"
                        onClick={this.handleFavorite}
                    >
                        Add to Favorite
                    </button>
                </p>
            </div>
        );
    }
});

var ArtistDetail = React.createClass({
    getInitialState: function(){        
        // The tracks array will be populated via AJAX
        return { tracks: [] };
    },
    componentDidMount: function(){
        // When the component loads, send a jQuery AJAX request
        var self = this;

        // API endpoint for Last.fm
        var query_url = {
            api_key: API_KEY,
            limit: API_LIMIT,
            format: API_FORMAT,
            page: this.props.page,
            method: "artist.getTopTracks",
            artist: this.props.artist}

        request
            .get(API_URL)
            .query(query_url)
            .end(function(err, res){
                if (err) throw err;

                result = JSON.parse(res["text"]);

                if (!result.toptracks) return;

                var tracks = result.toptracks.track;

                // Update the component's state. This will trigger a render.
                self.setState({ tracks: tracks });
            });
    },
    componentWillReceiveProps: function(nextProps) {
        // When the component loads, send a jQuery AJAX request
        var self = this;

        // API endpoint for Last.fm
        var api_call_url = (API_URL + API_KEY + API_LIMIT + API_FORMAT +
                    "&page=" + nextProps.page + API_TRACK + 
                    nextProps.artist);

        self.setState({ tracks: [] });

        $.getJSON(api_call_url, function(result){
            if(!result || !result.toptracks ){
                return;
            }
            var tracks = result.toptracks.track;

            // Update the component's state. This will trigger a render.
            self.setState({ tracks: tracks });
        });
    },    
    render: function() {
        var rows = [];
        var artist = this.props.artist;

        if(!this.state.tracks.length){
            return (
                <div className="col-md-12">
                    <h2>No details were found for the artist: 
                        {artist}</h2>
                </div>);
        }
        
        this.state.tracks.forEach(function(track) {
            rows.push(<ArtistRow track={track} artist={artist} />);
        });

        var divStyle = {
            backgroundImage: 'url(' + 
                this.state.tracks[0].image[3]["#text"] 
                + ')'
        }

        return (
            <div className="artist-detail">
                <div className="col-md-12 artist-image" style={divStyle}>
                    <h2>{this.props.artist}
                        <h3>Top Tracks</h3>
                    </h2>
                </div>
                {rows}
            </div>
        );
    }
});

module.exports = ArtistDetail;