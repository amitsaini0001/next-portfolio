import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VantaBackground({children}:any){
    const [vantaEffect, setVantaEffect] = useState<any>(0);
    const [mounted, setMounted] = useState(false);
    const {theme} = useTheme();

    const vantaRef = useRef(null);


    function vantaEffector(){
        setVantaEffect(
            //@ts-ignore
            VANTA.CLOUDS({
                THREE,
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: true,
                minHeight: 200.00,
                minWidth: 200.00,
                skyColor: theme==="dark" ? "#000000" : "#f3f6f4",
                cloudColor: theme==="dark" ? "#b1c4e1" : "#d3dceb",
                sunColor: '#f7971e',
                sunGlareColor: '#fc6330',
                sunlightColor: '#ff9d3c'
            })
        );
    }

    useEffect(() => {
        if (!vantaEffect) {
            vantaEffector();
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    useEffect(()=>{
        if (vantaEffect) vantaEffect.destroy();
        vantaEffector();
    }, [theme])

    useEffect(()=>{
        const timer = setTimeout(() => {
            setMounted(true);
          }, 3000);
          return()=> clearTimeout(timer)
    },[])


    return(
        <div className="w-full h-full" ref={vantaRef}>
            {(vantaEffect && mounted) ? children : <div className="flex w-full h-full items-center justify-center font-bold text-xl md:text-3xl animate-pulse">Getting Things Ready</div>}
        </div>
    )
}