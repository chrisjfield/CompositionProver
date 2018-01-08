import * as React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

export function AppLoading() {
    return (
        <div>
            <CircularProgress size={80} thickness={5}/>
        </div>
    );
}

export function AppUpdating() {
    return (
        <div>
            <CircularProgress size={30} thickness={2}/>
        </div>
    );
}
