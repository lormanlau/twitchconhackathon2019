import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './VideoComponent.css'

export default class VideoComponent extends React.Component {
	constructor(props) {
		super(props)
		this.twitch = window.Twitch ? window.Twitch.ext : null
		this.Authentication = new Authentication()
	}

	componentWillMount() {
		this.twitch.rig.log('component mounted')
	}

	render() {
		return(
			<div className="video_component">
				Hello World!
			</div>
		)
	}
}