import * as THREE from 'three';
import Scene from "./src/Scene"
import Unit from "./src/Space/Unit";
import {InfoCard} from "./src/Components/Card";
import Globals from "./src/Globals";
import KeplerianOrbit from './src/KeplerianOrbit';
import RequestManager from './src/DataManager/RequestManager';


//data : https://nssdc.gsfc.nasa.gov/planetary/factsheet/
//data : https://ssd.jpl.nasa.gov/tools/sbdb_query.html
//data : https://data.nasa.gov/resource/b67r-rgxc.json

const urlSearchParams = new URLSearchParams(window.location.search);
const cameraDir= {
    x:0,
    y:0,
    z:0
} 

const cameraSpeed = 5;

document.getElementById('how-to-use').addEventListener('click', function(){
    alert('For move camera, use arrow buttons. Camera move on z index with j and h keys.\n For focusing space object click planets on sidebar.\n If you want add new space object,use bottom left element')
})

const scene = new Scene(window.innerWidth, window.innerHeight);

const infoCard = new InfoCard();
var addElements = []

// Create the scene

// Add Sun at the center with scaled mass
const sun = new Unit("Sun", 0xffff5E,1.989E6, 0, 50, 0, 0, 0, 0);
scene.addComponent(sun);




const lockOnPosiion = {
    x:0,
    y:0,
    lockOn:false
};

console.log(urlSearchParams.get("planetId"))
if(urlSearchParams.get('planetId') != null){
    lockOnPosiion.lockOn = true;

}

// TODO : y yönündeki yorungesel ivme yanlis 
//Nasa Api 

const planetData = [ 
    { name: "Mercury", mass: 0.33, distance: 57.9, radius: 3 },
    { name: "Venus", mass: 4.87, distance: 108.2, radius: 8 },
    { name: "Earth", mass: 5.97, distance: 149.6, radius: 6},
    { name: "Earth", mass: 5.97, distance: 149.6, radius: 6 },
    { name: "Mars", mass: 6.42, distance: 228.0, radius: 3 },
    { name: "Jupiter", mass: 1898, distance: 778.5, radius: 13},
    { name: "Saturn", mass: 568, distance: 1432, radius: 13},
    { name: "Uranus", mass: 86.8, distance: 2867, radius: 13},
    { name: "Neptune", mass: 102, distance: 4515, radius: 13},
    { name: "Pluto", mass: 0.0130, distance: 5906.4, radius: 13},
];




const asteroidData = await RequestManager.GetData('https://data.nasa.gov/resource/b67r-rgxc.json');
asteroidData.forEach(asteroid=>{
    const asteroidName = asteroid.object_name;
    const distanceFromSun =asteroid.q_au_2 * 149597871 * Math.pow(10,-6); 
    const yDir = Math.sqrt(Globals.G * 1.989E6 / distanceFromSun)

    const newAsteroid = new Unit(asteroidName,0xFF0FF0FF,250,0,2,0,yDir,distanceFromSun,0); 
    scene.addComponent(newAsteroid)
    document.getElementsByClassName('planet-card-body')[0].innerHTML += `<a href="?planetId=${scene.components.length-1}" class="asteroid-card-item" style='margin:10px'>${newAsteroid.name}</span>`;

})



planetData.forEach(element => {
    const yDir = Math.sqrt(Globals.G * 1.989E6  /  element.distance );

    const planet = new Unit(element.name,0xFFFFFF,element.mass,0,element.radius,0,yDir,element.distance,0);

    scene.addComponent(planet);
    document.getElementsByClassName('planet-card-body')[0].innerHTML += `<a href="?planetId=${scene.components.length-1}" class="asteroid-card-item" style='margin:10px'>${planet.name}</span>`;
});

if(lockOnPosiion.lockOn === true){
        var selectedPlanet = scene.components[Number(urlSearchParams.get('planetId'))]
        infoCard.header = selectedPlanet.name
        infoCard.informations =[]
        infoCard.informations.push( `<div> Position X:  ${selectedPlanet.posX * 10^6} </div>`)
        infoCard.informations.push( `<div> Position Y:  ${selectedPlanet.posX * 10^6} </div>`)
        infoCard.informations.push( `<div> Velocity X:  ${selectedPlanet.dirX * 10^6} </div>`)
        infoCard.informations.push( `<div> Velocity Y:  ${selectedPlanet.dirY * 10^6} </div>`)
 
        infoCard.draw();
    }





