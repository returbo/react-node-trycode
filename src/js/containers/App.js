import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/terminal';
import { Header, Input, Button } from 'semantic-ui-react'

import socket from '../socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      connected: false,
      room: '---',
    }
    this.handleChange = this.handleChange.bind(this);
    this.connectRoom = this.connectRoom.bind(this);
  }

  handleChange(value) {
    socket.emit('CHANGE_CLIENT', {
      room: this.state.room,
      code: value,
    });
    this.setState({
      value,
    });
  }

  componentDidMount() {
    socket.on('CHANGE_SERVER', value => {
      this.setState({
        value,
      });
    });
  }
  
  connectRoom() {
    socket.emit('JOIN_ROOM', this.state.room);
    this.setState({
      connected: true,
    })
  }



  render() {
    return (
      <div>
        <div className='header'>
    <Header size='huge'>TRYCODE ROOM: {this.state.room}</Header>
          <Input 
            disabled={this.state.connected}
            onChange={e => this.setState({ room: e.target.value })} 
          />
          <Button
            disabled={this.state.connected}
            onClick={this.connectRoom}
          >
            Connect
          </Button>
        </div>
        <div className="editor">
          <AceEditor
            mode="javascript"
            theme="terminal"
            name="editor"
            showGutter={true}
            highlightActiveLine={true}
            fontSize={20}
            editorProps={{
              $blockScrolling: true,
            }}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
