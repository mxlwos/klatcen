// Отправка формы
if (document.querySelector(".form")) {
	document.querySelector(".form").addEventListener('submit', async function (e) {
		e.preventDefault();

		let mailFormData = new FormData(e.target);

		mailFormData.append("action", "sendMail");
		let response = await fetch('/wp-admin/admin-ajax.php', {
			method: 'POST',
			body: mailFormData
		});
		if (response.ok) {
			document.querySelector(".form").remove();
			document.querySelector(".form__message").classList.add("_active");
		} else {
			alert("Произошла ошибка");
		}
	});
}


// Инициализировать слайдер

if (document.querySelector('.selector')) {
	var sliderPartners = new Swiper('.selector', {
		spaceBetween: 16,
		slidesPerView: '1',
		watchOverflow: true,
		pagination: {
			el: '.selector__pagination',
			clickable: true,
			// dynamicBullets: true,
		},
		navigation: {
			nextEl: ".selector__next",
			prevEl: ".selector__prev",
		},
		breakpoints: {
			320: {
				slidesPerView: '1.2',
			},
			600: {
				slidesPerView: '1.3',
			},
			992: {
				slidesPerView: '1.8',
			},
		}
	});
}

if (document.querySelector('.reviews__swiper')) {
	var sliderPartners = new Swiper('.reviews__swiper', {
		spaceBetween: 40,
		slidesPerView: '1.3',
		watchOverflow: true,
		pagination: {
			el: '.reviews__pagination',
			type: "fraction",
		},
		navigation: {
			nextEl: ".reviews__next",
			prevEl: ".reviews__prev",
		},
		breakpoints: {
			320: {
				slidesPerView: '1',
			},
			600: {
				slidesPerView: '1',
			},
			992: {
				slidesPerView: '1.32',
			},
		}
	});
}

if (document.querySelector('.clients-logos__swiper')) {
	var sliderPartners = new Swiper('.clients-logos__swiper', {
		spaceBetween: 16,
		slidesPerView: 'auto',
		autoplay: {
			enabled: true,
			delay: 0,
		},
		speed: 2000,
		loop: true,
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: '3.5',
			},
			600: {
				slidesPerView: '5.5',
			},
			992: {
				slidesPerView: '9',
			},
		}
	});
}

if (document.querySelector('.articles-home__swiper')) {
	var sliderPartners = new Swiper('.articles-home__swiper', {
		spaceBetween: 32,
		slidesPerView: '4',
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: '1.5',
				spaceBetween: 16,
			},
			600: {
				spaceBetween: 16,
				slidesPerView: '2.5',
			},
			992: {
				slidesPerView: '4',
				spaceBetween: 16,
			},
			1270: {
				slidesPerView: '4',
				spaceBetween: 32,
			},
		}
	});
}

// Добавить событие к массиву элементов
function addArrayEvent($array, $event, $function, $mobileHide = false) {
	$array.forEach(function ($item) {
		$item.addEventListener($event, function (event) {
			if ($mobileHide) {
				if (window.innerWidth > 992) { $function($item); }
			} else {
				$function($item);
			}
		});
	});
}

let slideMenu = document.querySelector(".slide-menu");

let menus = document.querySelectorAll(".menu__title");
addArrayEvent(menus, "click", menuFunction, true);

function menuFunction(menu) {

	let list = document.querySelector(".slide-menu__list[data-menu='" + menu.getAttribute("data-menu") + "']")
	let prev = document.querySelector(".slide-menu__list._active");
	if (prev) {

		if (menu.getAttribute("data-menu") == prev.getAttribute("data-menu")) {
			slideMenu.classList.remove("_active");
		} else {
			list.classList.add("_active");
		}
		prev.classList.remove("_active");
	} else {
		slideMenu.classList.add("_active");
		list.classList.add("_active");
	}
	body_lock_add(500);
}

