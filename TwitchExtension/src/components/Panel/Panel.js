import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import { requestHindrance } from '../../util/requests'

import './Panel.css'

export default class PanelComponent extends React.Component {
	constructor(props) {
		super(props)
		this.twitch = window.Twitch ? window.Twitch.ext : null
		this.Authentication = new Authentication()
		this.state = {
			isLoading: false,
			theme: 'light'
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

	contextUpdate(context, delta) {
		if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
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
		let {isLoading} = this.state
		return (
			<div className='container'>
				<div className="action_button" onClick={() => this.payForAction(100)}>
					Flip Screen Orientation
				</div>
				<div className="action_button" onClick={() => this.payForAction(200)}>
					Invert Colors
				</div>
				<div className="action_button" onClick={() => this.payForAction(300)}>
					Shuffle Keyboard
				</div>
			</div>
			)
	}
}