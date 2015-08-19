/** @jsx React.DOM */
var React = require('react');
var TrackTable = require('./TrackTable.js');

var Pager = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
        };
    },
    handleNext: function() {
        var new_page = this.state.page + 1; 

        React.render(
            <TrackTable searchText={this.props.searchText} page={new_page} />,
            results
        );

        this.setState({ page: new_page });
    },
    handlePrevious: function() {
        var new_page = this.state.page - 1;

        React.render(
            <TrackTable searchText={this.props.searchText} page={new_page} />, 
            results
        );

        this.setState({ page: new_page });
    },
    render: function(){
        return(
            <ul className="pager">
                {(this.state.page > 1) ? 
                <li>
                    <button 
                        className="btn btn-default btn-default" 
                        type="button"
                        onClick={this.handlePrevious}
                    >
                        Previous
                    </button>
                </li>: false}
                <li>
                    <button 
                        className="btn btn-default btn-default" 
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
        