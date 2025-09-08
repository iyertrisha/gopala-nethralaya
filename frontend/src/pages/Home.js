import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import * as THREE from "three";
import cataractSurgeryPlaceholder from './cataract-surgery-placeholder.jpg';
import lasikPlaceholder from './lasik.jpg';
import iclPlaceholder from './icl-surgery.jpg';

gsap.registerPlugin(ScrollTrigger, SplitText);
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;


const fluidShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 iMouse;
  uniform int iFrame;
  uniform sampler2D iPreviousFrame;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uFluidDecay;
  uniform float uTrailLength;
  uniform float uStopDecay;
  varying vec2 vUv;
  
  vec2 ur, U;
  
  float ln(vec2 p, vec2 a, vec2 b) {
      return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.));
  }
  
  vec4 t(vec2 v, int a, int b) {
      return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur));
  }
  
  vec4 t(vec2 v) {
      return texture2D(iPreviousFrame, fract(v/ur));
  }
  
  float area(vec2 a, vec2 b, vec2 c) {
      float A = length(b-c), B = length(c-a), C = length(a-b), s = 0.5*(A+B+C);
      return sqrt(s*(s-A)*(s-B)*(s-C));
  }
  
  void main() {
      U = vUv * iResolution;
      ur = iResolution.xy;
      
      if (iFrame < 1) {
          float w = 0.5+sin(0.2*U.x)*0.5;
          float q = length(U-0.5*ur);
          gl_FragColor = vec4(0.1*exp(-0.001*q*q),0,0,w);
      } else {
          vec2 v = U,
               A = v + vec2( 1, 1),
               B = v + vec2( 1,-1),
               C = v + vec2(-1, 1),
               D = v + vec2(-1,-1);
          
          for (int i = 0; i < 8; i++) {
              v -= t(v).xy;
              A -= t(A).xy;
              B -= t(B).xy;
              C -= t(C).xy;
              D -= t(D).xy;
          }
          
          vec4 me = t(v);
          vec4 n = t(v, 0, 1),
              e = t(v, 1, 0),
              s = t(v, 0, -1),
              w = t(v, -1, 0);
          vec4 ne = .25*(n+e+s+w);
          me = mix(t(v), ne, vec4(0.15,0.15,0.95,0.));
          me.z = me.z - 0.01*((area(A,B,C)+area(B,C,D))-4.);
          
          vec4 pr = vec4(e.z,w.z,n.z,s.z);
          me.xy = me.xy + 100.*vec2(pr.x-pr.y, pr.z-pr.w)/ur;
          
          me.xy *= uFluidDecay;
          me.z *= uTrailLength;
          
          if (iMouse.z > 0.0) {
              vec2 mousePos = iMouse.xy;
              vec2 mousePrev = iMouse.zw;
              vec2 mouseVel = mousePos - mousePrev;
              float velMagnitude = length(mouseVel);
              float q = ln(U, mousePos, mousePrev);
              vec2 m = mousePos - mousePrev;
              float l = length(m);
              if (l > 0.0) m = min(l, 10.0) * m / l;
              
              float brushSizeFactor = 1e-4 / uBrushSize;
              float strengthFactor = 0.03 * uBrushStrength;
              
              float falloff = exp(-brushSizeFactor*q*q*q);
              falloff = pow(falloff, 0.5);
              
              me.xyw += strengthFactor * falloff * vec3(m, 10.);
              
              if (velMagnitude < 2.0) {
                  float distToCursor = length(U - mousePos);
                  float influence = exp(-distToCursor * 0.01);
                  float cursorDecay = mix(1.0, uStopDecay, influence);
                  me.xy *= cursorDecay;
                  me.z *= cursorDecay;
              }
          }
          
          gl_FragColor = clamp(me, -0.4, 0.4);
      }
  }
