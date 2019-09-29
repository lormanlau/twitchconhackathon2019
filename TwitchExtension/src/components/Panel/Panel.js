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
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
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
					broadcaster_id: auth.channelId
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

	render() {
		let {isLoading, theme, text} = this.state;

		if (isLoading) {
			if (theme == "light") {
				return (
					<div className='container'>
						<div className="action_button_loading_light" onClick={() => this.payForAction("raveParty")}>
							<h3>Rave Party</h3>
						</div>
						<div className="action_button_loading_light" onClick={() => this.payForAction("invertColors")}>
							<h3>Invert Colors</h3>
						</div>
						<div class="page">
							<label class="field a-field a-field_a1">
						    <input value={text} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} class="field__input a-field__input" placeholder="e.g. PogChamp" required></input>
						    <span class="a-field__label-wrap">
						      <span class="a-field__label">Post a Message</span>
						    </span>
						  </label>
						</div>
						<div className = "loading-icon">
							<FontAwesomeIcon className="loading-flip" icon={faSpinner} size="2x" color="black" spin />
						</div>
					</div>
				);
			} else {
				return (
					<div className='container'>
						<div className="action_button_loading_dark" onClick={() => this.payForAction("raveParty")}>
							<h3>Rave Party</h3>
						</div>
						<div className="action_button_loading_dark" onClick={() => this.payForAction("invertColors")}>
							<h3>Invert Colors</h3>
						</div>
						<div class="page">
							<label class="field a-field a-field_a1">
						    <input value={text} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} class="field__input a-field__input" placeholder="e.g. PogChamp" required></input>
						    <span class="a-field__label-wrap">
						      <span class="a-field__label">Post a Message</span>
						    </span>
						  </label>
						</div>
						<div className = "loading-icon">
							<FontAwesomeIcon className="loading-flip" icon={faSpinner} size="2x" color="white" spin />
						</div>
					</div>
				);
			}
		} else {
			if (theme == "light") {
				return (
					<div className='container'>
						<div className="action_button_light" onClick={() => this.payForAction("raveParty")}>
							<h3>Rave Party</h3>
						</div>
						<div className="action_button_light" onClick={() => this.payForAction("invertColors")}>
							<h3>Invert Colors</h3>
						</div>
						<div class="page">
							<label class="field a-field a-field_a1">
						    <input value={text} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} class="field__input a-field__input" placeholder="e.g. PogChamp" required></input>
						    <span class="a-field__label-wrap">
						      <span class="a-field__label">Post a Message</span>
						    </span>
						  </label>
						</div>
					</div>
				);
			} else {
				return (
					<div className='container'>
						<div className="action_button_dark" onClick={() => this.payForAction("raveParty")}>
							<h3>Rave Party</h3>
						</div>
						<div className="action_button_dark" onClick={() => this.payForAction("invertColors")}>
							<h3>Invert Colors</h3>
						</div>
						<div class="page">
							<label class="field a-field a-field_a1">
						    <input value={text} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} class="field__input a-field__input" placeholder="e.g. PogChamp" required></input>
						    <span class="a-field__label-wrap">
						      <span class="a-field__label">Post a Message</span>
						    </span>
						  </label>
						</div>
					</div>
				);
			}
		}
	}
}
