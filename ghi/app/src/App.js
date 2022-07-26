import React from 'react';
import Nav from './Nav';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
            <Route path="/locations/new" element={<LocationForm />}/>
            <Route path="/conferences/new" element={<ConferenceForm />} />
            <Route path="/attendees" element={<AttendeesList attendees={props.attendees} />} />
            <Route path="/attendees/new" element={<AttendeeForm />} />
            <Route path="presentations/new" element={<PresentationForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;