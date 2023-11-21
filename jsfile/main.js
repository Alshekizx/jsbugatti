import * as THREE from '/three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const front = document.getElementById('front');
const side = document.getElementById('side');
const back = document.getElementById('back')




const scene = new THREE.Scene();


scene.background = new THREE.Color(0x000011);
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );


//const controls = new OrbitControls( camera, renderer.domElement );




//model import

const loader = new GLTFLoader();

loader.load( 'model/bugatti.glb', function ( gltf ) {
	var model1 = gltf.scene;
	model1.position.set(0, 0, 0); // Adjust the position as needed
	scene.add(model1)

},
 undefined, function ( error ) {

	console.error( error );

} );

loader.load( 'model/environment.glb', function ( gltf ) {

	var model2 = gltf.scene;
	model2.position.set(0, -0.7, 0); // Adjust the position as needed
  scene.add(model2);

},
 undefined, function ( error ) {

	console.error( error );

} );



//test
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });


//camera position
camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 0;

camera.rotation.z = 0;
camera.rotation.y = 0;
camera.rotation.x = 0;

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.intensity = 0.09;
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 10, 5);
pointLight.intensity = 200;
scene.add(pointLight);
pointLight.castShadow = true;
//shadow



renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows




front.addEventListener('click', function() {
    animateCameraTo(-5.5, 7, 13, -0.4, 0, 0);
});

side.addEventListener('click', function() {
    animateCameraTo(-20, 4, -8, 0, -1.5, 0);
});

back.addEventListener('click', function() {
    animateCameraTo(9, 4, -18, 0, 3, 0);
});

function animateCameraTo(targetX, targetY, targetZ, targetRotationX, targetRotationY, targetRotationZ) {
    var start = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        rotationX: camera.rotation.x,
        rotationY: camera.rotation.y,
        rotationZ: camera.rotation.z
    };

    var target = {
        x: targetX,
        y: targetY,
        z: targetZ,
        rotationX: targetRotationX,
        rotationY: targetRotationY,
        rotationZ: targetRotationZ
    };

    var startTime = performance.now();
    var duration = 1000; // milliseconds

    function updateCamera(progress) {
        camera.position.x = start.x + progress * (target.x - start.x);
        camera.position.y = start.y + progress * (target.y - start.y);
        camera.position.z = start.z + progress * (target.z - start.z);
        camera.rotation.x = start.rotationX + progress * (target.rotationX - start.rotationX);
        camera.rotation.y = start.rotationY + progress * (target.rotationY - start.rotationY);
        camera.rotation.z = start.rotationZ + progress * (target.rotationZ - start.rotationZ);
    }

    function animate() {
        var currentTime = performance.now();
        var progress = Math.min((currentTime - startTime) / duration, 1);

        updateCamera(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
