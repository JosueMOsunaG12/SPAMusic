/** @jsx React.DOM */
var React = require('react');
var request = require('superagent')
var FavoriteList = require('./FavoriteList');
var ArtistDetail = require('./ArtistDetail');
var ArtistPager = require('./ArtistPager');

var API_URL = "https://ws.audioscrobbler.com/2.0/?"
var API_KEY = "a8da4176b3e227778d267fdc4df7ab36"
var API_LIMIT = "8"
var API_FORMAT = "json"

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
    jsonRequest: function(page, searchText) {
        var self = this;
        var tracks = {};
        // API endpoint for Last.fm
        var query_url = {
            api_key: API_KEY,
            limit: API_LIMIT,
            format: API_FORMAT,
            page: page,
            method: "track.search",
            track: searchText}

        request
            .get(API_URL)
            .query(query_url)
            .end(function(err, res){
                if (err) throw err;

                result = JSON.parse(res["text"]);

                console.log(result.results.trackmatches);
                if (!result.results.trackmatches) return;

                tracks = result.results.trackmatches.track;

                self.setState({ tracks: tracks });
            });
    },
    componentDidMount: function(){
        // When the component loads, send a jQuery AJAX request
        this.jsonRequest(this.props.page, this.props.searchText);
    },
    componentWillReceiveProps: function(nextProps) {
        // When the component receive nextProps, send a jQuery AJAX request
        if ( nextProps.searchText != this.props.searchText 
            || nextProps.page != this.props.page)
            this.jsonRequest(nextProps.page, nextProps.searchText);
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