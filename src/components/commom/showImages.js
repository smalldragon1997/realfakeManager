import React, { Component } from 'react';
import {Avatar} from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export default class show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        const {size} = this.props;
        return (
            <div style={{width:"100%"}}>
                <span onClick={() => this.setState({ isOpen: true })}>
                    {
                        this.props.images.map(function (item, index) {
                            return (
                                <a key={index}>
                                    <Avatar src={item}
                                            shape={"square"}
                                            size={size}
                                            style={{marginRight: "1%"}}
                                    />
                                </a>
                            )
                        })
                    }
                </span>
                {isOpen && (
                    <Lightbox
                        imageCaption={this.props.comment}
                        mainSrc={this.props.images[photoIndex]}
                        nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
                        prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % this.props.images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}