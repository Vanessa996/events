import React from 'react';
import { Tab } from 'semantic-ui-react';
import './App.css';
import Event from "../Event/Event";
import Teacher from "../Teacher/Teacher";

const panes = [
    {
        menuItem: 'Teachers',
        render: () => <Tab.Pane><Teacher teachers={"Teachers"} /></Tab.Pane>,
    },
    {
        menuItem: 'Events',
        render: () => <Tab.Pane><Event events={"Events"}/></Tab.Pane>
    }
];

const App = () =>   <div className={"col-lg-12 mt-4 mx-auto"}>
                        <Tab panes={panes}
                             menu={{ fluid: true, vertical: true }}
                             menuPosition='right' />
                    </div>;

export default App;
