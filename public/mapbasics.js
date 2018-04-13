ymaps.ready(init);

function init() {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var myPlacemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9,
      controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
      });

  myMap.events.add('click', function (e) {
    var coords = e.get('coords');
    arr = coords;

    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);

      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });

  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: true
      });
  }

  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({
          iconCaption: [
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', ')
        });

      let latval, lonval;

      [latval, lonval] = String(coords).split(',');
      $('#lat').val(latval);
      $('#lon').val(lonval);
    });
  }
}

