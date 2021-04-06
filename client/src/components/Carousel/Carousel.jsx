import React from 'react';
import { Carousel } from 'react-bootstrap';

export const Carousels = (props) => {
  return (
    <>
      <Carousel className={'carousel'}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/700/300"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>1 slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/700/300"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>2 slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/700/300"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>3 slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/700/300"
            alt="fourth slide"
          />

          <Carousel.Caption>
            <h3>4 slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/700/300"
            alt="fifth slide"
          />

          <Carousel.Caption>
            <h3>5 slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
