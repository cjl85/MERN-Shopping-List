import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSStransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class GroceryList extends Component {
  state = {
    items: [
      {id: uuid(), name: 'Eggs'},
      {id: uuid(), name: 'Meat'},
      {id: uuid(), name: 'Water'},
      {id: uuid(), name: 'Apple'},
    ]
  }

  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Enter Item');
            if(name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }));
            }
          }}
        >Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="grocery-list">
            {items.map(({id, name}) => (
              <CSStransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    this.setState(state => ({
                      items: state.items.filter(item => item.id !== id)
                    }));
                  }}
                >&times;
                </Button>
                  {name}
                </ListGroupItem>
              </CSStransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default GroceryList;
