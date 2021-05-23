import React from 'react';
import { fetchWorldData } from '../server/api/corona-lmao-ninja';

class CoronaTracker extends React.Component {
    state = {
        data: {}
    }
    async componentDidMount() {
        let data = await fetchWorldData();
        console.log(data);
        this.setState({ data });
    }

    render () {
        const { data } = this.state;
        return (
            <div>
                Covid App
            </div>
        )
    }
}

export default CoronaTracker;