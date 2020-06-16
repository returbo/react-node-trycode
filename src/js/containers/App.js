import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/terminal';

import { Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <div className='header'>
          <Header size='huge'>~trycode~</Header>
        </div>
        <div className="editor">
          <AceEditor
            mode="javascript"
            theme="terminal"
            name="editor"
            fontSize={20}
            editorProps={{ 
              $blockScrolling: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
