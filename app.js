AFRAME.registerComponent('place-on-tap', {
  init: function () {
    const scene = this.el.sceneEl;
    const content = document.querySelector('#content');
    const ground = document.querySelector('#ground');
    const video = document.querySelector('#video');

    scene.addEventListener('click', () => {

      const pos = ground.object3D.position;

      content.setAttribute('position', pos);
      content.setAttribute('visible', true);

      video.muted = true;
      video.play();

      setTimeout(() => {
        video.muted = false;
      }, 500);

      this.addPetals();
    });
  },

  addPetals: function () {
    const petals = document.querySelector('#petals');

    for (let i = 0; i < 30; i++) {

      let p = document.createElement('a-image');

      p.setAttribute('src', '#petal');
      p.setAttribute('scale', '0.15 0.15 0.15');

      p.setAttribute('position', {
        x: (Math.random()*2)-1,
        y: 2 + Math.random(),
        z: (Math.random()*2)-1
      });

      p.setAttribute('animation', {
        property: 'position',
        to: `${(Math.random()*2)-1} -1 ${(Math.random()*2)-1}`,
        dur: 4000 + Math.random()*2000,
        loop: true
      });

      petals.appendChild(p);
    }
  }
});

/* START BUTTON */

document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('startBtn');
  const overlay = document.getElementById('overlay');
  const scene = document.querySelector('a-scene');

  btn.onclick = () => {
    overlay.style.display = 'none';

    scene.setAttribute('place-on-tap', '');
  };

});