`;

const displayShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iFluid;
  uniform float uDistortionAmount;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uColorIntensity;
  uniform float uSoftness;
  varying vec2 vUv;
  
  void main() {
    vec2 fragCoord = vUv * iResolution;
    
    vec4 fluid = texture2D(iFluid, vUv);
    vec2 fluidVel = fluid.xy;
    
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;
    
    uv += fluidVel * (0.5 * uDistortionAmount);
    
    float d = -iTime * 0.5;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += iTime * 0.5;
    
    float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
    float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
    float mixer3 = sin(d + a) * 0.5 + 0.5;
    
    float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
    mixer1 = mix(mixer1, 0.5, smoothAmount);
    mixer2 = mix(mixer2, 0.5, smoothAmount);
    mixer3 = mix(mixer3, 0.5, smoothAmount);
    
    vec3 col = mix(uColor1, uColor2, mixer1);
    col = mix(col, uColor3, mixer2);
    col = mix(col, uColor4, mixer3 * 0.4);
    
    col *= uColorIntensity;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;


const Home = () => {
const servicesRef = useRef(null);
const heroSectionRef = useRef(null);
const rendererRef = useRef(null);
const animationIdRef = useRef(null);


// Temporary hardcoded data for testing
const hospitalInfo = {
data: {
name: 'Gopala Nethralaya',
tagline: 'Caring for Your Health',
}
};

const config = {
  brushSize: 25.0,
  brushStrength: 0.5,
  distortionAmount: 2.5,
  fluidDecay: 0.98,
  trailLength: 0.8,
  stopDecay: 0.85,
  color1: "#b8fff7",
  color2: "#6e3466",
  color3: "#0133ff",
  color4: "#66d1fe",
  colorIntensity: 1.0,
  softness: 1.0,
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}


useEffect(() => {
  if (heroSectionRef.current) {
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';

    heroSectionRef.current.appendChild(renderer.domElement);

    const fluidTarget1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    const fluidTarget2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;
    let frameCount = 0;

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
      },
      vertexShader: vertexShader,
      fragmentShader: fluidShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
      },
      vertexShader: vertexShader,
      fragmentShader: displayShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let lastMoveTime = 0;

    const handleFluidMouseMove = (e) => {
      const rect = heroSectionRef.current.getBoundingClientRect();
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top);
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
    };

    const handleFluidMouseLeave = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    heroSectionRef.current.addEventListener("mousemove", handleFluidMouseMove);
    heroSectionRef.current.addEventListener("mouseleave", handleFluidMouseLeave);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      fluidMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      if (performance.now() - lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      }

      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidPlane, camera);

      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayPlane, camera);

      const temp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = temp;

      frameCount++;
    };

    animate();

    const handleFluidResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      fluidMaterial.uniforms.iResolution.value.set(width, height);
      displayMaterial.uniforms.iResolution.value.set(width, height);
      fluidTarget1.setSize(width, height);
      fluidTarget2.setSize(width, height);
      frameCount = 0;
    };

    window.addEventListener("resize", handleFluidResize);

    // ----- end of heroSectionRef.current block -----
  }

  // Lenis + GSAP setup (outside heroSectionRef guard intentionally)
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const initTextSplit = () => {
    const textElements = document.querySelectorAll(".service-col-3 h1, .service-col-3 p");

    textElements.forEach((element) => {
      const split = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      split.lines.forEach(
        (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
      );
    });
  };

  initTextSplit();

  gsap.set(".service-col-3 .service-col-content-wrapper .line span", { y: "0%" });
  gsap.set(".service-col-3 .service-col-content-wrapper-2 .line span", { y: "-125%" });

  ScrollTrigger.create({
    trigger: ".intro",
    start: "top top",
    end: "bottom top",
    onEnter: () => gsap.to("header", { y: "-100%", duration: 0.3 }),
    onLeaveBack: () => gsap.to("header", { y: "0%", duration: 0.3 })
  });

  ScrollTrigger.create({
    trigger: ".service-sticky-cols",
    start: "top top",
    end: () => "+=" + document.querySelector(".service-sticky-cols").offsetHeight * 3,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
  });

  let currentPhase = 0;

  ScrollTrigger.create({
    trigger: ".service-sticky-cols",
    start: "top top",
    end: `+=${window.innerHeight * 3}px`,
    onUpdate: (self) => {
      const progress = self.progress;

      if (progress >= 0.3 && currentPhase === 0) {
        currentPhase = 1;

        gsap.to(".service-col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
        gsap.to(".service-col-2", { x: "0%", duration: 0.75 });
        gsap.to(".service-col-3", { y: "0%", duration: 0.75 });

        gsap.to(".service-col-img-1 img", { scale: 1.25, duration: 0.75 });
        gsap.to(".service-col-img-2", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
        });
        gsap.to(".service-col-img-2 img", { scale: 1, duration: 0.75 });
      }

      if (progress >= 0.6 && currentPhase === 1) {
        currentPhase = 2;

        gsap.to(".service-col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
        gsap.to(".service-col-3", { x: "0%", duration: 0.75 });
        gsap.to(".service-col-4", { y: "0%", duration: 0.75 });

        gsap.to(".service-col-3 .service-col-content-wrapper .line span", {
          y: "-125%",
          duration: 0.75,
        });
        gsap.to(".service-col-3 .service-col-content-wrapper-2 .line span", {
          y: "0%",
          duration: 0.75,
          delay: 0.5,
        });
      }

      if (progress < 0.3 && currentPhase >= 1) {
        currentPhase = 0;

        gsap.to(".service-col-1", { opacity: 1, scale: 1, duration: 0.75 });
        gsap.to(".service-col-2", { x: "100%", duration: 0.75 });
        gsap.to(".service-col-3", { y: "100%", duration: 0.75 });

        gsap.to(".service-col-img-1 img", { scale: 1, duration: 0.75 });
        gsap.to(".service-col-img-2", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.75,
        });
        gsap.to(".service-col-img-2 img", { scale: 1.25, duration: 0.75 });
      }

      if (progress < 0.6 && currentPhase === 2) {
        currentPhase = 1;

        gsap.to(".service-col-2", { opacity: 1, scale: 1, duration: 0.75 });
        gsap.to(".service-col-3", { x: "100%", duration: 0.75 });
        gsap.to(".service-col-4", { y: "100%", duration: 0.75 });

        gsap.to(".service-col-3 .service-col-content-wrapper .line span", {
          y: "0%",
          duration: 0.75,
          delay: 0.5,
        });
        gsap.to(".service-col-3 .service-col-content-wrapper-2 .line span", {
          y: "-125%",
          duration: 0.75,
        });
      }
    },
  });

  // CLEANUP: remove listeners, cancel animation frame, destroy lenis and GSAP triggers, dispose three objects
  return () => {
    // remove any canvas appended to heroSectionRef
    if (heroSectionRef.current) {
      const canvases = heroSectionRef.current.querySelectorAll('canvas');
      canvases.forEach((c) => c.remove());
    }

    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);

    // destroy lenis safely
    try { lenis.destroy(); } catch (e) {}

    // kill ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // dispose renderer if present
    if (rendererRef.current) {
      try {
        rendererRef.current.forceContextLoss();
        rendererRef.current.domElement && rendererRef.current.domElement.remove();
        rendererRef.current.dispose && rendererRef.current.dispose();
      } catch (e) {}
      rendererRef.current = null;
    }
  };
}, []); // <-- IMPORTANT: close useEffect with deps


return (
<div className="min-h-screen">
{/* Hero Section */}
<section 
  ref={heroSectionRef}
  className="h-screen relative overflow-hidden flex items-center justify-center"
>
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
      Welcome to {hospitalInfo?.data?.name}
    </h1>
    <p className="text-2xl md:text-3xl mb-8 font-semibold text-white drop-shadow-md">
      {hospitalInfo?.data?.tagline}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/appointments" className="btn-primary">Book Appointment</Link>
      <Link to="https://maps.app.goo.gl/7G6mQfcwDBhGVvZ17" className="btn-primary">
        Location
      </Link>
    </div>
  </div>
</section>


{/* Services Intro */}
<section className="intro bg-white">
<h1 className="text-4xl md:text-5xl font-medium text-center text-gray-800 px-4">
  We provide comprehensive eye care services with modern technology and expert precision.
</h1>
</section>

{/* Animated Services Section */}
<section className="service-sticky-cols bg-white" ref={servicesRef}>
<div className="service-sticky-cols-wrapper">
  <div className="service-col service-col-1">
    <div className="service-col-content">
      <div className="service-col-content-wrapper">
        <h1 className="text-gray-700">
          Advanced cataract surgery with precision and care.
        </h1>
        <p className="text-gray-600">
          State-of-the-art techniques and technology ensure the best outcomes for your vision restoration journey.
        </p>
      </div>
    </div>
  </div>

  <div className="service-col service-col-2">
    <div className="service-col-img service-col-img-1">
      <div className="service-col-img-wrapper">
        <img
          src={cataractSurgeryPlaceholder}
          alt="Cataract Surgery"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="service-col-img service-col-img-2">
      <div className="service-col-img-wrapper">
        <img
          src={lasikPlaceholder}
          alt="Refractive Surgery"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  <div className="service-col service-col-3">
    <div className="service-col-content-wrapper">
      <h1 className="text-gray-700">Expert refractive surgery for clear vision without glasses.</h1>
      <p className="text-gray-600">
        LASIK and advanced refractive procedures tailored to your unique vision needs and lifestyle.
      </p>
    </div>
    <div className="service-col-content-wrapper-2">
    <h1 className="text-gray-700">
    Advanced ICL (Implantable Collamer Lens) Surgery.
    </h1>
    <p className="text-gray-600">
    A safe and effective solution for correcting high refractive errors, offering clear vision without the need for glasses or contact lenses.
    </p>
    </div>
</div>


  <div className="service-col service-col-4">
    <div className="service-col-img">
      <div className="service-col-img-wrapper">
        <img
          src={iclPlaceholder}
          alt="Glaucoma and Retinal Services"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</div>
</section>

{/* Services Outro */}
<section className="outro bg-white">
<h1 className="text-4xl md:text-5xl font-medium text-center text-gray-800 px-4">
  Excellence in eye care begins with expert consultation.
</h1>
</section>


{/* Why Choose Us */}
<section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Precision in Action
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Witness the artistry of advanced ophthalmic surgery. Every procedure represents years of training, cutting-edge technology, and unwavering commitment to restoring sight.
      </p>
    </div>
    
    {/* Main Surgery Video */}
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-black/50 rounded-3xl overflow-hidden">
        
        {/* Video Container */}
        <div className="relative aspect-video overflow-hidden">
          <video 
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            poster="/images/surgery-thumbnail.jpg"
          >
            <source src="/vedios/live-surgery.mp4" type="video/mp4" />
            <source src="/vedios/live-surgery.webm" type="video/webm" />
            
            {/* Fallback for when video doesn't load */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-light opacity-50 mb-4">⚕</div>
                <p className="text-xl">Surgery Video Loading...</p>
              </div>
            </div>
          </video>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Live Surgical Excellence
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Experience the precision of modern ophthalmic surgery. This live procedure demonstrates the meticulous techniques and advanced technology that define our surgical approach.
          </p>
          
          {/* Steps for patients */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-white mb-4">Patient Journey Steps:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="text-gray-300">Pre-operative consultation and eye examination</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="text-gray-300">Detailed surgical planning and patient preparation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="text-gray-300">Minimally invasive surgical procedure</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                <div>
                  <p className="text-gray-300">Post-operative care and recovery monitoring</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    {/* YouTube Video Section */}
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/50 rounded-3xl overflow-hidden">
        
        {/* YouTube Video Container */}
        <div className="relative aspect-video overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/CCiADOJ01DI"
            title="Surgery done live for TV channel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Live Surgery Broadcast
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Watch our expert surgeon performing live surgery on television, demonstrating the transparency and confidence in our surgical procedures. This broadcast showcases our commitment to medical education and patient awareness.
          </p>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          * Surgical footage for educational purposes. All procedures performed by licensed professionals.
        </p>
      </div>
    </div>
  </div>
</section>


<style jsx>{`
.intro, .outro {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
  color: #374151;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro h1, .outro h1 {
  width: 50%;
  text-align: center;
}

