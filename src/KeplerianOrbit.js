//Ref : https://ssd.jpl.nasa.gov/tools/sbdb_query.html

import { Vector2 } from "three";
import Globals from "./Globals";

class KeplerianOrbit{

    static initializeKeplerianOrbit(a,ec,orbitalPosition){
        const trueAnnomaly = Math.acos(ec * orbitalPosition / (Math.abs(ec) * Math.abs(orbitalPosition)));  

        console.log("True annomaly : " + trueAnnomaly);
        const r = (a * (1 - Math.pow(ec,2))) / (1 + ec * Math.cos(trueAnnomaly));

       return new Vector2(r * Math.cos(trueAnnomaly),r * Math.sin(trueAnnomaly));

        
    } 
    static initializeVelocity(a,ec,orbitalPosition,centerMass){
        const trueAnnomaly = Math.acos(ec * orbitalPosition / (Math.abs(ec) * Math.abs(orbitalPosition)));  

        const r = (a * (1 - Math.pow(ec,2))) / (1 + ec * Math.cos(trueAnnomaly));


        const v = Math.sqrt(Globals.G * centerMass * ((2 / r) - (1 / a)));

        return new Vector2(v * Math.sin(trueAnnomaly),v * Math.cos(trueAnnomaly));

    }
}
export default KeplerianOrbit;