scene.render(function(){

    if(lockOnPosiion.lockOn === true){
        infoCard.updateCardPosition(scene.camera.camera,scene.components[Number(urlSearchParams.get('planetId'))].mesh)
        scene.camera.camera.position.x = lockOnPosiion.x;
        scene.camera.camera.position.y = lockOnPosiion.y;
    }
    scene.camera.camera.position.x += cameraDir.x * cameraSpeed
    scene.camera.camera.position.y += cameraDir.y * cameraSpeed
    cameraDir.x = 0;
    cameraDir.y = 0;

});
var years = 0
scene.update(function() {

    
    for(var i = 0; i < scene.components.length; i++){
        for(var j = 0; j < scene.components.length ;j++){
            if(i == j) continue;

            
            const pos_1 = new THREE.Vector2(scene.components[i].mesh.position.x, scene.components[i].mesh.position.y)
            const pos_2 = new THREE.Vector2(scene.components[j].mesh.position.x, scene.components[j].mesh.position.y)
            const m1= scene.components[i].weight;
            const m2= scene.components[j].weight;

            const sqrDist = new THREE.Vector2().subVectors(pos_2,pos_1).lengthSq();
            if(sqrDist > 0.1){

                const fDir = new THREE.Vector2().subVectors(pos_2,pos_1).normalize();

                const f = fDir.multiplyScalar(Globals.G).multiplyScalar(m1).multiplyScalar(m2).divideScalar(sqrDist);
                const accel = f.divideScalar(m1); 


                scene.components[i].dirX += accel.x * Globals.TIME_STEP;
                scene.components[i].dirY += accel.y  * Globals.TIME_STEP;




            }

        }
        years += 1;
        console.log(document.getElementsByClassName('asteroid-card-item')[0].innerHTML);

        //console.log(scene.components[i].mesh.position.x);
        scene.components[i].mesh.position.x += scene.components[i].dirX * Globals.TIME_STEP;
        scene.components[i].mesh.position.y += scene.components[i].dirY * Globals.TIME_STEP;
        if(addElements.length > 0){
            addElements.forEach(element=>{
                            addObject(element.name, element.mass, element.radius, element.posX, element.posY, element.dirX, element.dirY)
                            console.log(element.posX)
                            console.log(element.posY)
                            console.log(element.dirX)
                            console.log(element.dirY)
                        })
                        addElements = [];
        }
        lockOnPosiion.x = scene.components[Number(urlSearchParams.get('planetId'))].mesh.position.x;
        lockOnPosiion.y = scene.components[Number(urlSearchParams.get('planetId'))].mesh.position.y;

         
    }
});
document.getElementsByName("fun-add")[0].addEventListener('click', function(){
    const name = document.getElementsByName('fun-name')[0].value;
    const mass = Number(document.getElementsByName('mass')[0].value);
    const radius= Number(document.getElementsByName('radius')[0].value);
    const posX = Number(document.getElementsByName('xPos')[0].value);
    const posY = Number(document.getElementsByName('yPos')[0].value);
    const dirX = Number(document.getElementsByName('dirX')[0].value);
    const dirY = Number(document.getElementsByName('dirY')[0].value);
    console.log("clicked ");
    addElements.push({name:name, mass:mass,radius:radius, posX:posX, posY:posY, dirX:dirX, dirY:dirY});

})

function addObject(name,mass,radius,posX,posY,dirX,dirY) {
    const planet = new Unit(name,0xFFFFFF,mass,0,radius,dirX,dirY,posX,posY); 
    scene.addComponent(planet)
    const index =scene.components.length - 1; 
    document.getElementsByClassName('planet-card-body')[0].innerHTML += `<a class="asteroid-card-item" style='margin:10px'>${planet.name}</span>`;
    const item = document.getElementsByClassName('asteroid-card-item'); 
    item[item.length -1].addEventListener('click',function(){
        alert('aaaa')

    })

}

document.addEventListener('keydown', function(event){
    if(event.key === "ArrowRight")
    {
        cameraDir.x += 1;
    }
    if(event.key === "ArrowLeft")
    {
        cameraDir.x -= 1;
    }
    if(event.key === "ArrowUp"){
        cameraDir.y += 1;
    }
    if(event.key === "ArrowDown"){
        cameraDir.y -= 1;
    }

})



