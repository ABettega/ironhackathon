const mapInit = () => {
  const saoPaulo = { lat: -23.5617375, lng: -46.6601331 };

  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ],
    { name: 'Styled Map' });

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 15,
      center: saoPaulo,
      disableDefaultUI: true,
      zoomControl: true,
    }
  );

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const newMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  const getPlaces = () => {
    axios.get("/places")
      .then(response => {
        placePlaces(response.data.stores);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const placePlaces = stores => {
    stores.forEach(store => {
      const center = {
        lat: store.latitude,
        lng: store.longitude
      };

      let contentString = '<div id="content">' +
        
        '</div>' +
        `<h1 id="firstHeading" class="firstHeading">Loja ${store.street}</h1>` +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, ' +
        'sandstone rock ' +
        
        '</div>';

      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: store.street,
        animation: google.maps.Animation.DROP
      });
      

      pin.addListener('mouseover', function () {
        infowindow.open(map, pin);
      });

      pin.addListener('mouseout', function () {
        infowindow.close(map, pin);
      });

    })
      .catch((error) => console.log(error))
    const list = document.getElementById('list')
    list.innerHTML += `<li><a href='/event/${event._id}'>${event.name}</a></li>`
  }
  getPlaces()
}

mapInit()



