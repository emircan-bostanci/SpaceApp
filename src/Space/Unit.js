import * as THREE from 'three';
import { color } from 'three/webgpu';

export default class Unit{
    weight = 0;
    speed = 0;

    posX = 0;
    posY = 0;

    name = "";
    radius = 0;

    dirX = 0;
    dirY = 0;

    mesh = null;
    //TODO : Generate Mesh 

    constructor(name,ooluor, weight, speed, radius,dirX,dirY,posX,posY) {
        this.name = name;
        this.weight = weight;

        this.speed = speed;
        this.radius = radius;

        this.dirX = dirX;
        this.dirY = dirY;

        this.posX = posX;
        this.posY = posY;

        const circleGeometry = new THREE.CircleGeometry(radius,32);
        var circleMaterial = new THREE.MeshBasicMaterial({color:ooluor});
        if(name === "Earth"){
            circleMaterial = new THREE.MeshBasicMaterial({color:`rgb(100,149,237)`});
            
        }
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    
        circle.position.x = posX;
        circle.position.y = posY;

        this.mesh = circle;

        
    }
    

   
}