if (document.querySelector(".slide-menu__list[data-menu='services']")) {
	let slideItems = document.querySelector(".slide-menu__list[data-menu='services']").querySelectorAll(".slide-menu__item");
	addArrayEvent(slideItems, "mouseenter", slideItemsFunction, true);
}
function slideItemsFunction(slideItem) {

	slideItem.querySelectorAll(".slide-menu__sub").forEach(function (slideSubTemp) {
		slideSubTemp.classList.remove("_gray");
	});

	slideItems.forEach(function (slideItemTemp) {
		slideItemTemp.classList.add("_gray");
	});

	let prev = document.querySelector(".slide-menu__item._active");
	if (prev) {
		prev.classList.remove("_active");
	}

	slideItem.classList.add("_active");
}



let slideSubs = document.querySelectorAll(".slide-menu__sub");
addArrayEvent(slideSubs, "mouseenter", slideSubsFunction, true);
function slideSubsFunction(slideSub) {
	slideSub.closest(".slide-menu__subs").querySelectorAll(".slide-menu__sub").forEach(function (slideSubTemp) {
		slideSubTemp.classList.add("_gray");
	});

	let prev = slideSub.closest(".slide-menu__subs").querySelector(".slide-menu__sub._active");
	if (prev) {
		prev.classList.remove("_active");
	}
	slideSub.classList.add("_active");
}


let headerClose = document.querySelector(".header__close");
if (headerClose) {
	headerClose.addEventListener("click", function (event) {
		if (window.innerWidth < 992) {
			headerClose.classList.toggle("_active");
			slideMenu.classList.toggle("_active");
		} else {
			slideMenu.classList.remove("_active");
		}
		body_lock(500);
		let activeList = document.querySelector(".slide-menu__list._active");
		if (activeList) {
			activeList.classList.remove("_active");
		}
	});
}

if (document.querySelector('.schedule-service__swiper')) {
	var sliderSchedule = new Swiper('.schedule-service__swiper', {
		spaceBetween: 40,
		slidesPerView: '1',
		watchOverflow: true,
		pagination: {
			el: '.schedule-service__pagination',
			type: "fraction",
		},
		navigation: {
			nextEl: ".schedule-service__next",
			prevEl: ".schedule-service__prev",
		},
		breakpoints: {
			320: {
				slidesPerView: '1',
			},
		}
	});
}

if (document.querySelector('.rates-service__swiper')) {
	var sliderPartners = new Swiper('.rates-service__swiper', {
		spaceBetween: 16,
		slidesPerView: '4',
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: '1.2',
				spaceBetween: 16,
			},
			600: {
				spaceBetween: 16,
				slidesPerView: '2.5',
			},
			992: {
				slidesPerView: '4',
				spaceBetween: 16,
			},
			1270: {
				slidesPerView: '4',
				spaceBetween: 16,
			},
		}
	});
}

if (document.querySelector('.team-about__swiper')) {
	var sliderPartners = new Swiper('.team-about__swiper', {
		spaceBetween: 8,
		slidesPerView: '4',
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: '1.5',
				spaceBetween: 8,
			},
			600: {
				spaceBetween: 8,
				slidesPerView: '2.5',
			},
			992: {
				slidesPerView: '4',
				spaceBetween: 8,
			},
			1270: {
				slidesPerView: '4',
				spaceBetween: 8,
			},
		}
	});
}

if (document.querySelector('.cases-service__swiper')) {
	var sliderPartners = new Swiper('.cases-service__swiper', {
		spaceBetween: 24,
		slidesPerView: '1.3',
		watchOverflow: true,
		pagination: {
			el: '.cases-service__pagination',
			type: "fraction",
		},
		navigation: {
			nextEl: ".cases-service__next",
			prevEl: ".cases-service__prev",
		},
		breakpoints: {
			320: {
				slidesPerView: '1.2',
			},
			992: {
				slidesPerView: '1.32',
			},
		}
	});
}

if (document.querySelector('.hero-about__swiper')) {
	var sliderAbout = new Swiper('.hero-about__swiper', {
		spaceBetween: 12,
		slidesPerView: 'auto',
		watchOverflow: true,
	});
}

