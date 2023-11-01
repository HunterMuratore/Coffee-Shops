import './styles/main.scss';

import { render } from './lib/actions';

import landingContent from './views/landing.hbs';

render(landingContent, {
    name: 'Hunter',
    coffees: ['Black', 'Caramel Latte', 'Chai Tea']
})
