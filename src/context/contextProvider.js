import React from "react";

const AppContext = React.createContext();

class AppContextComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 10,
            filterQuery:'',
            isNavigating: false,
            handleFilter: (e) => {

                const query = e.target.value.trim().toLowerCase();
                return this.setState((prev) => {
                    return {filterQuery: query}
                })
            },
            handleLoader: (mustShow) => this.setState(() => {
                return {isNavigating: mustShow}
            })
        }
    }
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppContext;
export {AppContextComponent};
