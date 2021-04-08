import React from 'react';
import { Carousel, Col, Image, Modal, Row } from 'react-bootstrap';

export const ItemModal = (props) => {
  const images = props.item.img.map((img, i) => {
    return (
      <Carousel.Item key={i}>
        <Image className={'itemModalImg'} src={img} />
      </Carousel.Item>
    );
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby={'modalTitle'}
      centered
      className={'itemModal'}
    >
      <Modal.Header className={'itemModalHeader'} closeButton>
        <h4>{props.item.name}</h4>
        {props.isAdmin ? (
          <button
            className={'delete'}
            value={props.item.id}
            onClick={props.itemDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
        ) : (
          <></>
        )}
      </Modal.Header>
      <Modal.Body className={'itemModalBody'}>
        <Row>
          <Col md={6}>
            <div>
              <Carousel className={'itemModalCarousel'}>{images}</Carousel>
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <Col
                md={{ span: 5, offset: 1 }}
                xs={{ span: 5, offset: 2 }}
                className={'itemDesc'}
              >
                <span>Наименование:</span>
                <span className={'line'} />
              </Col>
              <Col xs={4} className={'itemDescValues'}>
                {props.item.name}
              </Col>
              <Col
                md={{ span: 5, offset: 1 }}
                xs={{ span: 5, offset: 2 }}
                className={'itemDesc'}
              >
                Стоимость:
                <span className={'line'} />
              </Col>
              <Col xs={4} className={'itemDescValues'}>
                {props.item.price} руб.
              </Col>
              <Col
                md={{ span: 5, offset: 1 }}
                xs={{ span: 5, offset: 2 }}
                className={'itemDesc'}
              >
                Марка:
                <span className={'line'} />
              </Col>
              <Col xs={4} className={'itemDescValues'}>
                {props.item.brandName}
              </Col>
              <Col
                md={{ span: 5, offset: 1 }}
                xs={{ span: 5, offset: 2 }}
                className={'itemDesc'}
              >
                Модель:
                <span className={'line'} />
              </Col>
              <Col xs={4} className={'itemDescValues'}>
                {props.item.modelName}
              </Col>
              <Col
                md={{ span: 5, offset: 1 }}
                xs={{ span: 5, offset: 2 }}
                className={'itemDesc'}
              >
                Артикул:
                <span className={'line'} />
              </Col>
              <Col xs={4} className={'itemDescValues'}>
                #{props.item.article}
              </Col>

              <Col
                md={{ span: 8, offset: 1 }}
                xs={{ span: 8, offset: 2 }}
                className={'itemDescription'}
              >
                Описание:
              </Col>
              <Col
                md={{ span: 8, offset: 1 }}
                xs={{ span: 8, offset: 2 }}
                className={'itemDescriptionValue'}
              >
                {props.item.description}
              </Col>
            </Row>
          </Col>
        </Row>
        {/*<h4>{props.item.name}</h4>*/}
        {/*<p>{props.item.description}</p>*/}
        {/*<p>Цена: {props.item.price}</p>*/}
      </Modal.Body>
      <Modal.Footer className={'itemModalFooter'}></Modal.Footer>
    </Modal>
  );
};