.service-sticky-cols {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  padding: 0.5rem;
}

.service-sticky-cols-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.service-col {
  position: absolute;
  width: 50%;
  height: 100%;
  will-change: transform;
}

.service-col-1 {
  z-index: 10;
}

.service-col-2 {
  transform: translateX(100%);
  z-index: 20;
}

.service-col-3 {
  transform: translateX(100%) translateY(100%);
  padding: 0.5rem;
  z-index: 30;
}

.service-col-4 {
  transform: translateX(100%) translateY(100%);
  z-index: 40;
}

.service-col-content, .service-col-img {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}

.service-col-content-wrapper, .service-col-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  border-radius: 3rem;
  overflow: hidden;
}

.service-col-content-wrapper {
  padding: 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-col-content-wrapper-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-col-img-1, .service-col-img-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.service-col-img-2 {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
}

.service-col-img-2 img {
  transform: scale(1.25);
}

.line {
  overflow: hidden;
}

.line span {
  display: block;
  will-change: transform;
}

.service-col h1 {
  color: #6b7280;
  width: 60%;
  font-size: clamp(1.5rem, 2.5vw, 3rem);
  font-weight: 500;
  line-height: 1.1;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  z-index: 0;
  display: block;
}

.service-col p {
  color: #374151;
  width: 60%;
  font-size: clamp(0.9rem, 1vw, 1.2rem);
  font-weight: 500;
}

.scroll-section {
  scroll-margin-top: 64px; /* same as header height */
}

@media (max-width: 1000px) {
  .service-col h1 {
    font-size: clamp(1.2rem, 4vw, 2rem);
    width: 100%;
  }

  .service-col p {
    font-size: clamp(0.8rem, 2vw, 1rem);
    width: 100%;
  }

  .service-col-content-wrapper,
  .service-col-content-wrapper-2 {
    padding: 4vw;
  }
}
`}</style>
</div>
);
};

export default Home;