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

  const secondsPerRevolution = 120;
  const maxSpinZoom = 5;
  const slowSpinZoom = 3;

  let userInteracting = false;
  let spinEnabled = true;

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
  