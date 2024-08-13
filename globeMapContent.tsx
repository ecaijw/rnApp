export const htmlContentForMapBoxInWebView = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Create a rotating globe</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.js"></script>
<style>
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
#btn-spin {
    font:
        bold 12px/20px 'Helvetica Neue',
        Arial,
        Helvetica,
        sans-serif;
    background-color: #3386c0;
    color: #fff;
    position: absolute;
    top: 20px;
    left: 50%;
    z-index: 1;
    border: none;
    width: 200px;
    margin-left: -100px;
    display: block;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 3px;
}
#btn-spin:hover {
    background-color: #4ea0da;
}
</style>
</head>
<body>
<div id="map"></div>
<button id="btn-spin">Pause rotation</button>
<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWNhaWp3IiwiYSI6ImNsemoyeng1MTBtOGgyam9idmM5eXhwOXMifQ._03CaeKfpwuM0YWHpXndLg';
  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      zoom: 1.5,
      center: [-90, 40]
  });

    map.on('style.load', () => {
        map.setFog({});
    });
    
  // Create a DOM element for the marker
  const markerEl = document.createElement('div');
  markerEl.className = 'marker';
  markerEl.innerHTML = 'BZAI';

  // Add marker to the map at the specified coordinates
  new mapboxgl.Marker(markerEl)
      .setLngLat([145.18759999427772, -37.83203894259072])
      .addTo(map);

  const secondsPerRevolution = 120;
  const maxSpinZoom = 5;
  const slowSpinZoom = 3;

  let userInteracting = false;
  let spinEnabled = true;

    function flyToCoordinate() {
        lng = 145.18759999427772;
        lat = -37.83203894259072;
        flyTo(lng, lat);
        // document.getElementById('btn-spin').innerText = "set by rn";
        window.ReactNativeWebView.postMessage("flyToCoordinate(): called by RN");
    }

    function showText() {
        document.getElementById("demo").style.display = "block";
        window.webkit.messageHandlers.jsHandler.postMessage("trigger from JS");
    }

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
              const zoomDif =
                  (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
              distancePerSecond *= zoomDif;
          }
          const center = map.getCenter();
          center.lng -= distancePerSecond;
          map.easeTo({ center, duration: 100, easing: (n) => n });
      }
  }

  function flyTo( lng, lat ) {
     console.log("addEventListener() in html");

      map.flyTo({
          center: [lng, lat],
          zoom: 10,
          speed: 3.0
      });

      
      // Trigger the spinGlobe function after the flyTo animation completes
      map.once('moveend', () => {
        console.log("FlyTo completed, moveend calling spinGlobe()"); // Log to ensure this code runs
          spinGlobe();
      });

    // Use setTimeout to ensure spinGlobe is called after flyTo completes
    setTimeout(() => {
        console.log("FlyTo completed, setTimeout() calling spinGlobe()"); // Log to ensure this code runs
        // spinGlobe();
    }, 1200); // Adjust the delay based on the expected duration of flyTo
  };

  // Listen for messages from React Native WebView
  document.addEventListener('message', function(event) {
      // ios app can not reach here. not know why
        window.ReactNativeWebView.postMessage("after document.addEventListener(), event called by RN");
       const { lng, lat } = JSON.parse(event.data);
        flyTo(lng, lat);
    });

  // Convert mouse events to touch events for mobile compatibility
  map.on('touchstart', () => {
      userInteracting = true;
  });

  map.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
  });

  map.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
  });
  map.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
  });
  map.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
  });

  map.on('moveend', () => {
      spinGlobe();
  });

  document.getElementById('btn-spin').addEventListener('click', (e) => {
      spinEnabled = !spinEnabled;
      if (spinEnabled) {
          spinGlobe();
          e.target.innerHTML = 'Pause rotation';
      } else {
          map.stop();
          e.target.innerHTML = 'Start rotation';
      }
  });

  spinGlobe();
</script>
</body>
</html>
`;
