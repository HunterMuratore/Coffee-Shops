import axios from 'axios';
import { render } from './actions';

import landingContent from '../views/landing.hbs';
import headerView from '../views/header.hbs';
import loginView from '../views/login.hbs';
import shopsView from '../views/shops.hbs'; // When you import a handlebars template it gives you a function you can call to render the template with data options

async function showShops() {
    const { data: shops } = await axios.get('/api/shops');
    
    render(shopsView, { shops });
}

async function loginUser(e) {
    e.preventDefault();

    const { login, password } = e.target;

    await axios.post('/auth/login', {
        login: login.value,
        password: password.value
    });

    window.location = '/';
}

async function logoutUser(e) {
    e.preventDefault();

    await axios.get('/auth/logout');

    window.location = '/';
}

function showLogin(e) {
    e.preventDefault();

    render(loginView);

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', loginUser);
}

async function showHeader() {
    const res = await axios.get('/auth/authenticate');
    const headerEl = document.querySelector('#main-header');

    // Set the user data to the window global variable to be used anywhere
    window.user = res.data;

    headerEl.innerHTML = headerView({ user: res.data });

    // Target all links with an href of /login
    const loginLink = document.querySelector('a[href="/login"]');

    if (loginLink) {
        loginLink.addEventListener('click', showLogin);
    }

    const logoutLink = document.querySelector('a[href="/logout"]');

    if (logoutLink) {
        logoutLink.addEventListener('click', logoutUser);
    }
}

function initViews() {
    showHeader();

    render(landingContent);

    const shopViewBtn = document.querySelector('#shop-view-btn');
    shopViewBtn.addEventListener('click', showShops);
}

export default initViews;

