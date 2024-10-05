import * as THREE from 'three';

class CustomCamera{

    
    width = 0;
    height = 0;
    camera = null;
    /**
     *
     */
    constructor(width,height) {
        this.width = width;
        this.height = height;
        this.#initialize();
        
    }
    #initialize ()
    {
        this.camera = new THREE.PerspectiveCamera(75,this.width / this.height,0.1, 517453587135945 * 150);
        this.camera.position.z = 2500;
        
    }
}

export default CustomCamera;