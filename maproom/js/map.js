// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;

// path to csv data
let path = "data/fish.csv";


// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}


// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}


function mapCSV(data){
	
	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)
        .on('mouseover',function(){
			this.bindPopup(`${item.title}<br><img src="${item.thumbnail_url}">`).openPopup()
		})
		// add marker to featuregroup		
		markers.addLayer(marker)


      // add data to sidebar


 $(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([44.2510,-116.9693], 12)"> Weiser </div>`)
 $(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([40.0150,-105.2705], 12)"> Boulder </div>`)
 $(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([42.2808,-83.7430], 12 )"> Ann Arbor </div>`)
 $(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([52.9399,-106.4509], 12)"> Saskatchewan </div>`)
 $(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([44.4280,-110.5885], 12)"> Yellowstone </div>`)

	})


	

	

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

function panToImage(index){
	// zoom to level 17 first
	map.setZoom(17);
	// pan to the marker
	map.panTo(markers.getLayers()[index]._latlng);
}
