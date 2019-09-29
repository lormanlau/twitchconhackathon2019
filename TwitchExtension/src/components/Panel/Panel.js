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
		if (this.twitch) {
			this.twitch.rig.log("panel mounted")
			this.twitch.onContext((context,delta)=>{
				this.contextUpdate(context,delta)
			})
		}
	}

	componentWillUnmount(){

	}

	payForAction(hindrance_id) {
		// this.twitch.rig.log(bitsValue)
		this.setState({isLoading: true})
		setTimeout(() => {
		  console.log('Hello, World!')
			this.setState({isLoading: false})
		}, 3000);
		// requestHindrance(hindrance_id)
		// .then(() => {
		// 	this.setState({isLoading: false})
		// 	this.twitch.rig.log('success')
		// })
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
