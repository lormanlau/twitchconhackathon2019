import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import { requestHindrance } from '../../util/requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './Panel.css'

export default class PanelComponent extends React.Component {

	constructor(props) {
		super(props)
		this.twitch = window.Twitch ? window.Twitch.ext : null
		this.Authentication = new Authentication()
		this.state = {
			isLoading: false,
			theme: 'light',
		}
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

	render() {
		let {isLoading} = this.state;
		let {theme} = this.state;
		console.log(theme);
		if (isLoading) {
			if (theme == "light") {
				return (
					<div className='container'>
						<div className="action_button_loading_light" onClick={() => this.payForAction(100)}>
							<h3>Flip Screen Orientation</h3>
						</div>
						<div className="action_button_loading_light" onClick={() => this.payForAction(200)}>
							<h3>Invert Colors</h3>
						</div>
						<div className="action_button_loading_light" onClick={() => this.payForAction(300)}>
							<h3>Shuffle Keyboard</h3>
						</div>
						<div className = "loading-icon">
							<FontAwesomeIcon className="loading-flip" icon={faSpinner} size="2x" color="black" spin />
						</div>
					</div>
				);
			} else {
				return (
					<div className='container'>
						<div className="action_button_loading_dark" onClick={() => this.payForAction(100)}>
							<h3>Flip Screen Orientation</h3>
						</div>
						<div className="action_button_loading_dark" onClick={() => this.payForAction(200)}>
							<h3>Invert Colors</h3>
						</div>
						<div className="action_button_loading_dark" onClick={() => this.payForAction(300)}>
							<h3>Shuffle Keyboard</h3>
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
						<div className="action_button_light" onClick={() => this.payForAction(100)}>
							<h3>Flip Screen Orientation</h3>
						</div>
						<div className="action_button_light" onClick={() => this.payForAction(200)}>
							<h3>Invert Colors</h3>
						</div>
						<div className="action_button_light" onClick={() => this.payForAction(300)}>
							<h3>Shuffle Keyboard</h3>
						</div>
					</div>
				);
			} else {
				return (
					<div className='container'>
						<div className="action_button_dark" onClick={() => this.payForAction(100)}>
							<h3>Flip Screen Orientation</h3>
						</div>
						<div className="action_button_dark" onClick={() => this.payForAction(200)}>
							<h3>Invert Colors</h3>
						</div>
						<div className="action_button_dark" onClick={() => this.payForAction(300)}>
							<h3>Shuffle Keyboard</h3>
						</div>
					</div>
				);
			}
		}
	}
}
