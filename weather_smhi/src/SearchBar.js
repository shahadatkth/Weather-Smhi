import React from "react";

/* global google */

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            {
                types: ['(cities)'],
                componentRestrictions: {country: 'se'}

            }
        );

        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();

        this.props.onPlaceChanged(place);
    }

    render() {
        return (

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">

                    <div className="card-body row no-gutters align-items-center">


                        <div className="col">
                            <input className="form-control form-control-lg form-control-borderless"
                                   ref={this.autocompleteInput}
                                   id="autocomplete"
                                   placeholder="Enter your address"
                                   type="search"
                            />

                        </div>
                        <div className="col-auto">
                            <i className="fas fa-search h4 text-body"></i>
                        </div>


                    </div>

                </div>

            </div>


        );
    }
}

export default SearchBar;
