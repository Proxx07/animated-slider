document.addEventListener('DOMContentLoaded', function(){
	const	slider = document.querySelector('.slider'),
			sliderItems = slider.querySelectorAll('.slider__slide'),
			sliderBackgroundItems = slider.querySelectorAll('.slider__slide-inner'),
			totalSlides = sliderItems.length,
			lastSlide = totalSlides - 1,
			
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			
			wavyText = document.querySelector('.scroll-text');
			
	
	let 	sliderIndex = 0,
			isAnimating = 0,
			bgSizeX = 0,
			bgSizeY = 0,
			percentPositionX = 0,
			touchArray = [],
			percentPositionY = 0;
	
	let xTilt = 0,
		yTilt = 0;
		
	let incleAngleX = 0,
		incleAngleY = 0;
		
	// <Анимированный текст>
	let scrollText = 'Scroll';
	
	if (window.innerWidth < 1200) {
		scrollText = 'Swipe'
	}
	
	const scrollTextArray = scrollText.split('');
	
	for (let l = 0; l < scrollTextArray.length; l++) {
		let newSpan = document.createElement("span");
		
		newSpan.classList.add('letter')
		newSpan.innerText = scrollTextArray[l]
		newSpan.style.setProperty('--i', l+1)
		wavyText.appendChild(newSpan)
	}
	// </Анимированный текст>
	
	
	
	// <Индексы слайдов>
	for (let i = 0; i < sliderItems.length; i++) {
		sliderItems[i].dataset.index = i
	}
	// </Индексы слайдов>
	
	
	
	
	// <Инициализация слайдера при загрузке сайта>
	function sliderInit() {
		slider.style.setProperty('--x', `50%`)
		slider.style.setProperty('--y', `50%`)
		sliderItems[1].classList.add('next-slide')
		sliderItems[0].classList.add('active-slide')
		sliderItems[lastSlide].classList.add('prev-slide')
	}
	sliderInit()
	// </Инициализация слайдера при загрузке сайта>
	
	
	
	// <След. слайд>
	function slideNext (sliderIndex) {
		isAnimating = 1
		switch (sliderIndex) {
			case 0:
				
				sliderItems[sliderIndex+1].classList.remove('next-slide')
				sliderItems[sliderIndex+1].classList.add('active-slide')
				
				sliderItems[sliderIndex].classList.remove('active-slide')
				sliderItems[sliderIndex].classList.add('prev-slide')
				
				sliderItems[sliderIndex+2].classList.add('next-slide')
				sliderItems[lastSlide].classList.remove('prev-slide')
				
			break;
			
			case lastSlide-1: 
				
				sliderItems[sliderIndex+1].classList.remove('next-slide')
				sliderItems[sliderIndex+1].classList.add('active-slide')
				
				sliderItems[sliderIndex].classList.remove('active-slide')
				sliderItems[sliderIndex].classList.add('prev-slide')
				
				sliderItems[0].classList.add('next-slide')
				sliderItems[0].classList.remove('prev-slide')
				
				sliderItems[lastSlide-2].classList.remove('prev-slide')
				
			break;
			
			case lastSlide: 
				
				sliderItems[0].classList.remove('next-slide')
				sliderItems[0].classList.add('active-slide')
				
				sliderItems[sliderIndex].classList.remove('active-slide')
				sliderItems[sliderIndex].classList.add('prev-slide')
				
				sliderItems[sliderIndex-1].classList.remove('prev-slide')
				sliderItems[1].classList.add('next-slide')
				
			break;
			
			default: 
			
				sliderItems[sliderIndex+1].classList.remove('next-slide')
				sliderItems[sliderIndex+1].classList.add('active-slide')
				
				sliderItems[sliderIndex].classList.remove('active-slide')
				sliderItems[sliderIndex].classList.add('prev-slide')
				
				sliderItems[sliderIndex-1].classList.remove('prev-slide')
				sliderItems[sliderIndex+2].classList.add('next-slide')
				
			break;
		}
		setTimeout(function(){
			isAnimating = 0	
		}, 1400)
	}
	// </След. слайд>
	
	// <Пред. слайд>
	function slidePrev (sliderIndex) {
		isAnimating = 1
		
		switch (sliderIndex) {
			case 0:
				
				sliderItems[lastSlide].classList.add('active-slide')
				sliderItems[lastSlide].classList.remove('prev-slide')
				
				sliderItems[sliderIndex].classList.add('next-slide')
				sliderItems[sliderIndex].classList.remove('active-slide')
				
				sliderItems[lastSlide-1].classList.add('prev-slide')
				
				sliderItems[1].classList.remove('next-slide')
				
			break;
			
			case lastSlide :
				sliderItems[sliderIndex-1].classList.add('active-slide')
				sliderItems[sliderIndex-1].classList.remove('prev-slide')
				
				sliderItems[sliderIndex].classList.add('next-slide')
				sliderItems[sliderIndex].classList.remove('active-slide')
				
				sliderItems[0].classList.remove('next-slide')
				
				sliderItems[lastSlide-2].classList.add('prev-slide')
			break;
			
			case 1 : 
				
				sliderItems[0].classList.add('active-slide')
				sliderItems[0].classList.remove('prev-slide')
				
				sliderItems[lastSlide].classList.add('prev-slide')
				
				sliderItems[sliderIndex].classList.add('next-slide')
				sliderItems[sliderIndex].classList.remove('active-slide')
				
				sliderItems[sliderIndex+1].classList.remove('next-slide')
				
			break;
				
			default:
			
				sliderItems[sliderIndex-1].classList.add('active-slide')
				sliderItems[sliderIndex-1].classList.remove('prev-slide')
				
				sliderItems[sliderIndex-2].classList.add('prev-slide')
				
				sliderItems[sliderIndex].classList.add('next-slide')
				sliderItems[sliderIndex].classList.remove('active-slide')
				
				sliderItems[sliderIndex+1].classList.remove('next-slide')
			
			break;
		}
		
		setTimeout(function(){
			isAnimating = 0	
		}, 1400)
	}
	// </Пред. слайд>
	
	
	sliderItems.forEach(function(item){
		item.addEventListener('click', function(){
			if (item.classList.contains('next-slide')) {
				if (isAnimating != 1) {
					sliderIndex = +slider.querySelector('.active-slide').dataset.index
					slideNext(sliderIndex)
				}
			}
		})
	});
	
	// <Параллакс>
	sliderBackgroundItems.forEach(function(bgItem){
		bgItem.addEventListener('mousemove', function(target){
			if (isAnimating != 1) {
				
				bgSizeX = Math.round((target.clientX / windowWidth * 100) - 50)
				bgSizeY = Math.round((target.clientY / windowHeight * 100) - 50)
				
				bgSizeX = bgSizeX / 5;
				bgSizeY = bgSizeY / 5;
				
				
				slider.style.setProperty('--x', `${50+bgSizeX}%`)
				slider.style.setProperty('--y', `${50+bgSizeY}%`)
				
			}
		});
	});
	// </Параллакс>
	
	
	
	
	// <Слайд при прокрутке мыши>
	slider.addEventListener('wheel', function(wheel) {
		if (wheel.deltaY > 0) {
			if (isAnimating != 1) {
				isAnimating = 1
				sliderIndex = +slider.querySelector('.active-slide').dataset.index
				slideNext(sliderIndex)
			}
		} else {
			if (isAnimating != 1) {
				isAnimating = 1
				sliderIndex = +slider.querySelector('.active-slide').dataset.index
				slidePrev(sliderIndex)
			}
		}
	});
	// </Слайд при прокрутке мыши>
	
	
	
	
	// <Смена слайдов при свайпе> 
	slider.addEventListener('touchstart', function(touch) {
		touchArray.push(touch.targetTouches[0].clientX)
	});
	
	slider.addEventListener('touchmove', function(touch) {
		touchArray.push(touch.targetTouches[0].clientX)
	});
	
	slider.addEventListener('touchend', function(touch) {
		let swipeSide = touchArray[0] - touchArray[touchArray.length-1];
		
		if (swipeSide < -60) {
			swipeSide = "toRight"
		} else if (swipeSide > 60) {
			swipeSide = "toLeft"
		}
		
		switch (swipeSide) {
			case "toRight" :
				if (isAnimating != 1) {
					isAnimating = 1
					sliderIndex = +slider.querySelector('.active-slide').dataset.index
					slidePrev(sliderIndex)
				}
			break;
			
			case "toLeft" :
				if (isAnimating != 1) {
					isAnimating = 1
					sliderIndex = +slider.querySelector('.active-slide').dataset.index
					slideNext(sliderIndex)
				}
			break;
			
			default : 
				console.log('Nothing')
			break;
		}
		touchArray = []
	});
	// </Смена слайдов при свайпе> 
	
	
	function updateBackgroundGradient(event) {
		xTilt = event.gamma;
		
		if (xTilt < -50) {
			xTilt = -50
		} else if (xTilt > 50) {
			xTilt = 50
		}
		
		/*yTilt = event.beta;
		if (yTilt < -50) {
			yTilt = -50
		} else if (yTilt > 50) {
			yTilt = 50
		}*/
		
		incleAngleX = Math.round(xTilt / 5 + 50)
		//incleAngleY = Math.round(yTilt / 5 + 50)
		
		slider.style.setProperty('--x', `${incleAngleX}%`)
		//slider.style.setProperty('--y', `${incleAngleY}%`)
		
		
	};
	
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', updateBackgroundGradient);
	}
});