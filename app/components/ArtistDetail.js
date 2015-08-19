/** @jsx React.DOM */
var React = require('react');
var FavoriteList = require('./FavoriteList')
var ArtistDetail = require('./ArtistDetail')

var API_URL = "http://ws.audioscrobbler.com/2.0/?"
var API_KEY = "api_key=a8da4176b3e227778d267fdc4df7ab36"
var API_LIMIT = "&limit=8"
var API_FORMAT = "&format=json"
var API_TRACK = "&method=track.search&track="

var ArtistDetail = React.createClass({
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

module.exports = ArtistDetail;