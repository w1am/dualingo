import React, { useState } from 'react';
import { Styles } from '../../styles';
import { categories } from '../../shared/categories';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const { Common, Identifier, Animations } = Styles;
const { List } = Identifier;
const { Messages } = Common;

const Identifiers = ({ list, setList, formData, clearInputField }) => {
  const [ category, setCategory ] = useState('');
  const [ error, setError ] = useState('');

  const onDelete = (key) => {
    let filteredItems = list.filter(item => {
      return (item.id !== key)
    });
    setList(filteredItems);
  }

  return (
    <div>
      <Common.Headers.Identifier>Identifiers</Common.Headers.Identifier>
      <Common.Description>
        Selecting the right categories make discovering of your
        products faster and reliable. Make sure to select the 
        appropriate ones.
      </Common.Description>

      <Common.Form.Identifier>Category</Common.Form.Identifier>

      <Common.Form.Input
        style={{ marginBottom: '0px', width: '100%' }}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Search or select category from list"
      />
      <List.Wrapper>
        {
          categories.map((cat, index) => {
            if ((cat.name.toLowerCase().indexOf(category.toLowerCase()) > -1)) {
              return (
                <div key={cat.id}>
                  <List.Item onClick={() => {
                    clearInputField('identifiers');
                    if (list.length > 2) {
                      setError('Maximum number of categories is 3');
                    } else {
                      setList([...list, cat]);
                      categories.splice(index, 1);
                    }
                  }}>{cat.name}</List.Item>
                </div>
              )
            }
          })
        }
      </List.Wrapper>

      {
        list.map((item, index) => (
          <div key={index} style={{ margin: '10px 0px', display: 'inline-block' }}>
            <Animations.FadeIn>
              <Common.Categories.Item>
                {item.name}
                <Common.Icons.Default
                  onClick={() => {
                    onDelete(item.id);
                    setError('')
                    categories.splice(item.id, 0, item)
                  }}
                  icon={faTimes} style={{ paddingRight: 0, paddingLeft: 5, cursor: 'pointer' }}
                />
              </Common.Categories.Item>
            </Animations.FadeIn>
          </div>
        ))
      }

      {
        (formData['identifiers'] && formData['identifiers'].error) && (
          <Animations.FadeIn>
            <Messages.Error>{formData['identifiers'].error}</Messages.Error>
          </Animations.FadeIn>
        )
      }

      {
        error.length >= 1 && (
          <Animations.FadeIn>
            <Common.Messages.Error>{error}</Common.Messages.Error>
          </Animations.FadeIn>
        )
      }
    </div>
  )
}

export default Identifiers;
