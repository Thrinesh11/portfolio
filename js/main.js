/* --------------- Menu Show Y Hidden --------------- */

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* --------------- Show Menu --------------- */

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        navToggle.classList.add('hide-toggle')
        navClose.classList.remove('hide-toggle')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        navToggle.classList.remove('hide-toggle')
        navClose.classList.add('hide-toggle')
    })
}

/* --------------- Remove Mobile Menu --------------- */

const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
    navToggle.classList.remove('hide-toggle')
    navClose.classList.add('hide-toggle')
}
navLink.forEach((n) => n.addEventListener('click', linkAction))

/* --------------- Accordion Skills --------------- */
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function skillsToggle() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__closed'
    }

    if (itemClass === 'skills__content skills__closed') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((element) => {
    element.addEventListener('click', skillsToggle)
})

/* --------------- Qualification Tabs --------------- */

const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach((tab) => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/* --------------- Services Modal --------------- */

const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/* --------------- Portfolio Swiper --------------- */

let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})

/* --------------- Testimonial Swiper --------------- */

let swiperTestimonial = new Swiper('.testimonial__container', {

    cssMode: true,
    loop: true,
    //grabCursor: true,
    navigation: {
        nextE1: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    },
})

/* --------------- Scroll Sections active link --------------- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector('.nav__menu a[href*=' + sectionId + ']')
                .classList.add('active-link')
        } else {
            document
                .querySelector('.nav__menu a[href*=' + sectionId + ']')
                .classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* --------------- Change Background Header --------------- */

function scrollHeader() {
    const nav = document.getElementById('header')
    if (this.scrollY >= 80) nav.classList.add('scroll-header')
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* --------------- Show Scroll Up --------------- */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up')
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll')
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* --------------- Dark Light Theme --------------- */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const lightIconTheme = 'uil-sun'
const darkIconTheme = 'uil-moon'
const programmerImage = document.querySelector('image')

//already selected theme
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//Validate Dark Light theme and get current theme
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
    themeButton.classList.contains(lightIconTheme) ? 'uil-moon' : 'uil-sun'

// Vaidate if theme is previously chosen
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        darkTheme
    )
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](
        lightIconTheme
    )
    themeButton.classList[selectedIcon === 'uil-sun' ? 'add' : 'remove'](
        darkIconTheme
    )

    if (selectedTheme === 'dark') {
        programmerImage.setAttribute('href', 'assets/img/programmer-dark.png')
    } else {
        programmerImage.setAttribute('href', 'assets/img/programmer-light.png')
    }
}

//Activate/decativate dark theme manually
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(lightIconTheme)
    themeButton.classList.toggle(darkIconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

    if (getCurrentTheme() === 'dark') {
        programmerImage.setAttribute('href', 'assets/img/programmer-dark.png')
    } else {
        programmerImage.setAttribute('href', 'assets/img/programmer-light.png')
    }
})

//determines if the user has a set theme
function detectColorScheme() {
    var theme = 'light' //default to light

    //local storage is used to override OS theme settings
    if (!window.matchMedia) {
        //matchMedia method not supported
        return false
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //OS theme setting detected as dark
        var theme = 'dark'
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        //OS theme setting detected as dark
        var theme = 'light'
    }

    //dark theme preferred, set document with a `data-theme` attribute
    document.body.classList[theme === 'dark' ? 'add' : 'remove'](darkTheme)

    programmerImage.setAttribute(
        'href',
        theme === 'dark' ?
        'assets/img/programmer-dark.png' :
        'assets/img/programmer-light.png'
    )

    localStorage.setItem('selected-theme', theme)
    localStorage.setItem(
        'selected-icon',
        theme === 'dark' ? 'uil-moon' : 'uil-sun'
    )

    if (theme === 'dark') {
        themeButton.classList.add('uil-sun')
        themeButton.classList.remove('uil-moon')
    } else if (theme === 'light') {
        themeButton.classList.add('uil-moon')
        themeButton.classList.remove('uil-sun')
    }

    window
        .matchMedia('(prefers-color-scheme: light)')
        .addEventListener('change', () => {
            detectColorScheme()
        })
}
detectColorScheme()

let contactMeForm = document.getElementById("contactMeForm");

contactMeForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = contactMeForm.elements['name'].value;
    const email = contactMeForm.elements['email'].value;
    const jobDesc = contactMeForm.elements['jobDesc'].value;
    const message = contactMeForm.elements['message'].value;
    let messageText = `Hi, I'm ${name} and my email address is ${email}.`
    if (jobDesc) {
        messageText += ` I would like to discuss with you regarding a job offer and it's details are as follows:\n ${jobDesc}.`;
    }
    if (message) {
        messageText += `\n Also, please find my comments as follows: \n ${message}`;
    }

    const encodedText = encodeURIComponent(messageText)
    const url = "https://wa.me/+918500763398?text=" + encodedText;
    window.open(url, '_blank')
})