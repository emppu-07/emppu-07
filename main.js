// Initialize three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Create a cube for the floor
var floorGeometry = new THREE.BoxGeometry(40, 1, 40);
var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -0.5, 0);
scene.add(floor);

// Create walls for the world
var wallGeometry = new THREE.BoxGeometry(1, 20, 40);
var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdfdfdf });
var rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(20, 10, 0);
scene.add(rightWall);

var leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-20, 10, 0);
scene.add(leftWall);

var frontWall = new THREE.Mesh(new THREE.BoxGeometry(40, 20, 1), wallMaterial);
frontWall.position.set(0, 10, 20);
scene.add(frontWall);

var backWall = new THREE.Mesh(new THREE.BoxGeometry(40, 20, 1), wallMaterial);
backWall.position.set(0, 10, -20);
scene.add(backWall);

// Create a first person camera
camera.position.set(0, 5, 0);

// Create a directional light
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 0);
scene.add(light);

// Add the renderer to the page and set its size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add event listeners for mouse movement to control the camera
var mouse = new THREE.Vector2();
var angle = new THREE.Vector2();
var previous = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onMouseMove, false);

// Add event listeners to control the camera's movement
var moveForward, moveBackward, moveLeft, moveRight;
moveForward = moveBackward = moveLeft = moveRight = false;

function onKeyDown(event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
}

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Create a function to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the camera based on mouse movement
    angle.x += (mouse.x / 100) - (previous.x / 100);
    angle.y += (mouse.y / 100) - (previous.y / 100);
    camera.rotation.y = angle.x;
    camera.rotation.x = angle.y;
    previous.set(mouse.x, mouse.y);

    // Move the camera based on keyboard input
    var speed = 0.1;
    var velocity = new THREE.Vector3();
    if (moveForward) velocity.z -= speed;
    if (moveBackward) velocity.z += speed;
    if (moveLeft) velocity.x -= speed;
    if (moveRight) velocity.x += speed;
    velocity.applyQuaternion(camera.quaternion);
    camera.position.add(velocity);

    // Render the scene
    renderer.render(scene, camera);
}

animate();