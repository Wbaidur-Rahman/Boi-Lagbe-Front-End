import { Card, Col, Container, Row } from "react-bootstrap";
import AppendedHomeBody from "./AppendedHomeBody";

const HomePageBody = ({ getCatagoryBooks, user }) => {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Featured Books</Card.Title>
                <Card.Text>
                  Discover some of our top picks for you to rent and enjoy.
                </Card.Text>
                {/* Add your featured books or book carousel here */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Popular Categories</Card.Title>
                <Card.Text>
                  Explore books in various categories loved by our community.
                </Card.Text>
                {/* Add your popular categories or category carousel here */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Recently Added</Card.Title>
                <Card.Text>
                  Check out the latest additions to our book rental collection.
                </Card.Text>
                {/* Add your recently added books or book carousel here */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AppendedHomeBody getCatagoryBooks={getCatagoryBooks} user={user} />
    </>
  );
};

export default HomePageBody;
