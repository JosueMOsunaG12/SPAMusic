/** @jsx React.DOM */
var React = require('react');
var TrackTable = require('./TrackTable');
var FavoriteList = require('./FavoriteList');
var Pager = require('./Pager')

var Hide = React.createClass({
  render: function(){
    return null;
  }
});

var SearchBar = React.createClass({
    getInitialState: function() {
        return {
            searchText: '',
        };
    },
    handleChange: function() {
        this.setState({
            searchText: this.refs.searchTextInput.getDOMNode().value,
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var searchText = this.refs.searchTextInput.getDOMNode().value;
        var page = 1;
        var hideSearchBar = document.getElementById("hide-search-bar");
        var results = document.getElementById("results");
        var favorites = document.getElementById("favorites");
        var pager = document.getElementById("pager");
        var option_pager = "TrackTable"

        $(hideSearchBar).css("height","84px");

        React.render(
            <TrackTable searchText={searchText} page={page} />, results
        );
        React.render(
            <Hide />, hideSearchBar
        );
        React.render(
            <FavoriteList />, favorites
        );
        React.render(
            <Pager searchText={searchText} />, 
            pager
        );
        React.render(
            <SearchBar />,
            document.getElementById("search-bar-2")
        );
    },
    render: function() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Your favorite artist or track"
                            value={this.state.searchText}
                            ref="searchTextInput"
                            onChange={this.handleChange}
                            />
                        <span className="input-group-btn">
                            <button 
                                className="btn btn-default btn-primary" 
                                type="button"
                                onClick={this.handleSubmit}
                            >
                                Search
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = SearchBar;