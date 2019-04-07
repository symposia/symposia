import React from "react";
import {withContext} from '../Context'


class Bookmark extends React.Component { 
    
    // constructor(props) {
    //     super(props);
    //     this.state= {
    //         bookmark: {title:""},
    //     }
    // }

    // componentWillReceiveProps(nextProps) {

    //     this.setState({bookmark: nextProps.bookmark})
    // }


    render() {

        const { bookmark } = this.props;

        return (
            <div className='bookmarks'> 
                 {
                   bookmark != null ?
                        <ul id='bookmark-list'>
                            {bookmark.title}
                        </ul> 
                        :
                     <ul></ul>
                } 
            </div>
        )
    }
}

export default withContext(Bookmark);