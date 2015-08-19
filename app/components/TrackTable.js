/** @jsx React.DOM */
var React = require('react');
var FavoriteList = require('./FavoriteList');
var ArtistDetail = require('./ArtistDetail');
var ArtistPager = require('./ArtistPager');

var API_URL = "http://ws.audioscrobbler.com/2.0/?"
var API_KEY = "api_key=a8da4176b3e227778d267fdc4df7ab36"
var API_LIMIT = "&limit=8"
var API_FORMAT = "&format=json"
var API_TRACK = "&method=track.search&track="

var Hide = React.createClass({
  render: function(){
    return null;
  }
});

var TrackRow = React.createClass({
    handleFavorite: function () {
        var favorite = {'artist':this.props.track.artist,
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
    handleArtist: function () {
        var results = document.getElementById("results");
        var pager = document.getElementById("pager");
        var option_pager = "ArtistDetail";
        var page = 1;
        var artist = this.props.track.artist;

        React.render(
            <ArtistPager artist={artist} />, 
            pager
        );
        React.render(
            <ArtistDetail artist={artist} page={page} />, 
            results
        );
    },
    render: function() {
        return (
            <div className="col-md-3 col-sm-6 portfolio-item">
                <div className="portfolio-link">
                    <img src={this.props.track.image[3]["#text"]} 
                        className="img-responsive" alt="" />
                </div>
                <div className="portfolio-caption">
                    <h4>{this.props.track.name}</h4>
                    <p className="text-muted"><i>By </i>
                        <a onClick={this.handleArtist}>
                            {this.props.track.artist}
                        </a>
                    </p>
                    <p>
                        <button 
                            className="btn btn-default btn-primary" 
                            type="button"
                            onClick={this.handleFavorite}
                        >
                            Add to Favorite
                        </button>
                    </p>
                </div>
            </div>
        );
    }
});

var TrackTable = React.createClass({
    getInitialState: function(){        
        // The tracks array will be populated via AJAX
        return { tracks: [] };
    },
    componentDidMount: function(){
        // When the component loads, send a jQuery AJAX request
        var self = this;

        // API endpoint for Last.fm
        var api_call_url = (API_URL + API_KEY + API_LIMIT + API_FORMAT +
                    "&page=" + this.props.page + API_TRACK + 
                    this.props.searchText);

        $.getJSON(api_call_url, function(result){
            if(!result || !result.results || !result.results.trackmatches){
                return;
            }
            var tracks = result.results.trackmatches.track;

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
                    nextProps.searchText);

        self.setState({ tracks: [] });

        $.getJSON(api_call_url, function(result){
            if(!result || !result.results || !result.results.trackmatches){
                return;
            }
            var tracks = result.results.trackmatches.track;

            // Update the component's state. This will trigger a render.
            self.setState({ tracks: tracks });
        });
    },    
    render: function() {
        var self = this;
        var rows = [];

        if(!this.state.tracks.length){
            return (
                <div className="col-md-12">
                    <h2>No results were found for the search: 
                        {this.props.searchText}</h2>
                </div>);
        }
        
        this.state.tracks.forEach(function(track) {
            rows.push(<TrackRow track={track} />);
        });

        return (
            <div>
                <div className="col-md-12">
                    <h2>Results for {this.props.searchText}</h2>
                </div>
                {rows}
            </div>
        );
    }
});

module.exports = TrackTable;