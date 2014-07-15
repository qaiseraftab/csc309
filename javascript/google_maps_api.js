var geocoder;
var map;
var marker;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(0, 160);
  var mapOptions = {
	zoom: 0,
	center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function clearCity () {
	document.getElementById('city').value = "";
	document.getElementById('location').value = "";
}

function codeAddress() {
  var country = document.getElementById('country').value;
  if (!country) { country = "canada"; }
  var city = document.getElementById('city').value;
  if (!city) { city = ""; }
  var location = document.getElementById('location').value;
  if (!location) { location = ""; }
  var province = document.getElementById('province').value;
  if (!province) { province = ""; }
  
  var address = country + " " + province + " " + city + " " + location;
  address = address.trim();
  geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	  map.setCenter(results[0].geometry.location);
	  if (city != "") {
		map.setZoom(10);
	  } else {
		map.setZoom(2);
	  }
	  if (location != "") {
		map.setZoom(15);
	  } 
	  if (marker) {
		marker.setPosition(results[0].geometry.location);
	  } else {
		marker = new google.maps.Marker({
				 map: map,
				 position: results[0].geometry.location
	  });
	  }
	} else {
	  alert('Could not locate your address, please verify the given address');
	}
  });
}

google.maps.event.addDomListener(window, 'load', initialize);