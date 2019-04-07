import React from "react";


class Bookmark extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state= {
            bookmark: {title:""},
        }
    }

    componentWillReceiveProps(nextProps) {
        console.clear()
        console.log(nextProps);
        this.setState({bookmark: nextProps.data})
    }


    render() {
        // this.state.bookmarkList.forEach(function(value) {
        //     console.log(value);
        //     bookmarks.push(<div> {value} </div>)
        // })

        console.log(this.props.data);

        const { bookmark } = this.state;

        return (
            <div className='bookmarks'> 
                 {
                    this.state.bookmark != null ?
                        <ul id='bookmark-list'>
                       
                            {this.state.bookmark.title}
                        </ul> 
                        :
                     <ul></ul>
                } 
            </div>
        )
    }
}

export default Bookmark;
