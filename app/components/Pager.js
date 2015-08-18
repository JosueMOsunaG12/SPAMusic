/** @jsx React.DOM */
var React = require('react');
var TrackTable = require('./TrackTable.js');

var Hide = React.createClass({
  render: function(){
    return null;
  }
});

var Pager = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
        };
    },
    handleNext: function() {
        var new_page = this.state.page + 1; 
        var self = this;

        React.render(
            <TrackTable searchText={self.props.searchText} page={new_page} />,
            results
        );

        self.setState({ page: new_page });
    },
    handlePrevious: function() {
        var new_page = this.state.page - 1; 
        var self = this;

        React.render(
            <Hide />, results
        );
        React.render(
            <TrackTable searchText={self.props.searchText} page={new_page} />, 
            results
        );

        self.setState({ page: new_page });
    },
    render: function(){
        return(
            <ul className="pager">
                <li>
                    <button 
                        className="btn btn-default btn-primary" 
                        type="button"
                        onClick={this.handlePrevious}
                    >
                        Previous
                    </button>
                </li>               
                <li>
                    <button 
                        className="btn btn-default btn-primary" 
                        type="button"
                        onClick={this.handleNext}
                    >
                        Next
                    </button>
                </li>
            </ul>
        );
    }
});

module.exports = Pager;
        