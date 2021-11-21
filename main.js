function init() {
    var gui = new dat.GUI();
    var scene = new THREE.Scene()

    //scene.fog = new THREE.FogExp2(0xffffff, 0.1);
    var material = getMaterial('Line', 'rgb(100, 100, 100)'); // change material type and color
    var geometry = getGeometry('Sphere'); // change shape of geometry
    // material.map = loadTexture('Black Texture');//add texture
    //var object = get3D_Object('Robot'); //add 3D Object
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    var point_geo = new THREE.Points(geometry, material);

    //Load reflection cube
    var reflectionCube = new THREE.CubeTextureLoader()
        .setPath('Cubemap/')
        .load([
            'skybox_right.png',
            'skybox_left.png',
            'skybox_top.png',
            'skybox_bottom.png',
            'skybox_front.png',
            'skybox_back.png'
        ]);

    reflectionCube.format = THREE.RGBFormat;

    scene.background = reflectionCube;

    // add box
    scene.add(mesh); // change to point_geo to draw geometry with point
    mesh.position.y += 0.5;

    //add plane
    var plane = getPlane(6);
    plane.rotation.x = Math.PI / 2;
    plane.position.y -= 1;
    scene.add(plane);

    //pointLight
    var pointLight = getPointLight(1);
    var sphere = getSphere(0.01);
    scene.add(pointLight);
    pointLight.position.y = 2;
    pointLight.position.x = 1;
    pointLight.position.z = 3.5;
    pointLight.add(sphere);
    pointLight.intensity = 2;

    //GUI
    gui.add(pointLight, 'intensity', 0, 10);
    gui.add(pointLight.position, 'y', 0, 5);
    gui.add(pointLight.position, 'x', -5, 5);
    gui.add(pointLight.position, 'z', -5, 5);


    // boxRotation.name = 'r';
    // boxScale.name = 's';
    // boxTranslation.name = 't';

    //add camera
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 6;

    camera.lookAt(new THREE.Vector3(-0.1, 1, 3));

    var renderer = new THREE.WebGLRenderer(); //{ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(120, 120, 120)');
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);
    return scene;
}

function getBoxRotation(w, h, d) { //texture
    var textureLoader = new THREE.TextureLoader();
    var boxTexture =
        textureLoader.load("texture_black.jpg");

    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        map: boxTexture,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

function getBoxScale(w, h, d) { //texture
    var textureLoader = new THREE.TextureLoader();
    var boxTexture =
        textureLoader.load("texture_red.jpg");

    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        map: boxTexture,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}


function getBoxTranslation(w, h, d) { //texture
    var textureLoader = new THREE.TextureLoader();
    var boxTexture =
        textureLoader.load("texture_blue.jpg");

    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        map: boxTexture,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

var loader = new THREE.GLTFLoader();

//Load 3D Object
function get3D_Object(name) {
    switch (name) {
        case "Teapot":
            var path = "3D_Object/Teapot/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.5, 0.5, 0.5) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "Helicopter":
            var path = "3D_Object/Helicopter/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.2, 0.2, 0.2) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "Car":
            var path = "3D_Object/Car/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.traverse(function(child) {
                        if (child.isMesh) {
                            child.geometry.center(); // center here
                        }
                    });
                    gltf.scene.scale.set(0.005, 0.005, 0.005) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "Mickey":
            var path = "3D_Object/Mickey/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.3, 0.3, 0.3) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "Motorcycle":
            var path = "3D_Object/Motorcycle/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.5, 0.5, 0.5) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "Robot":
            var path = "3D_Object/Robot/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.5, 0.5, 0.5) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
        case "House":
            var path = "3D_Object/House/scene.gltf";
            loader.load(path,
                function(gltf) {
                    gltf.scene.scale.set(0.2, 0.2, 0.2) // scale here
                    scene.add(gltf.scene);
                }, (xhr) => xhr, (err) => console.error(e));
            break;
    }
}

//Get geometry
function getGeometry(shape) {
    var Geometry;
    switch (shape) {
        case "Cone":
            Geometry = new THREE.ConeBufferGeometry(1, 1, 32, 32);
            break;
        case "Box":
            Geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            break;
        case "Sphere":
            Geometry = new THREE.SphereBufferGeometry(0.5, 50, 50);
            break;
        case "Torus":
            Geometry = new THREE.TorusBufferGeometry(0.4, 0.2, 40, 40);
            break;
        case "Cylinder":
            Geometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 32, 32);
            break;
        case "Torus Knot":
            Geometry = new THREE.TorusKnotBufferGeometry(0.5, 0.2, 32, 80);
            break;
        case "Icosahedron":
            Geometry = new THREE.IcosahedronBufferGeometry(1, 0);
            break;
    }
    return Geometry;
}

// Get material for geometry
function getMaterial(type, color) {
    var Material;
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
    };

    switch (type) {
        case 'Basic':
            Material = new THREE.MeshBasicMaterial(materialOptions);
            break;
        case 'Lambert':
            Material = new THREE.MeshLambertMaterial(materialOptions);
            break;
        case 'Phong':
            Material = new THREE.MeshPhongMaterial(materialOptions);
            break;
        case 'Standard':
            Material = new THREE.MeshStandardMaterial(materialOptions);
            break;
        case 'Point':
            Material = new THREE.PointsMaterial(materialOptions);
            Material.sizeAttenuation = false;
            break;
        case 'Line':
            Material = new THREE.MeshNormalMaterial();
            Material.wireframe = true;
            break;
        default:
            Material = new THREE.MeshBasicMaterial(materialOptions);
            break;
    }
    return Material;
}

// Load texture for geometry
function loadTexture(name) {
    var texture;
    switch (name) {
        case 'Concrete':
            texture = new THREE.TextureLoader().load("Texture/concrete.jpg")
            break;
        case 'Checkerboard':
            texture = new THREE.TextureLoader().load("Texture/checkerboard.jpg")
            break;
        case 'Black Texture':
            texture = new THREE.TextureLoader().load("Texture/texture_black.jpg")
            break;
        case 'Blue Texture':
            texture = new THREE.TextureLoader().load("Texture/texture_blue.jpg")
            break;
        case 'Leaf':
            texture = new THREE.TextureLoader().load("Texture/texture_red.jpg")
            break;
    }
    return texture;
}


function getSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 255)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

function getPlane(size) {
    //var texture = THREE.ImageUtils.loadTexture( "concrete.jpg" );


    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide,
        //map : texture
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);

    return light;
}

function getSpotLight(intensity) {
    var light = new THREE.SpotLight(0xffffff, intensity);

    return light;
}

function update(renderer, scene, camera) {
    renderer.render(
        scene,
        camera
    );

    // var temp_r = scene.getObjectByName('r');
    // temp_r.position.x = -2;
    // temp_r.position.y = 1;
    // temp_r.rotateX(0.03);
    // temp_r.rotateY(0.03);

    // var temp_s = scene.getObjectByName('s');
    // temp_s.position.x = 0;
    // temp_s.position.y = 0.5;
    // temp_s.scale.x = 0.75;
    // temp_s.scale.y = 0.75;
    // temp_s.scale.z = 0.75;

    // var temp_t = scene.getObjectByName('t');
    // temp_t.position.x = 2;
    // temp_t.position.y = 1;
    // temp_t.position.z = 0;
    // temp_t.scale.x = 0.5;
    // temp_t.scale.y = 0.5;
    // temp_t.scale.z = 0.5;
    // temp_t.translateX(-0.75);
    // temp_t.translateZ(3);

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    })

}

var scene = init();