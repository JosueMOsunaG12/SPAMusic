/** @jsx React.DOM */
var React = require('react');
var SearchBar = require('./components/SearchBar.js');

$(document).ready(function () {
	//Initialize the local storage
	var object = [];
	localStorage.setItem('favorites', JSON.stringify(object));
	
	React.render(<SearchBar />, 
	document.getElementById('search-bar'));
});