function init()
{
	var gui = new dat.GUI();
	var scene = new THREE.Scene()
	//scene.fog = new THREE.FogExp2(0xffffff, 0.1);
	var boxRotation = getBoxRotation(1, 1, 1);
	var boxScale = getBoxScale(1, 1, 1);
	var boxTranslation = getBoxTranslation(1, 1, 1);
	//boxRotation.position.y = box.geometry.parameters.height/2;
	
	// add box
	scene.add(boxRotation);
	scene.add(boxScale);
	scene.add(boxTranslation);

	//add plane
	var plane = getPlane(6);
	plane.rotation.x = Math.PI/2;
	scene.add(plane);

	//pointLight
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
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


	boxRotation.name = 'r';
	boxScale.name = 's';
	boxTranslation.name = 't';

	//add camera
	var camera = new THREE.PerspectiveCamera
	(
		45,
		window.innerWidth/window.innerHeight,
		1,
		1000
	);
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 6;

	camera.lookAt(new THREE.Vector3(-0.1,1,3));

	var renderer = new THREE.WebGLRenderer();//{ alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera);
	return scene;
}

function getSphere(size)
{
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

function getBoxRotation(w, h, d)
{		//texture
	var textureLoader = new THREE.TextureLoader();
	var boxTexture = 
		textureLoader.load("texture_black.jpg");

	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		map: boxTexture, side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}

function getBoxScale(w, h, d)
{		//texture
	var textureLoader = new THREE.TextureLoader();
	var boxTexture = 
		textureLoader.load("texture_red.jpg");

	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		map: boxTexture, side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}


function getBoxTranslation(w, h, d)
{		//texture
	var textureLoader = new THREE.TextureLoader();
	var boxTexture = 
		textureLoader.load("texture_blue.jpg");

	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshPhongMaterial({
		map: boxTexture, side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}


function getPlane(size)
{
	//var texture = THREE.ImageUtils.loadTexture( "concrete.jpg" );


	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)', side: THREE.DoubleSide,
		//map : texture
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

function getPointLight(intensity)
{
	var light = new THREE.PointLight(0xffffff, intensity);
	
	return light;
}

function getSpotLight(intensity)
{
	var light = new THREE.SpotLight(0xffffff, intensity);
	
	return light;
}

function update(renderer, scene, camera)
{
	renderer.render
	(
		scene,
		camera
	);

	var temp_r = scene.getObjectByName('r');
		temp_r.position.x = -2;
		temp_r.position.y = 1;
		temp_r.rotateX(0.03);
		temp_r.rotateY(0.03);

	var temp_s = scene.getObjectByName('s');
		temp_s.position.x = 0;
		temp_s.position.y = 0.5;
		temp_s.scale.x = 0.75;
		temp_s.scale.y = 0.75;
		temp_s.scale.z = 0.75;

	var temp_t = scene.getObjectByName('t');
		temp_t.position.x = 2;
		temp_t.position.y = 1;
		temp_t.position.z = 0;
		temp_t.scale.x = 0.5;
		temp_t.scale.y = 0.5;
		temp_t.scale.z = 0.5;
   		temp_t.translateX(-0.75);
   		temp_t.translateZ(3);

	requestAnimationFrame(function() {
		update(renderer, scene, camera);
	})
	
}

var scene = init();