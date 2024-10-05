
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
    draw(){
        this.card = document.createElement("div");
        this.card.style.position = "absolute";
        this.card.style.padding = "50px";
        this.card.style.background = 'rgba(255, 255, 255,0.75)'
        this.card.innerHTML = `<strong style="color:black"> ${this.header} </strong>`
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