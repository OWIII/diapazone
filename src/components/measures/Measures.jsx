import { useEffect, useState } from 'react';
import axios from 'axios';

import { ALL_IMAGES_DEV } from '../../common/constants';
import { getAllImages } from '../../common/routers'
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Image } from './components/Image/Image'

export const Measures = () => {
  const [measures, setMeasures] = useState([]);
  const [image, setUrlImage] = useState(null);

  const RandomImageUrl = (arrayOfImages) => {
    const image = arrayOfImages[Math.floor(Math.random()*arrayOfImages.length)];
    setUrlImage(image);
  };

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios(getAllImages);
      const { data } = result.data;

      setMeasures(data);
    };

    FetchData();
  }, []);

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          {
            measures.length !== 0 ?
            <Button variant="dark" size="lg" onClick={() => RandomImageUrl(measures)}>
              Случайный измеритель
            </Button> :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
        </Col>
      </Row>
      { image && <Image {...image}/> }
    </Container>
  )
}