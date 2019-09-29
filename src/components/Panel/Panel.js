import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import { requestHindrance } from '../../util/requests'

import './Panel.css'

export default class PanelComponent extends React.Component {
	constructor(props) {
		super(props)
		this.twitch = window.Twitch ? window.Twitch.ext : null
		this.Authentication = new Authentication()
	}

	componentWillMount() {
		this.twitch.rig.log("panel mounted")
	}

	componentWillUnmount(){

	}

	payForAction(hindrance_id) {
		this.twitch.rig.log(bitsValue)
		this.setState({isLoading: true})
		requestHindrance(hindrance_id)
		.then(() => {
			this.setState({isLoading: false})
			this.twitch.rig.log('success')
		})
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