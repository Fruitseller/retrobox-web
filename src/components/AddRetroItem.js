import React from 'react';
import '../AddRetroItem.css'

class AddRetroItem extends React.Component {

    onChange = (values) => {
        console.log(values);
    }

    render() {
        return (
            <div className="input">
                <div className="input-container">
                   <input onChange={this.onChange} type="text" className="input-field" placeholder="Enter your retro thoughts" />
                    <div className="input-field-shadow"></div>
                </div>
            </div>
        )
    }
}

export default AddRetroItem;