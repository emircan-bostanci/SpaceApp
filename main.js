import * as THREE from 'three';
import Scene from "./src/Scene"
import Unit from "./src/Space/Unit";
import {InfoCard} from "./src/Components/Card";
import Globals from "./src/Globals";


//data : https://nssdc.gsfc.nasa.gov/planetary/factsheet/


const scene = new Scene(window.innerWidth, window.innerHeight);

const infoCard = new InfoCard();

// Create the scene

// Add Sun at the center with scaled mass
const sun = new Unit("Sun", 0xffff5E,1.989E6, 0, 50, 0, 0, 0, 0);
scene.addComponent(sun);

infoCard.header = "Earth";
infoCard.draw();

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

planetData.forEach(element => {
    const yDir = Math.sqrt(Globals.G * 1.989E6  /  element.distance );

    const planet = new Unit(element.name,0xFFFFFF,element.mass,0,element.radius,0,yDir,element.distance,0);
    scene.addComponent(planet);
});







scene.render(function(){
    infoCard.updateCardPosition(scene.camera.camera,scene.components[3].mesh)
});
scene.update(function() {
    for(var i = 0; i < scene.components.length; i++){
        scene.components[0].mesh.position.x = 0;
        scene.components[0].mesh.position.y = 0;
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

        //console.log(scene.components[i].mesh.position.x);
        scene.components[i].mesh.position.x += scene.components[i].dirX * Globals.TIME_STEP;
        scene.components[i].mesh.position.y += scene.components[i].dirY * Globals.TIME_STEP;

         
    }
});

function addObject() {
    const type = 31;
    alert("aksldjfkl");
    if(type === 'asteroid'){

    }
    else if(type === 'planet')
    {

    }
    scene.addComponent()
}



