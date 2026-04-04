AFRAME.registerComponent('tap-place', {
  init: function () {

    const cursor = document.querySelector('#cursor');
    const content = document.querySelector('#content');
    const video = document.querySelector('#video');
    const scene = this.el.sceneEl;

    let placed = false;

    // Listen for tap using raycaster (IMPORTANT)
    scene.addEventListener('click', () => {

      // Ensure surface is detected
      if (!cursor.object3D.visible) {
        console.log("Surface not detected yet");
        return;
      }

      // Get real world position
      const pos = cursor.object3D.position;

      // Place only once (optional)
      if (!placed) {

        content.setAttribute('position', pos);
        content.setAttribute('visible', true);

        // Play video safely
        video.muted = true;
        video.play().catch(() => {});

        setTimeout(() => {
          video.muted = false;
        }, 500);

        this.createPetals();

        placed = true;
      }

    });
  },

  createPetals: function () {

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

    // Wait for XR to be ready before attaching component
    scene.addEventListener('loaded', () => {
      scene.setAttribute('tap-place', '');
    });

  };

});
