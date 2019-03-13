import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class Tweet extends React.Component {

	constructor(props){
		super(props);
		this.state = {
	      value: [],
	      textvalue : "",	      
	    }
    this.agregarTweet = this.agregarTweet.bind(this)
    this.handleChange = this.handleChange.bind(this)    
	}

	handleChange(e) {
	    this.setState({
	      textvalue:e.target.value
	    })
	}
	
	agregarTweet() {
	    this.state.value.push(this.state.textvalue)
	    this.setState(
	      this.state
	    )	    
	} 
	//Link para gatito img https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a3NmbeTOIkEcIHoGyWabEzCb7VIgNakbPtIiiN_RmnrSsZq1
	render(){
		let { value } = this.state;
		return(
			<div className="cuerpo">
				<div className="perfil">
					<img className="kitten" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg"></img> 
					
					<p className="textobold">FranciscoDelgado :)</p>
					<p className="textobold">@panch2203</p>
				</div>
				<div>	
					<label className="texto">Publica tu tweet</label>
					<input type="text" name="tweet" onChange={ this.handleChange }></input>			    			   				  
					<button className="btnsubmit" onClick={ this.agregarTweet } className="texto">Publicar</button>
				</div>
				<div>
					{value.map((v, index) => {
			          return <div className="perfilTweet" key={index}><TweetBody></TweetBody><h1 className="texto">{v}</h1></div>			          
			        })}
				</div>
			</div>
		);
	}
}


class TweetBody extends React.Component{
	constructor(props){
		super(props);		
		this.state = {
			hour: '10:30:2',
		}
		this.setHour = this.setHour.bind(this)

	}

	setHour(){
		let hourTweet = new Date().toLocaleTimeString();	
		console.log(hourTweet);	
		this.setState({hour: hourTweet});
	}

	render(){		
		return(			
			<div className="perfilTweet">{this.setHour}
				<img className="kitten" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg"></img> 
				<p className="textobold">FranciscoDelgado</p>
				<p className="textobold">{this.state.hour}</p>
			</div>
		);		
	}
}

class Container extends React.Component {
  render() {
    return (
      <Tweet 
      /> 
    )
  }
}


ReactDOM.render(<Tweet />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
