const menuButtons = document.querySelectorAll('.menu-btn');
const menuContainers = document.querySelectorAll('.menu-container');

for (let i = 0; i < menuButtons.length; i++) {
   menuButtons[i].addEventListener('click', function () {
      const buttonClassnameSelected = menuButtons[i].classList[1];
      menuButtons[i].querySelector('div').style.color = '#ff7920';
      menuButtons[i].querySelector('img').setAttribute('src', `img/${buttonClassnameSelected}-selected.png`);
      menuButtons[i].querySelector('img').style.transform = 'scale(1.2)'
      menuContainers[i].classList.add('open');
      for (let j = 0; j < menuButtons.length; j++) {
         if (j != i) {
            const buttonClassnameNotSelected = menuButtons[j].classList[1];
            menuButtons[j].querySelector('div').style.color = '#12121f';
            menuButtons[j].querySelector('img').setAttribute('src', `img/${buttonClassnameNotSelected}.png`);
            menuButtons[j].querySelector('img').style.transform = 'scale(1)'
            menuContainers[j].classList.remove('open');
         }
      }
   })
}