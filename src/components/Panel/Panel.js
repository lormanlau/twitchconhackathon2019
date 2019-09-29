import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './Panel.css'

import { getRequest } from '../../util/requests'


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

	payForAction(bitsValue) {
		getRequest()
		.then(data => {
			this.twitch.rig.log(data)
		})
	}

	render() {
		return (
			<div>
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