Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyBEYNaVigDVCFtycIO_YcjLUvXWEUOXduQ',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});