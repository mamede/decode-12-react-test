import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List' 

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Campeiro', 'Leona', 'Perdido']} />)

    expect(getByText('Campeiro')).toBeInTheDocument()
    expect(getByText('Leona')).toBeInTheDocument()
    expect(getByText('Perdido')).toBeInTheDocument()

    unmount()
    rerender(<List initialItems={['Camps']} />)

    expect(getByText('Camps')).toBeInTheDocument()
    expect(queryByText('Perdido')).not.toBeInTheDocument()
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Novo');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument()
    })
  });

  it('should be able to add remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Campeiro']} />)

    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText('Campeiro')).not.toBeInTheDocument()
    })
  });
});