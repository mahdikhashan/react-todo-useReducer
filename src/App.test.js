import React from 'react'
global.React = React

import { render, screen } from '@testing-library/react';
import { newTodo, Todo } from './App';

test('Should return an object with new name by calling newTodo', () => {
  const result = newTodo('My new Item')

  expect(result).toBeDefined()
  expect(result).toHaveProperty('id')
  expect(result).toHaveProperty('name')
  expect(result).toHaveProperty('complete')
  expect(Object.values(result)).toContain('My new Item')
});

test('Should render Todo component', async () => {
  const todoItem = newTodo('My new Item')
  const dispatcher = jest.fn(() => [])

  render(<Todo todo={todoItem} dispatch={dispatcher} />)

  const itemValue = screen.getByText(/My new Item/i);
  expect(itemValue).toBeInTheDOM()
})
