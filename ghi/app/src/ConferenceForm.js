import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            starts: "",
            ends: "",
            description: "",
            maxPresentations: "",
            maxAttendees: "",
            locations: [],
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;

        let conferenceUrl = 'http://localhost:8000/api/conferences/';
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            // console.log(newConference);
            const cleared = {
                name: "",
                starts: "",
                ends: "",
                description: "",
                maxPresentations: "",
                maxAttendees: "",
            }
            this.setState(cleared);
        }


    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleStartDateChange(event) {
        const value = event.target.value;
        this.setState({starts: value});
    }

    handleEndDateChange(event) {
        const value = event.target.value;
        this.setState({ends: value});
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value});
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({maxPresentations: value});
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maxAttendees: value});
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
    
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            this.setState({locations: data.locations});
    }
}

    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} placeholder="Name" required type="text" value={this.state.name} name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleStartDateChange} placeholder="Starts" required type="date" value={this.state.starts} name="starts" id="starts" className="form-control" />
                    <label htmlFor="starts">Starts</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleEndDateChange} placeholder="Ends" required type="date" value={this.state.ends} name="ends" id="ends" className="form-control" />
                    <label htmlFor="ends">Ends</label>
                </div>
                <div className="form-label mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={this.handleDescriptionChange} required type="text" value={this.state.description} name = "description" id="description" className="form-control" rows="3"></textarea>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleMaxPresentationsChange} placeholder="Maximum Presentations" value={this.state.maxPresentations} required type="number" name = "max_presentations" id="max_presentations" className="form-control" />
                    <label htmlFor="max_presentations">Maximum Presentations</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleMaxAttendeesChange} placeholder="Maximum Attendees" required type="number" value={this.state.maxAttendees} name = "max_attendees" id="max_attendees" className="form-control" />
                    <label htmlFor="max_attendees">Maximum Attendees</label>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleLocationChange} required id="location" value={this.state.location} name = "location" className="form-select">
                    <option value="">Choose a location</option>
                    {this.state.locations.map(location => {
                        return (
                            <option key={location.id} value={location.id}>
                            {location.name}
                            </option>
                        );
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default ConferenceForm