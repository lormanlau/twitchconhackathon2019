import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import { requestHindrance, postHindranceMessage } from '../../util/requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './Panel.css'

export default class PanelComponent extends React.Component {

	constructor(props) {
		super(props)
		this.twitch = window.Twitch ? window.Twitch.ext : null
		this.Authentication = new Authentication()
		this.state = {
			isLoading: true,
			theme: 'light',
			text: '',
			showBits: false
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	contextUpdate(context, delta) {
    if (delta.includes('theme')){
        this.setState( () => {
            return { theme: context.theme }
        })
    }
  }

	componentWillMount() {
		this.twitch.rig.log("panel mounted")
	}

	componentDidMount() {
		if (this.twitch) {
			this.twitch.onAuthorized(auth => {
				this.Authentication.setToken(auth.token, auth.userId);
				this.setState({
					isLoading: false,
					// broadcaster_id: auth.channelId
					broadcaster_id: 123
				});
			})

			this.twitch.onContext((context,delta)=>{
        this.contextUpdate(context,delta)
      })
		}
	}

	componentWillUnmount(){

	}

	payForAction(hindrance_id) {
		this.twitch.rig.log(hindrance_id, "requested")
		this.setState({isLoading: true})

		requestHindrance(this.state.broadcaster_id, hindrance_id)
		.then(data => {
			this.twitch.rig.log(data.message)
		})
		.catch(error => this.twitch.rig.log(error))
		.finally(() => this.setState({isLoading: false}))
	}

	payForActionWithMessage(hindrance_id, message) {
		this.twitch.rig.log(hindrance_id, "requested: " + message)
		this.setState({isLoading: true})

		postHindranceMessage(this.state.broadcaster_id, hindrance_id, message)
		.then(data => {
			this.twitch.rig.log(data.message)
		})
		.catch(error => this.twitch.rig.log(error))
		.finally(() => this.setState({isLoading: false}))
	}

	handleTextChange(event) {
		this.setState({text: event.target.value})
	}

	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.payForActionWithMessage("rainingText", this.state.text)
		}
	}

	handleClick(event) {
		console.log(this.state.text)
		this.payForActionWithMessage('rainingText', this.state.text)
	}

	handleFocus(event) {
		this.setState({showBits: true})
	}

	handleBlur(event) {
		if (this.state.text.length === 0) {
			this.setState({showBits: false})
		}
	}

	render() {
		let {isLoading, theme, text, showBits} = this.state;

		return (
			<div className='container'>		
				<img id='title_img'src={require("../../assets/title.png")}/>
				<div id='info_container'>Click to donate bits and make it interesting for your favorite streamer</div>	
				<div
					className={"action_button " + (isLoading ? "loading" : "")}
					onClick={() => this.payForAction("raveParty")}>
					<span className="button_title">The Worst Rave</span>
					<span className="bit_cost">200 bits</span>
				</div>
				<div
					className={"action_button " + (isLoading ? "loading" : "")}
					onClick={() => this.payForAction("colorShift")}>
					<span className="button_title">Color Shift</span>
					<span className="bit_cost">200 bits</span>
				</div>
				<div className="page">
					<label className="field a-field a-field_a1">
					    <input value={text} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} className="field__input a-field__input" placeholder="e.g. PogChamp" required></input>
					    <span className="a-field__label-wrap">
					      <span class="a-field__label">Send a Message, Make it Rain</span>
					    </span>
				  	</label>
				  	<div>
				  		{showBits && <span className="action_button input_bits" onClick={this.handleClick}>200 bits</span>}
				  	</div>
				</div>
			</div>
		);
	}
}
