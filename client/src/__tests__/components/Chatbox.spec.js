import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Chatbox from '../../components/Chatbox';

describe('Chatbox', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should display the list of messages of the room', async () => {
    const fakeLogs = {
      logs: [
        { nickname: 'John', message: 'Hello everyone' },
        { nickname: 'Paul', message: "Hi John, what's up ?" },
      ],
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeLogs),
      })
    );
    await act(async () => {
      render(<Chatbox />, container);
    });
    expect(container.querySelector('#messages-log').textContent).toMatch("Hi John, what's up ?");
  });
});
