import React from 'react';
import List from './List';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			landmark: '',
			places: [],
			isLoading: true,
			long: '',
			lat: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.showPosition = this.showPosition.bind(this);
		this.getUserLocation = this.getUserLocation.bind(this);
	}
	componentDidMount() {
       console.log(process.env.REACT_APP_KEY)
		this.setState({isLoading:true})
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getUserLocation);
		
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	}

	getUserLocation(position) {
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		this.setState({
			long: longitude,
			lat: latitude,
		}, () => {
			this.showPosition('bank')
		});
	}

	showPosition(place) {
		this.setState({ isLoading: true });
		//console.log(this.state.long + ' ' + this.state.lat);
		let key = 'AIzaSyDAE1Gb-3D6u8AJylnXqY8eko7Wi5pbAK8';
		fetch(
			`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.long}&radius=1500&type=${place}&keyword=${place}&key=${key}`,
			{
				method: 'GET',
				//mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((resp) => resp.json())
			.then((d) => {
			//	console.log(d);
				this.setState({
					places: d.results,
					isLoading: false,
				});
			});
	}
	handleChange(e) {
		e.preventDefault();
		this.setState({
			landmark: e.target.value,
		});
	}

	handleClick() {
		this.setState({ isLoading: true });
		let place = this.state.landmark;
		let key = 'AIzaSyDAE1Gb-3D6u8AJylnXqY8eko7Wi5pbAK8';
		fetch(
			`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${key}`,
			{
				method: 'GET',
				// mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((resp) => resp.json())
			.then((d) => {
				this.setState({
					places: d.results,
					isLoading: false,
				});
				// console.log(this.state.places);
			});
	}
	render() {
		return (
			<div className="App">
				<h1 className="heading">Search Landmarks in your Location</h1>
				<div className="searchArea">
					{' '}
					<input type="text" placeholder="search hospitals" onChange={this.handleChange} />
					<button onClick={this.handleClick}>Enter</button>
					<br />
					<button onClick={() => this.showPosition('bank')}>Bank</button>
					<button onClick={() => this.showPosition('restaurant')}>Restaurants</button>
					<button onClick={() => this.showPosition('museum')}>Museum</button>
					<button onClick={() => this.showPosition('cinema')}>Cinema</button>
				</div>
				{this.state.isLoading ? <p>Loading...</p> : <List places={this.state.places} />}
			</div>
		);
	}
}

export default App;
