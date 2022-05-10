import React, { useState } from 'react';

// The editor core
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/plugins-image';

// Stylesheets for the rich text area plugin
// uncomment this
import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for the imagea plugin
import '@react-page/plugins-image/lib/index.css';

import { createTheme } from '@material-ui/core/styles'

// Define which plugins we want to use.
const cellPlugins = [slate(), image];

export const TestPage: React.FC = () => {
  const [value, setValue] = useState<Value>();

  return (
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
  );
}