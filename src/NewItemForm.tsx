import React, { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from './styles';
import { useFocus } from './utils/useFocus';

// Form for inputting a new item. 
// Contains the form itself plus a button to confirm.
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  const protectedAdd = (text: string) => {
    if (text.length > 0) {
      onAdd(text);
    }
  }

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      protectedAdd(text);
    }
  }

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      
      <NewItemButton onClick={() => protectedAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
}

type NewItemFormProps = {
  onAdd(text: string): void;
}