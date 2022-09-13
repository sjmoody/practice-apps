import React from 'react';
import Card from 'react-bootstrap/Card';
const DefinitionCard = (props) => (
  <Card style={{ width: '18rem'}}>
    <Card.Header>{props.word.headword}</Card.Header>
    <Card.Body>
    <Card.Text>
    {props.word.definition}
    </Card.Text>
    </Card.Body>
  </Card>

)

export default DefinitionCard;