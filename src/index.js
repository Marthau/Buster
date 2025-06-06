import './styles/index.css';


const priceTabs = document.querySelectorAll('.price__zones-list-item');
const priceContents = document.querySelectorAll('.price__card-container');
const hardwareTabs = document.querySelectorAll('.hardware__zones-list-item');
const hardwareContents = document.querySelectorAll('.hardware__card-container');

const burgerMenuBtn = document.querySelector('.header__burger-btn');

const headerLinks = document.querySelectorAll('.header__link');
const sideMenuLinks = document.querySelectorAll('.map__menu-item');
const maps = document.querySelectorAll('.map');
const mapExit = document.querySelectorAll('.map__exit');

burgerMenuBtn.addEventListener('click', () => {
  hideMaps(4);

  maps[4].classList.toggle('map_visible');
});

headerLinks.forEach((link, i) => {
  link.addEventListener('click', () => {
    if (
      !link.classList.contains('header__link_inactive') 
      && !link.classList.contains('header__link_active')
      && !link.classList.contains('header__button')
    ) {
      headerLinks.forEach(link => link.classList.remove('header__link_active'));

      hideMaps(i);

      link.classList.add('header__link_active');

      maps[i].classList.toggle('map_visible');
    }
    
  })
});

sideMenuLinks.forEach((link, i) => {
  const numberToMapId = i % 4;
  link.addEventListener('click', () => {
    if (!headerLinks[numberToMapId].classList.contains('header__link_active')) {
      headerLinks.forEach(link => link.classList.remove('header__link_active'));

      headerLinks[numberToMapId].classList.add('header__link_active');

      hideMaps(numberToMapId);

      maps[numberToMapId].classList.toggle('map_visible');
    }
  })
});

mapExit.forEach(button => {
  button.addEventListener('click', () => {
    headerLinks.forEach(link => link.classList.remove('header__link_active'));

    hideMaps();
  });
})

priceTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    priceTabs.forEach((tab) => {
      tab.classList.remove('price__zones-list-item_active');
    })

    priceContents.forEach(content => {
      content.classList.remove('display-flex');
    });

    tab.classList.toggle('price__zones-list-item_active');
    priceContents[index].classList.add('display-flex');
  })
});

hardwareTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    hardwareTabs.forEach((tab) => {
      tab.classList.remove('hardware__zones-list-item_active');
    })

    hardwareContents.forEach(content => {
      content.classList.remove('display-flex');
    });

    tab.classList.toggle('hardware__zones-list-item_active');
    hardwareContents[index].classList.add('display-flex');
  })
});

function hideMaps(activeMap) {
  document.querySelectorAll('.map_visible').forEach(map => {
    if (map !== maps[activeMap]) map.classList.remove('map_visible')
  })
}


const ALEKSEEVSKAYA = {
    coordinates: [37.635422, 55.807602],
    iconSrc: '.shit-pin',
    title: 'Rave by Buster<br>Алексеевская',
    address: 'Москва, просп. Мира, 95',
    phone: '<a class="map__item-reservation" target="_blank" rel="noopener" href="https://clck.ru/39iFYb"><span>Забронировать</span><svg width="252" height="55" viewBox="0 0 252 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.05025 7.97221C0.7375 9.28496 0 11.0654 0 12.922V48C0 51.866 3.13401 55 7 55H233.101C234.957 55 236.738 54.2625 238.05 52.9497L249.95 41.0503C251.263 39.7375 252 37.957 252 36.1005V7C252 3.13401 248.866 0 245 0H12.922C11.0654 0 9.28496 0.737498 7.97221 2.05025L2.05025 7.97221Z" fill="white"/></svg></a>',
};

const POKROVKA = {
    coordinates: [37.647181, 55.759714],
    iconSrc: '.shit-pin',
    title: 'Rave by Buster<br>Покровка',
    address: 'Москва, ул. Покровка, 21-23/25С1',
    phone: '<a class="map__menu-tel" href="tel:+79933401903">+7 (993) 340-19-03</a>'
};

const AVIAMOTORNAYA = {
    coordinates: [37.716521, 55.753458],
    iconSrc: '.neshit-pin',
    title: 'Rave by Buster<br>Авиамоторная',
    address: 'Москва, Ул. Авиамоторная, д.41б',
    phone: 'Скоро открытие',
};

