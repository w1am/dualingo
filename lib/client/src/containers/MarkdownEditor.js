import React, { useState, useRef, useCallback } from 'react';
import JoditEditor from "jodit-react";

import { Styles } from '../styles';
const { Common, Markdown } = Styles;

const MarkdownEditor = React.memo(({ content, setContent, options }) => {
  const editor = useRef(null)

  const handleBlur = useCallback((newContent) => {
    setContent(newContent)
  }, []);
	
	const config = {
		readonly: false,
    buttons: [...options],
    buttonsMD: [...options],
    buttonsXS: [...options],
    buttonsSM: [...options],
    autofocus: true,
    showCharsCounter: false,
    showWordsCounter: false,
    beautifyHTML: false,
    showXPathInStatusbar: false,
    toolbarSticky: false,
    maxWidth: '100%'
	}
  
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={newContent => handleBlur(newContent)}
      onChange={newContent => {}}
    />
  )
})

export default MarkdownEditor;
