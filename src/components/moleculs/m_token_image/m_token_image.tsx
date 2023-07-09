import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import AImage from '@/components/atoms/a_image/a_image';

import Token from '@/models/token.model';

export interface MTokenImage {
  token: Token;
  height?: number;
  rounded?: string;
}

export default function MTokenImage(props: MTokenImage) {
  const { token, height, rounded } = props;

  const Model = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const gltf = useLoader(GLTFLoader, token.image, (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
      );
      loader.setDRACOLoader(dracoLoader);
    });

    return <primitive object={gltf.scene} scale={3} />;
  };

  if (token.image.includes('.glb') || token.image.includes('.gltf')) {
    return (
      <Canvas shadows>
        <Model />
        <Environment preset='city' />
        <OrbitControls autoRotate />
      </Canvas>
    );
  } else if (token.image.includes('.mp4')) {
    if (height) {
      return (
        <video
          className={`object-fill ${rounded}`}
          height={height}
          autoPlay
          muted
          loop
        >
          <source src={token.image} type='video/mp4' />
          Sorry, your browser doesn't support videos.
        </video>
      );
    } else {
      return (
        <video className='max-h-full' autoPlay muted loop>
          <source src={token.image} type='video/mp4' />
          Sorry, your browser doesn't support videos.
        </video>
      );
    }
  } else {
    if (height) {
      return (
        <AImage
          className={`max-h-[${height}px`}
          alt='token'
          src={token?.image}
        />
      );
    } else {
      return <AImage className='min-h-full' alt='token' src={token?.image} />;
    }
  }
}
