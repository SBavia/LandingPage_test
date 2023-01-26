window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
          menuItem = document.querySelectorAll('.menu__item'),
          hamburger = document.querySelector('.hamburger'),
          close = document.querySelector('.menu__close');

    function ToggleMenu(element) {
        element.addEventListener('click', () => {
            menu.classList.toggle('menu_active');
            document.body.classList.toggle('hidden');
        });
    }

    ToggleMenu(hamburger);
    ToggleMenu(close);

    menuItem.forEach(item => {
        ToggleMenu(item);
    })
})