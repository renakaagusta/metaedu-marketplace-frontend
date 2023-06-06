import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import AImage from "@/components/atoms/a_image/a_image";

import Token from "@/models/token.model";

export interface MTokenImage {
  token: Token
  height?: number
  rounded?: string
}

export default function MTokenImage(props: MTokenImage) {
  const { token, height, rounded } = props

  const Model = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const gltf = useLoader(GLTFLoader, token.image);

    return <primitive object={gltf.scene} scale={0.1} />;
  };

  if (token.image.includes('.glb')) {
    return <Canvas shadows>
      <Model />
      <Environment preset="city" />
      <OrbitControls autoRotate />
    </Canvas>
  } else if (token.image.includes('.mp4')) {
    if (height) {
      return <video className={`object-fill ${rounded}`} height={height} autoPlay muted loop>
        <source src={token.image} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    } else {
      return <video className="max-h-full" autoPlay muted loop>
        <source src={token.image} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    }
  } else {
    if (height) {
      return <AImage className={`max-h-[${height}px`} alt="token" src={token?.image} />
    } else {
      return <AImage className="min-h-full" alt="token" src={token?.image} />
    }
  }
}