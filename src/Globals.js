class Globals{
    //1 px = 1000 km
    static MASS_SCALE = 1e-25;  // Scaling down masses for simulation
    static G = 6.67430e-11; 
    static TIME_STEP = 60* 60  ;  // One day per step (in seconds)
}
export default Globals;