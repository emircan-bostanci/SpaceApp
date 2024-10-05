
import * as THREE from 'three';
import CustomCamera from "./CustomCamera";

class Scene{

    sizeW =null 
    sizeH =null 

    #scene = null;
    camera = null;
    #renderer = null;
    components = [];
    


    

    constructor(sizeW,sizeH){
        this.sizeW = sizeW;
        this.sizeH = sizeH;

        this.#scene = new THREE.Scene();
        this.camera = new CustomCamera(sizeW,sizeH);
        this.#renderer= new THREE.WebGLRenderer();
        this.#initialize();

    }
    #initialize(){
        this.#renderer.setSize(this.sizeW,this.sizeH);
        document.body.appendChild(this.#renderer.domElement);

        
    }
    addComponent(component){
        this.components.push(component);
        this.#scene.add(component.mesh)
    }
    render(func){

        this.#renderer.setAnimationLoop(()=> {
            this.#renderer.render(this.#scene,this.camera.camera);
            func();
        });
    }
    x = 0;
    update(func){
        setInterval(()=>{
            func(this.x);
            this.x++;
        },10)
    }
    
   }
export default Scene;