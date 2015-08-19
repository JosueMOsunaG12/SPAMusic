/** @jsx React.DOM */
var React = require('react');

var FavoriteRow = React.createClass({
    handleRemoveFavorite: function () {
        var favorites = JSON.parse(localStorage.getItem('favorites'));
        var favoritesDOM = document.getElementById("favorites");

        favorites.splice([this.props.favorite_key], 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        React.render(
            <FavoriteList />, favoritesDOM
        );
    },
    render: function() {
        return (
            <div className="portfolio-item col-md-12 col-sm-12">
                <div className="portfolio-link col-md-4 col-sm-4">
                    <img src={this.props.favorite.image} 
                        className="img-responsive" alt="" />
                </div>
                <div className="portfolio-caption col-md-6 col-sm-6">
                    <h4>{this.props.favorite.name}</h4>
                    <p className="text-muted">
                        <i>By </i>{this.props.favorite.artist}
                    </p>
                </div>
                <div className="col-md-2 col-sm-2">
                    <button 
                        className="btn btn-default btn-danger" 
                        type="button"
                        onClick={this.handleRemoveFavorite}
                    >
                        <span 
                            className="glyphicon glyphicon-remove" 
                            aria-hidden="true">
                        </span>
                    </button>
                </div>
            </div>
        );
    }
});

var FavoriteList = React.createClass({
    render: function() {
        var favorites = JSON.parse(localStorage.getItem('favorites'));
        var rows = [];
        if(!favorites.length){
            return (
                <div>
                    <h2>My Favorites Tracks</h2>
                    <p>Not selected any favorite music</p>
                </div>
            );
        }

        favorites.reverse();
        for (var key in favorites)
        {
            favorite = favorites[key];
            rows.push(<FavoriteRow favorite={favorite} favorite_key={key} />);
        }
        return (
            <div className="favorites-list">
                <h2>My Favorites Tracks</h2>
                {rows}
            </div>
        );
    }
});

module.exports = FavoriteList;