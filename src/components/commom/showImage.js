import React, { Component } from 'react';
import {Avatar} from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export default class showImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        const { image , size} = this.props;
        const images = [image];
        return (
            <div>
                <span onClick={() => this.setState({ isOpen: true })}>
                    {
                       images.map(function (item, index) {
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
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}