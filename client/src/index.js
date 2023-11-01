import './styles/main.scss';

import printName from './lib/printName';

const landingContent = document.querySelector('#landing-html')
const outputEl = document.querySelector('#output');

outputEl.innerHTML = landingContent.innerHTML;

printName('Hunter');