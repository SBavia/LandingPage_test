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
    });

    // Slider

    const slides = document.querySelectorAll('.slide'),
          prev = document.querySelector('.prev'),
          next = document.querySelector('.next'),
          slidesField = document.querySelector('.carousel'),
          indicators = document.querySelectorAll('.dot');

    let slideIndex = 1;

    slidesField.style.transform = `translateX(${deleteNotDigits(window.getComputedStyle(slides[0]).getPropertyValue('margin-right')) / 2}px)`;

    slides.forEach((item, i) => {
        item.style.order = i;
    });

    changeActiveIndicator(1);

    function changeActiveIndicator(i, arr = indicators) {
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[i].style.opacity = 1;
    }

    indicators.forEach((item, i) => {
        item.setAttribute('data-slide-to', i);
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            // console.log(slideTo);
            switch (slideTo) {
                case '0':
                    // console.log(11111111111);
                    slides.forEach((item, i) => {
                        item.style.order = i - 1;
                        if (i == 0) {
                            item.style.order = slides.length - 1;
                        }
                    });
                    slideIndex = 0;
                    break;
                case '1':
                    slides.forEach((item, i) => {
                        item.style.order = i;
                    });
                    slideIndex = 1;
                    break;
                case '2':
                    slides.forEach((item, i) => {
                        item.style.order = i + 1;
                        if (i == slides.length - 1) {
                            item.style.order = 0;
                        }
                    });
                    slideIndex = 2;
                    break;
            }
            changeActiveIndicator(slideIndex);
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    slides.forEach(item => {
        item.addEventListener('click', () => {
            if (window.getComputedStyle(item).order == 2) {
                if (slideIndex == 2) {
                    slideIndex = 0
                } else {
                    slideIndex += 1;
                }
                slides.forEach(item => {
                    item.style.order = window.getComputedStyle(item).order - 1;
                    if (window.getComputedStyle(item).order == -1) {
                        item.style.order = slides.length - 1;
                    }
                });
                changeActiveIndicator(slideIndex);
            }
            if (window.getComputedStyle(item).order == 0) {
                if (slideIndex == 0) {
                    slideIndex = 2
                } else {
                    slideIndex -= 1;
                }
                slides.forEach(item => {
                    item.style.order = +window.getComputedStyle(item).order + 1;
                    if (window.getComputedStyle(item).order == slides.length) {
                        item.style.order = 0;
                    }
                });
                changeActiveIndicator(slideIndex);
            }
        });
    });

    // next.addEventListener('click', () => {
    //     if (offset == -860) {
    //         offset = 860;
    //     } else {
    //         offset -= 860;
    //     }
    //     slidesField.style.transform = `translateX(${offset}px)`;
    // });

    // prev.addEventListener('click', () => {
    //     if (offset == 860) {
    //         offset = -860;
    //     } else {
    //         offset += 860;
    //     }
    //     slidesField.style.transform = `translateX(${offset}px)`;
    // });

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal="sign-in"]'),
          signInModal = document.querySelector('#sign-in'),
          overlay = document.querySelector('.overlay'),
          signInBtn = document.querySelector('.btn_sign-in_submit'),
          register = document.querySelector('.modal__register > span');
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            overlay.style.display = 'block';
            signInModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        overlay.style.display = 'none';
        signInModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && window.getComputedStyle(modal).display == 'block') {
            closeModal();
        }
    });

    signInBtn.addEventListener('click', () => {
        alert(`
        Email: ${document.querySelector('#sign-in-email').value}
        Password: ${document.querySelector('#sign-in-password').value}
        `);
    });

    const signUpModal = document.createElement('div');

    signUpModal.classList.add('modal', 'modal_mini');
    signUpModal.setAttribute('id', 'sign-up');

    signUpModal.innerHTML = `
    <div class="modal__title">Create account</div>
    <form action="#">
        <label for="email" class="label label-email">E-mail</label>
        <input id="email" required name="name" type="email" class="modal__input">
        <label for="password" class="label label-password">Password</label>
        <input id="password" required  name="phone" type="password" class="modal__input">
        <button class="btn btn_sign-in btn_sign-in_submit">Sign Up</button>
    </form>
    <div class="modal__divider_full"></div>
    <div class="modal__register">Already have an account? <span>Log in</span></div>
    `;

    register.addEventListener('click', () => {
        signInModal.replaceWith(signUpModal);
    });
});