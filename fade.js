import Highway from "@dogstudio/highway";
import Fade from "C:\Dust Collector/fade.js" ;
import { gsap } from "gsap"; 

const H = new Highway.Core({
    transitions: {
        default: Fade  
    }
});
