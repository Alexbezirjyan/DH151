let data = [
    {
    'title':'Weiser',
    'lat': 44.2510,
    'lon': -116.9693,
    'description':'Idaho; Sturgeon in Snake River'
    },
    {
    'title':'Boulder',
    'lat': 40.0150,
    'lon': -105.2705,
    'description':'Colorodo; Brown Trout in Boulder Creek'
    },
    {
    'title':'Ann Arbor',
    'lat': 42.2808,
    'lon': -83.7430,
    'description':'Michigan; Smallmouth in Local Ponds'
    },
    {
    'title':'Saskatchewan',
    'lat': 52.9399,
    'lon': -106.4509,
    'description':'Canada; Rainbow Trout in Firebag River'
    },
    {
    'title':'Yellowstone',
    'lat': 44.4280,
    'lon': -110.5885,
    'description':'Montana; Tiger Trout in Blacktail Creek'
    }
            ]
       
       var map = L.map('map').setView([44.2510,-116.9693], 1);

       var planeIcon = L.icon ({
        iconUrl:'marker.png',
        iconSize: [50, 50]
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    


    data.forEach(function (item,index) {
        var marker = L.marker([item.lat, item.lon], {
            title: item.title,
            icon: planeIcon
        })
            .addTo(map)
            .bindPopup("<b>"+ item.title + "</b><br>" + item.pic + '<br>' + item.description)
            .openPopup()
            .on('click', function (e) {
                map.setView(e.latlng, 14);
            });;
  
 // add data to sidebar
 $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)
  
  
  
  
        });

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

// loop through data
data.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon]).bindPopup(item.title)

	// add marker to featuregroup
	myMarkers.addLayer(marker)

	
})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers
}


// add layer control box
L.control.layers(null,layers).addTo(map)


// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

    // function to fly to a location by a given id number
function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)
}

// open the popup
myMarkers.getLayers()[index].openPopup()


