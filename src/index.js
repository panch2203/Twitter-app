import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class TweetMain extends React.Component {

	constructor(props){
		super(props);
		this.state = {
	      value: [],
	      error: null,
	      textvalue : "",	     
	      isLoaded: false,
	      hour: "2019-03-27T05:26:56.828Z",
	    }
    this.agregarTweet = this.agregarTweet.bind(this)
    this.handleChange = this.handleChange.bind(this)      
	}

	componentDidMount(){
		fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
			.then(res => res.json())
			.then(
				(result) => {
				let newTweets = this.state.value.slice();
					this.setState({
						isLoaded: true,
						value: newTweets.concat(result.draft_tweets) 
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error:error
					});
				}
			)
	}

	handleChange(e) {
	    this.setState({
	      textvalue:e.target.value
	    })
	    let hourTweet = new Date().toLocaleTimeString();	
		console.log(hourTweet);	
		this.setState({hour: hourTweet});
	}	
	
	agregarTweet() {
		let tweet = {
			avatar : "https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg",
			user_name : "FranciscoDelgado",
			description : this.state.textvalue,
			created_at : this.state.hour,
		}
	    this.state.value.push(tweet)
	    this.setState(
	      this.state
	    )	    
	} 


	//Link para gatito img https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a3NmbeTOIkEcIHoGyWabEzCb7VIgNakbPtIiiN_RmnrSsZq1
	render(){
		let { value, error, isLoaded } = this.state;
		let content;
		console.log(value)

		if(error){			
			content = <div>Error: {error.message}</div>		
		}
		else if(!isLoaded){
			content = <div>Loading...</div>
		}

		else content = value.map((v, index) => {
			          return <div className="perfilTweet" key={index}>
			          {console.log(v)}
			          <TweetBody foto={v.avatar} nom={v.user_name} hour={v.created_at}></TweetBody><h1 className="texto">{v.description}</h1>
			          </div>			          
		})

		return(
			<div className="cuerpo">
				<div className="perfil">
					<img className="kitten" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg"></img> 
					
					<p className="textobold">FranciscoDelgado :)</p>
					<p className="textobold">@panch2203</p>
				</div>
				<Tweet value={value} error={error} isLoaded={isLoaded} handleChange={this.handleChange} agregarTweet={this.agregarTweet}></Tweet>				
			</div>
		);
	}
}

class Tweet extends React.Component{

	render(){
		let content;		

		if(this.props.error){			
			content = <div>Error: {this.props.error.message}</div>		
		}
		else if(!this.props.isLoaded){
			content = <div>Loading...</div>
		}
		else content = this.props.value.map((v, index) => {
			          return <div className="perfilTweet" key={index}>
			          {console.log(v)}
			          <TweetBody foto={v.avatar} nom={v.user_name} hour={v.created_at}></TweetBody><h1 className="texto">{v.description}</h1>
			          </div>			          
		})

		return(
			<div>
				<div>	
					<label className="texto">Publica tu tweet</label>
					<input type="text" name="tweet" onChange={ this.props.handleChange }></input>		    			   				  
					<button className="btnsubmit" onClick={ this.props.agregarTweet } className="texto">Publicar</button>
				</div>
				<div>
					{content}
				</div>
			</div>
		)
	}
}


class TweetBody extends React.Component{	

	render(){		
		return(			
			<div className="perfilTweet">
				<img className="kitten" src={this.props.foto}></img> 
				<p className="textobold">{this.props.nom}</p>
				<p className="textobold">{this.props.hour}</p>
			</div>
		);		
	}
}


ReactDOM.render(<TweetMain />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();