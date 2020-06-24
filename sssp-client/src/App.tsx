import { hot } from 'react-hot-loader/root'
import React from 'react';

import {Bar} from './components/Bar';



const App: React.FC = () => {
    return (
        <div>
            <Bar />
        </div>

    );
}

export default hot(App);
