import React from 'react';
import { Col, Image, Carousel, Button } from 'react-bootstrap';
import bamper from '../../../bamper.jpg';

export const Item = (props) => {
  const images = props.images.map((img) => {
    return (
      <Carousel.Item className={'itemImages'}>
        <Image className={'itemImages'} src={img} />
      </Carousel.Item>
    );
  });
  return (
    <Col md={4} sm={6} xs={12}>
      <Col className={'item'}>
        {props.isAdmin ? (
          <button
            className={'delete'}
            value={props.id}
            onClick={props.itemDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
        ) : (
          <></>
        )}
        <Carousel>{images}</Carousel>
        <div className={'itemDescriptionBlock'}>
          <p className={'itemTitle'}>{props.title}</p>
          <p className={'itemDescription text-truncate'}>{props.description}</p>
          <p className={'itemPrice'}>Цена: {props.price}</p>
          <p className={'itemArticle'}>Артикул: #{props.article}</p>
        </div>
      </Col>
    </Col>
  );
};
