/** @jsx React.DOM */
var React = require('react');

var FavoriteRow = React.createClass({
    render: function() {
        return (
            <div className="col-md-12 col-sm-12 portfolio-item">
                <div className="portfolio-link col-md-6 col-sm-6">
                    <img src={this.props.favorite.image} 
                        className="img-responsive" alt="" />
                </div>
                <div className="portfolio-caption col-md-6 col-sm-6">
                    <h4>{this.props.favorite.name}</h4>
                    <p className="text-muted"><i>By </i>{this.props.favorite.artist}</p>
                </div>
            </div>
        );
    }
});

var FavoriteList = React.createClass({
    render: function() {
        var favorites = JSON.parse(localStorage.getItem('favorites'));

        if(!favorites.length){
            return (
                <div>
                    <h2>Your Favorites</h2>
                    <p>Not selected any favorite music</p>
                </div>
            );
        }
        var rows = [];
        favorites.forEach(function(favorite) {
            rows.push(<FavoriteRow favorite={favorite} />);
        });
        return (
            <div>
                <h2>Your Favorites</h2>
                {rows}
            </div>
        );
    }
});

module.exports = FavoriteList;