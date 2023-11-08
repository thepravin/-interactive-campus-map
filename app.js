const map = L.map('map').setView([17.309719670525634, 74.18726051122678], 90);

const titleUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

//const attribution =

const tiles = L.tileLayer(titleUrl, {});
tiles.addTo(map);

const icon = L.icon({
    iconUrl : '/images/parking.png',
    iconSize :[50,60],

})


// function generateList() {
//     const ul = document.querySelector(".list");
//     placeList.forEach((place) => {
//         const li = document.createElement("li");
//         const div = document.createElement("div");
//         const a = document.createElement("a");
//         const p = document.createElement("p");
//         a.addEventListener('click', () => {
//             flyToPlace(place);
//         })

//         div.classList.add("place-style");
//         a.innerText = place.properties.name;
//         a.href = "#";
//        p.innerText = place.properties.address;
      

//         div.appendChild(a);      
//        div.appendChild(p);
//         li.appendChild(div);
//         ul.appendChild(li);
//     });
// }
// generateList();

function generateList() {
    const ul = document.querySelector(".list");
    placeList.forEach((place) => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const a = document.createElement("a");
        const p = document.createElement("p");
        a.addEventListener('click', () => {
            flyToPlace(place);
        });

        div.classList.add("place-style");
        a.innerText = place.properties.name;
        a.href = "#";

        const addressLabel = document.createElement("strong"); // Creating a 'strong' element for the label
        addressLabel.innerText = "Address: "; // Setting the text of the label

        p.appendChild(addressLabel); // Appending the label to the paragraph element
        p.innerHTML += place.properties.address; // Adding the address text after the label

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}
generateList();


// L.geoJSON(placeList).addTo(map);

function onEachFeature(feature, layer) {
    layer.bindPopup('Hellow');
}


L.geoJSON(placeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
}).addTo(map);


function makePopupContent(place) {
    return `
        <div>
            <h4>${place.properties.name}</h4>
            <img src="${place.properties.url}" alt="">
            <p> ${place.properties.info}</p>
            <button class="map-button" onclick="startNavigation(${place.geometry.coordinates[0]}, ${place.geometry.coordinates[1]})"> 🗺️ Open in Google Maps</button>
        </div>
    `;
}

function startNavigation(latitude, longitude) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const currentLat = position.coords.latitude;
            const currentLng = position.coords.longitude;
            window.open(`https://www.google.com/maps/dir/${currentLat},${currentLng}/${latitude},${longitude}`);
        }, function () {
            alert('Please enable location services.');
        });
    } else {
        alert('location is not supported by your browser.');
    }
}



function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature));
}

const eParkingLayer = L.marker([17.309744, 74.185992]);
eParkingLayer.bindPopup(' <h4>eParking</h4>', { closeButton: false, offset: L.point(0, -8) })
eParkingLayer.addTo(map);

const newLibrary = L.marker([17.308502, 74.185145]);
newLibrary.bindPopup(' <h2>New Library</h2>')
newLibrary.addTo(map);

const studentSection = L.marker([17.308917, 74.185579]);
studentSection.bindPopup(' <h2>studentSection</h2>')
studentSection.addTo(map);

const ground = L.marker([17.308997, 74.185491]);
ground.bindPopup(' <h2>ground</h2>')
ground.addTo(map);

const workshop = L.marker([17.309693, 74.185927]);
workshop.bindPopup(' <h2>Workshop</h2>')
workshop.addTo(map);

const pgHall = L.marker([17.309725289626144, 74.1861650633812]); 
pgHall.bindPopup(' <h2>pgHall</h2>')
pgHall.addTo(map);

const ciisCell = L.marker([17.309324, 74.186653]);
ciisCell.bindPopup(' <h2>ciisCell</h2>')
ciisCell.addTo(map);

const itDepartment = L.marker([17.309476, 74.186602]);
itDepartment.bindPopup(' <h2>itDepartment</h2>')
itDepartment.addTo(map);

const selfiPoint = L.marker([17.309630217334824, 74.18736498881911]);
selfiPoint.bindPopup(' <h2>My GCEK</h2>')
selfiPoint.addTo(map);

const cybertowers = L.marker([17.309618036362654, 74.18720869341084]);
cybertowers.bindPopup(' <h2>Cyber Tower</h2>')
cybertowers.addTo(map);


function flyToPlace(place) {

    map.flyTo([place.geometry.coordinates[0], place.geometry.coordinates[1]], 20, {
        duration: 3

    })

    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -8) })
            .setLatLng([place.geometry.coordinates[0], place.geometry.coordinates[1]])
            .setContent(makePopupContent(place))
            .openOn(map);

    }, 3000);


}

