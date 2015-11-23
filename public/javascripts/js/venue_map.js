$(function() {
  var initializeMap;
  this.map = null;
  initializeMap = function() {
    var bounds, createMarker, i, latList, longList, mapOptions, markerCluster, markers, pos;
    pos = new google.maps.LatLng(34.824974, -40.687996);
    mapOptions = {
      zoom: 4,
      center: pos,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    latList = [];
    longList = [];
    $('input[type="hidden"][name="lat"]').map(function() {
      return latList.push($(this).val());
    });
    $('input[type="hidden"][name="lng"]').map(function() {
      return longList.push($(this).val());
    });

    markers = [];
    createMarker = function(i) {
      var marker, markerOps;
      markerOps = {
        position: new google.maps.LatLng(latList[i], longList[i]),
        map: this.map,
        animation: google.maps.Animation.DROP
      };
      marker = new google.maps.Marker(markerOps);
      return marker;
    };

    for (i in latList) {
      markers.push(createMarker(i));
    }
    if (markers.length > 0) {
      markerCluster = new MarkerClusterer(this.map, markers);
    }
    if (markers.length > 0) {
      bounds = new google.maps.LatLngBounds();
      markers.map(function(marker) {
        return bounds.extend(marker.position);
      });
    }
    if (markers.length > 0) {
      return this.map.fitBounds(bounds);
    }

  };
  return initializeMap();
});