// 	sliderHistory.on('slideChange', function (event) {
// 		let headLink = document.querySelector(".history-about__link[data-slide='" + sliderHistory.activeIndex + "']");
// 		if(headLink) {
// 			let prev = document.querySelector(".history-about__link._active");
// 			if(prev) {
// 				prev.classList.remove("_active");
// 			}
// 			headLink.classList.add("_active");
// 		}
// 	});

// 	// Переключение слайда по клику на год
// 	let historyLinks = document.querySelectorAll(".history-about__link");
// 	historyLinks.forEach(function(historyLink) {
// 		historyLink.addEventListener("click", function() {
// 			let dataSlide = historyLink.getAttribute("data-slide");

// 			let prev = document.querySelector(".history-about__link._active");
// 			if(prev) {
// 				prev.classList.remove("_active");
// 			}

// 			historyLink.classList.add("_active");
// 			sliderHistory.slideTo(dataSlide);
// 		});
// 	});
// }

// Слайдер для товара, на странице single-product.html
if (document.querySelector('.history-about__swiper')) {
	var subsliderHistory = new Swiper('.nav-history__swiper', {
		spaceBetween: 0,
		slidesPerView: '3',
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: '1.5',
			},
			600: {
				slidesPerView: '2.5',
			},
			992: {
				slidesPerView: '4',
			},
		}
	});
	var sliderHistory = new Swiper('.history-about__swiper', {
		spaceBetween: 12,
		slidesPerView: '1',
		watchOverflow: true,
		thumbs: {
			swiper: subsliderHistory,
		},
	});
	sliderHistory.on('slideChange', function (event) {
		let headLink = document.querySelector(".nav-history__slide");
		if (headLink) {
			let prev = document.querySelector(".history-about__link._active");
			if (prev) {
				prev.classList.remove("_active");
			}
			headLink.classList.add("_active");
		}
	});
}

// Слайдер для раздела "Что мы предлагаем"
// if (document.querySelector('.services-offer__slider')) {
// 	var servicesOfferSlider = new Swiper('.services-offer__slider', {
// 		direction: 'horizontal',
// 		loop: false,
// 		speed: 400,
// 		spaceBetween: 20,
// 		slidesPerView: 'auto',
// 		freeMode: true,

// 		// Настройки для мобильных
// 		breakpoints: {
// 			// Мобилки (до 768px)
// 			320: {
// 				slidesPerView: 1.1,
// 				spaceBetween: 15,
// 			},
// 			// Планшеты (768px и выше)
// 			768: {
// 				slidesPerView: 'auto',
// 				spaceBetween: 20,
// 			}
// 		}
// 	});
// }
// Слайдер для раздела "Что мы предлагаем" - как в отзывах
// Вариант как в отзывах
// Вариант как в отзывах
if (document.querySelector('.services-offer__slider')) {
	var servicesOfferSlider = new Swiper('.services-offer__slider', {
		spaceBetween: 20,
		slidesPerView: 'auto',
		watchOverflow: true,

		// ВАЖНО: добавляем отступ слева
		slidesOffsetBefore: 0, // На десктопе без отступа

		breakpoints: {
			// Мобилки
			320: {
				slidesPerView: 1.18,
				spaceBetween: 20,
				draggable: true,
				// На мобилках добавляем отступ 2rem
				slidesOffsetBefore: 6 // Примерно 2rem (32px)
			},
			// Планшеты
			600: {
				slidesPerView: 1.8,
				spaceBetween: 20,
				draggable: true,
				slidesOffsetBefore: 0
			},
			// Десктоп
			768: {
				slidesPerView: 'auto',
				spaceBetween: 20,
				draggable: false,
				slidesOffsetBefore: 0
			}
		},

		direction: 'horizontal',
		loop: false,
		speed: 400,

		draggable: true,
		resistance: true,
		resistanceRatio: 0.5,
		momentum: true,
		momentumBounce: true,
		momentumBounceRatio: 0.3
	});
}