var wms_layers = [];


var lyr_Satelite_0 = new ol.layer.Tile({
    'title': 'Satelite',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
    })
});

var format_KecamatanKabBandung_1 = new ol.format.GeoJSON();
var features_KecamatanKabBandung_1 = format_KecamatanKabBandung_1.readFeatures(json_KecamatanKabBandung_1, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_KecamatanKabBandung_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_KecamatanKabBandung_1.addFeatures(features_KecamatanKabBandung_1);
var lyr_KecamatanKabBandung_1 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_KecamatanKabBandung_1, 
    style: style_KecamatanKabBandung_1,
    popuplayertitle: 'Kecamatan Kab. Bandung',
    interactive: true,
    title: '<img src="styles/legend/KecamatanKabBandung_1.png" /> Kecamatan Kab. Bandung'
});

var format_KoperasiMerahPutih_2 = new ol.format.GeoJSON();
var features_KoperasiMerahPutih_2 = format_KoperasiMerahPutih_2.readFeatures(json_KoperasiMerahPutih_2, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_KoperasiMerahPutih_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_KoperasiMerahPutih_2.addFeatures(features_KoperasiMerahPutih_2);
var lyr_KoperasiMerahPutih_2 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_KoperasiMerahPutih_2, 
    style: style_KoperasiMerahPutih_2,
    popuplayertitle: 'Koperasi Merah Putih',
    interactive: true,
    title: '<img src="styles/legend/KoperasiMerahPutih_2.png" /> Koperasi Merah Putih'
});

lyr_Satelite_0.setVisible(true);
lyr_KecamatanKabBandung_1.setVisible(true);
lyr_KoperasiMerahPutih_2.setVisible(true);
var layersList = [lyr_Satelite_0, lyr_KecamatanKabBandung_1, lyr_KoperasiMerahPutih_2];

lyr_KecamatanKabBandung_1.set('fieldAliases', {'Kelurahan': 'Kelurahan', 'Kecamatan': 'Kecamatan', 'UPTD': 'UPTD', 'Total': 'Total', 'Penduduk': 'Penduduk'});
lyr_KoperasiMerahPutih_2.set('fieldAliases', {'No': 'No', 'Nama Koper': 'Nama Koper', 'Alamat': 'Alamat', 'Koordinat': 'Koordinat', 'Y': 'Y', 'X': 'X', 'Luas Lahan': 'Luas Lahan', 'images': 'images'});
lyr_KecamatanKabBandung_1.set('fieldImages', {'Kelurahan': 'TextEdit', 'Kecamatan': 'TextEdit', 'UPTD': 'TextEdit', 'Total': 'TextEdit', 'Penduduk': 'TextEdit'});
lyr_KoperasiMerahPutih_2.set('fieldImages', {'No': 'TextEdit', 'Nama Koper': 'TextEdit', 'Alamat': 'TextEdit', 'Koordinat': 'TextEdit', 'Y': 'TextEdit', 'X': 'TextEdit', 'Luas Lahan': 'TextEdit', 'images': ''});
lyr_KecamatanKabBandung_1.set('fieldLabels', {'Kelurahan': 'inline label - visible with data', 'Kecamatan': 'hidden field', 'UPTD': 'hidden field', 'Total': 'hidden field', 'Penduduk': 'hidden field'});
lyr_KoperasiMerahPutih_2.set('fieldLabels', {'No': 'hidden field', 'Nama Koper': 'inline label - visible with data', 'Alamat': 'inline label - visible with data', 'Koordinat': 'inline label - visible with data', 'Y': 'hidden field', 'X': 'hidden field', 'Luas Lahan': 'inline label - visible with data', 'images': 'inline label - visible with data'});
lyr_KoperasiMerahPutih_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});


// 🧩 Tambahkan overlay popup di sini
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250
    }
  }
});
map.addOverlay(overlay);

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


// 🎯 Event klik pada fitur peta
map.on('singleclick', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
    });

    if (feature && feature.get('Nama Koper')) {

        var nama = feature.get('Nama Koper');
        var alamat = feature.get('Alamat');
        var luas = feature.get('Luas Lahan');
        var foto = feature.get('images'); 

        var contentHtml = '<b>' + nama + '</b><br>' +
                          alamat + '<br>' +
                          'Luas Lahan: ' + luas + '<br>';

        // Jika ada kolom images → tampilkan gambar
        if (foto) {
            contentHtml += '<br><img src="images/' + foto + '" width="200px">';
        }

        content.innerHTML = contentHtml;
        overlay.setPosition(evt.coordinate);

    } else {
        overlay.setPosition(undefined);
    }
});
