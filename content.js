(() => {
  if (window.__chromeRulerCrosshairInjected) {
    // Prevent double-injection
    return;
  }
  window.__chromeRulerCrosshairInjected = true;

  let crosshairActive = false;
  let verticalLine, horizontalLine;

  function createCrosshair() {
    verticalLine = document.createElement('div');
    horizontalLine = document.createElement('div');

    const commonStyles = {
      position: 'fixed',
      top: '0',
      left: '0',
      background: '#F33E38',
      opacity: '0.35',
      zIndex: '99999999',
      pointerEvents: 'none'
    };

    Object.assign(verticalLine.style, {
      ...commonStyles,
      width: '1px',
      height: '100vh',
    });

    Object.assign(horizontalLine.style, {
      ...commonStyles,
      width: '100vw',
      height: '1px',
    });

    document.body.appendChild(verticalLine);
    document.body.appendChild(horizontalLine);

    document.addEventListener('mousemove', moveCrosshair);
  }

  function removeCrosshair() {
    if (verticalLine) verticalLine.remove();
    if (horizontalLine) horizontalLine.remove();
    document.removeEventListener('mousemove', moveCrosshair);
  }

  function moveCrosshair(e) {
    verticalLine.style.left = `${e.clientX}px`;
    horizontalLine.style.top = `${e.clientY}px`;
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_CROSSHAIR") {
      crosshairActive = !crosshairActive;
      if (crosshairActive) {
        createCrosshair();
      } else {
        removeCrosshair();
      }
    }
  });
})();