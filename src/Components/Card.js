
import * as THREE from 'three';

class Card{
    posX = 0;
    posY = 0;
    header = "";
    enabled = false;
    
}

class InfoCard extends Card{
    content = [];
    card; 
    informations = []
    draw(){
        this.card = document.createElement("div");
        this.card.style.position = "absolute";
        this.card.style.width = '250px';
        this.card.style.height = '150px';
        this.card.style.overflowY = "scroll";
        this.card.style.padding = "5px";
        this.card.style.background = 'rgba(255, 255, 255,0.75)'
        this.card.innerHTML = `<strong style="color:black"> ${this.header} </strong>`
        this.informations.forEach(x=>{
            this.card.innerHTML += `<div>${x}</div>`
        });
        document.body.appendChild(this.card);
    }
    updateCardPosition(camera,planet){
        const planetPosition = new THREE.Vector3();
        planet.getWorldPosition(planetPosition);  

        camera.updateMatrixWorld();  
        camera.updateProjectionMatrix();

        const screenPosition = planetPosition.project(camera);

        const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

        this.card.style.left = `${x}px`;
        this.card.style.top = `${y}px`; 
    }


    
}

export {
    InfoCard
}