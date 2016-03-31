import React, {Component} from 'react';
import Container from '../../shared/Container';
import Heading from '../../shared/Heading';
import SimpleDndEditor from './SimpleDndEditor';
import CustomDndEditor from './CustomDndEditor';
import NavBar from '../../shared/NavBar';
import Separator from '../../shared/Separator';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Separator />
        <Container>
          <Heading level={ 2 }>Drag & Drop</Heading>
        </Container>
        <Container>
          <Heading level={ 2 }>Simple Example</Heading>
          <SimpleDndEditor />
        </Container>
        <Container>
          <Heading level={ 2 }>Custom Example</Heading>
          <CustomDndEditor />
        </Container>
      </div>
    );
  }
}
