import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import Geolocation from 'ol/Geolocation.js';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import Feature from 'ol/Feature';
import type { ProjectionLike } from 'ol/proj';

export function useGeolocation(projection: ProjectionLike) {
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection,
    tracking: true,
  });

  // FEATURES
  const accuracyFeature = new Feature();
  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    }),
  );

  // EVENTS
  geolocation.on('error', function (error) {
    console.error(error);
  });
  geolocation.on('change:accuracyGeometry', function () {
    const accuracyGeometry = geolocation.getAccuracyGeometry();
    if (!accuracyGeometry) return;
    accuracyFeature.setGeometry(accuracyGeometry);
  });

  geolocation.on('change:position', function () {
    const coordinates = geolocation.getPosition();
    if (!coordinates) return;
    positionFeature.setGeometry(new Point(coordinates));
  });

  const layer = new VectorLayer({
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });
  return { geolocation, layer };
}
