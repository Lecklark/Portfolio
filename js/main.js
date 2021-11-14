
//СЛИК_СЛАЙДЕР
$(document).ready(function () {
    $('.slider').slick({
        dots: true,
        slidesToShow: 3,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 2,

                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,

                }
            }

        ]
    });

});


//Меню-бургер
const iconHeader = document.querySelector(".header__icon");
const headerNav = document.querySelector(".header__nav");
if (iconHeader) {
    iconHeader.addEventListener("click", () => {
        document.body.classList.toggle('lock');
        iconHeader.classList.toggle('header__icon_active');
        headerNav.classList.toggle('header__nav_active');
    });
}


//Скролл к цели
const menuLinks = document.querySelector('.header__nav');
menuLinks.addEventListener("click", onMenuLinkClick);

function onMenuLinkClick(e) {
    const menuLink = e.target;
    console.log(menuLink);
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

        if (iconHeader.classList.contains("header__icon_active")) {
            document.body.classList.remove('lock');
            iconHeader.classList.remove('header__icon_active');
            headerNav.classList.remove('header__nav_active');
        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        e.preventDefault();
    }
}




//Заполнение данными с помошью git api
let url = 'https://api.github.com/users/Lecklark';
fetch(url)
    .then(response => response.json())
    .then(responseJSON => {

        document.querySelector(".main-info__avatar").src = responseJSON.avatar_url;
        let git = document.querySelector(".footer__cont-git");
        let gitIcon = document.querySelector(".footer__links_git");
        git.href = responseJSON.html_url;
        gitIcon.href = responseJSON.html_url;
        git.innerHTML = "GitHub: " + " " + responseJSON.login;
        document.querySelector(".main-info__name").innerHTML = responseJSON.name;
        fetch(responseJSON.repos_url)
            .then(response => response.json())
            .then(answer => {
                answer.forEach(repo => {

                    fetch(`https://api.github.com/repos/${responseJSON.login}/${repo.name}/contents`)
                        .then(res => res.json())
                        .then(data => {

                            data.forEach(files => {
                                if (files.name == 'preview.png') {
                                    const newElementRepo = document.createElement('div');
                                    newElementRepo.innerHTML = `<div><div class="slider__item">
                                    <a href="https://lecklark.github.io/${repo.name}" class="slider__pos">
                                       <div class ="ibg"> <img class="slider__img" src="${files.download_url}" alt="preview"></div>
                                        <div class="slider__text">${repo.description}</div>
                                    </a></div></div>`;
                                    $('.slider').slick('slickAdd', newElementRepo);
                                    ibg();
                                }
                            })
                        })
                });
            })
    })


//функция, заменяющая img на backrgound
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

