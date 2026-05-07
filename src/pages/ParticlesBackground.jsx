import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: {
            value: "#f8f9fa",
          },
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 60,
          },

          color: {
            value: "#0d6efd",
          },

          links: {
            enable: true,
            color: "#0d6efd",
            distance: 150,
            opacity: 0.3,
          },

          move: {
            enable: true,
            speed: 2,
          },

          opacity: {
            value: 0.5,
          },

          size: {
            value: 3,
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
