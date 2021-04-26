import React from 'react';
import { Col, Image, Carousel } from 'react-bootstrap';

export const Item = (props) => {
  const images = props.images.map((img, i) => {
    return (
      <Carousel.Item key={i}>
        <Image className={'itemImages'} src={img} />
      </Carousel.Item>
    );
  });
  return (
    <Col md={4} sm={6} xs={12}>
      <Col className={'item'} onClick={props.itemModalShow} id={props.id}>
        <Carousel className={'itemCarousel'}>{images}</Carousel>
        <div className={'itemDescriptionBlock'}>
          <p className={'itemTitle text-truncate'}>{props.title}</p>
          <p className={'itemDescription text-truncate'}>{props.description}</p>
          <p className={'itemArticle text-truncate'}>
            Категория: {props.brandName} | {props.modelName} | {props.year}
          </p>
          <p className={'itemArticle'}>Артикул: #{props.article}</p>
          <p className={'itemPrice'}>Цена: {props.price} руб.</p>
        </div>
      </Col>
    </Col>
  );
};