const DEPOLESNAYA = {
    coordinates: [37.592132, 55.780522],
    iconSrc: '.neshit-pin',
    title: 'Rave by Buster<br>Депо-Лесная',
    address: 'Москва, Лесная улица, 20с1',
    phone: 'Скоро открытие',
};

const mapProps = [
  {
    markerProps: [ALEKSEEVSKAYA],
    location: {
        center: [37.635231, 55.807966],
        zoom: 18
    }
  },
  {
    markerProps: [POKROVKA],
    location: {
        center: [37.647181, 55.759714],
        zoom: 17.5
    },
  },
  {
    markerProps: [AVIAMOTORNAYA],
    location: {
        center: [37.716521, 55.753458],
        zoom: 18
    },
  },
  {
    markerProps: [DEPOLESNAYA],
    location: {
        center: [37.592132, 55.780522],
        zoom: 18
    }
  },
  {
    markerProps: [ALEKSEEVSKAYA, POKROVKA, AVIAMOTORNAYA, DEPOLESNAYA].map(elem => ({...elem, clickable: true})),
    location: {
        center: [37.665578, 55.781191],
        zoom: 10.5
    }
  },
]

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

    mapProps.forEach(({markerProps,location}, i) => {
      const mapElement = document.querySelectorAll('.map__container')[i];

      const map = new YMap(
          mapElement,
          {
              location,
          },
          [
          new YMapDefaultFeaturesLayer({})
        ]
      );

      const layer =  new YMapDefaultSchemeLayer({
        customization: [
          {
            "tags": {
              "any": [
                "road"
              ]
            },
            "elements": "geometry",
            "stylers": [
              {
                "color": "#4E4E4E"
              }
            ]
          },
          {
            "tags": {
              "any": [
                "water"
              ]
            },
            "elements": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "tags": {
              "any": [
                "landscape",
                "admin",
                "land",
                "transit"
              ]
            },
            "elements": "geometry",
            "stylers": [
              {
                "color": "#212121",
                "opacity": 0.7
              }
            ]
          },
          {
            "tags": {
              "any": [
                "building"
              ]
            },
            "elements": "geometry",
            "stylers": [
              {
                "color": "#757474",
                "opacity": 0.4
              }
            ]
          }
        ]
      });

      markerProps.forEach((markerProp, i) => {
        const markerContainer = document.createElement('div');

        const markerElement = document.createElement('img');
        markerElement.className = 'icon-marker';
        // markerElement.src = markerProp.iconSrc;
        markerElement.src = document.querySelector(markerProp.iconSrc).src;


        const mapPin = document.createElement('div');
        mapPin.classList.add('map__pin');

        if (markerProp.iconSrc === '.neshit-pin') {
           mapPin.classList.add('map__pin_disabled');
        }

        const titleElement = document.createElement('div');
        titleElement.innerHTML = markerProp.title;
        titleElement.classList.add('map__pin-title');
    
        const addressElement = document.createElement('div');
        addressElement.innerHTML = markerProp.address;
        addressElement.classList.add('map__pin-address');

        const phoneElement = document.createElement('div');
        phoneElement.innerHTML = markerProp.phone;
        phoneElement.classList.add('map__pin-phone');


        mapPin.appendChild(titleElement);
        mapPin.appendChild(addressElement);
        mapPin.appendChild(phoneElement);

        markerContainer.appendChild(markerElement);
        markerContainer.appendChild(mapPin);

        if (markerProp.clickable) { 
          markerElement.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('.map__pin_toggled')          
              .forEach(elem => {
                if (elem !== mapPin) elem.classList.remove('map__pin_toggled')
              });

            mapPin.classList.toggle('map__pin_toggled');

            map.update({
              location: {
                center: markerProp.coordinates,
                zoom: 15,
                duration: 200, // Анимация карты займет 200 миллисекунд.
                easing: 'ease-in-out' // Функция анимации изменения местоположения на карте.
              }
            });
          });
        }

        map.addChild(new YMapMarker({coordinates: markerProp.coordinates}, markerContainer));
      });

      map.addChild(layer);
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.map__pin_toggled')
        .forEach(elem => elem.classList.remove('map__pin_toggled'));
    });
}

initMap();
