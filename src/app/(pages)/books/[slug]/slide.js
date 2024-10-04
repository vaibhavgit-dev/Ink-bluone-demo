
        document.addEventListener('DOMContentLoaded', () => {
          const slider = document.querySelector('.slider');
          let isHovered = false;

          slider.addEventListener('mouseover', () => {
            isHovered = true;
          });

          slider.addEventListener('mouseout', () => {
            isHovered = false;
          });

          setInterval(() => {
            if (!isHovered) {
              slider.style.animationPlayState = 'running';
            } else {
              slider.style.animationPlayState = 'paused';
            }
          }, 100);
        });
      