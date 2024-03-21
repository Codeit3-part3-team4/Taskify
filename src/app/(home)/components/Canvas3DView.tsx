'use client';

import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTF, Environment, PresentationControls, useTexture } from '@react-three/drei';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import { useState, useEffect } from 'react';
import { MediaQueryType, useMediaQuery } from '@/components/hooks/useMediaQuery';

const BOX_GEOMETRY_ARGS = [1.9, 1.1, 0.01];

const MainThumb = ({ onClick }: { onClick: (revert: boolean) => void }) => {
  const texture = useTexture('images/mainThumb.png');
  const geometry = new BoxGeometry(...BOX_GEOMETRY_ARGS);
  const material = new MeshBasicMaterial({ map: texture });
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0.7);
  const [zPosition, setZPosition] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isRevert, setIsRevert] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 or -1

  useFrame(() => {
    if (rotation > 0.1) setRotationDirection(-1);
    else if (rotation < -0.1) setRotationDirection(1);
    setRotation(prev => prev + 0.001 * rotationDirection);
  });

  const endX = 3;
  const endY = 1;
  const endZ = -6;

  const startX = 0;
  const startY = 0.7;
  const startZ = 0;

  const onClickThumb = (e: any) => {
    onClick(isRevert);
    setIsStart(true);
  };

  useEffect(() => {
    if (!isStart) return;

    const interval = setTimeout(() => {
      if (!isRevert) {
        if (xPosition <= endX) setXPosition(prev => Math.min(prev + 0.03, endX));
        if (yPosition <= endY) setYPosition(prev => Math.min(prev + 0.003, endY));
        if (zPosition >= endZ) setZPosition(prev => Math.max(prev - 0.06, endZ));

        if (zPosition <= endZ && xPosition >= endX && yPosition >= endY) {
          setIsStart(false);
          setIsRevert(!isRevert);
        }
      } else {
        if (zPosition <= startZ) {
          setZPosition(prev => prev + 0.055);
        }
        if (xPosition >= startX) {
          setXPosition(prev => prev - 0.03);
        }
        if (yPosition >= startY) setYPosition(prev => prev - 0.003);

        if (zPosition >= startZ && xPosition <= startX && yPosition <= startY) {
          setIsStart(false);
          setIsRevert(!isRevert);
        }
      }
    }, 15);

    return () => {
      clearTimeout(interval);
    };
  }, [zPosition, xPosition, yPosition, isStart, isRevert]);

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[xPosition, yPosition, 3.75 + zPosition]}
      rotation={[rotation * rotation, 0, rotation]}
      onClick={onClickThumb}
    />
  );
};

const Laptop = ({ operateIndex }: { operateIndex: number }) => {
  const laptop = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  const [isStart, setIsStart] = useState(false);
  const [isRevert, setIsRevert] = useState(false);
  const [isMoveMac, setIsMoveMac] = useState(false);
  const [zPosition, setZPosition] = useState(0);
  const [degree, setDegree] = useState(0);
  const [isOnMac, setIsOnMac] = useState(false);
  const [iframeSize, setIframeSize] = useState([900, 600]);
  const [iframeUrl, setIframeUrl] = useState<string>('https://ohddang.github.io/this-is-FE');
  const mediaQuery = useMediaQuery();

  const deltaX = 0;
  const deltaY = 1.52;
  const deltaZ = -1.5;

  const endZ = 4.4;
  const endDegree = -100;

  const onClickThumb = (revert: boolean) => {
    if (revert) setIsRevert(revert);
    revert ? setIsMoveMac(true) : setIsStart(true);
  };

  useEffect(() => {
    switch (operateIndex) {
      case 0:
        setIframeUrl('https://ohddang.github.io/this-is-FE');
        break;
      case 1:
        setIframeUrl('https://ohddang.github.io/react-tetris/tetris/');
        break;
      case 2:
        setIframeUrl('https://www.codeit.kr/');
        break;
    }
  }, [operateIndex]);

  useEffect(() => {
    switch (mediaQuery) {
      case MediaQueryType.MOBILE:
        setIframeSize([450, 300]);
        // setIframeUrl('https://www.codeit.kr/');
        break;
      case MediaQueryType.TABLET:
      case MediaQueryType.DESKTOP:
        setIframeSize([720, 480]);
        // setIframeUrl('https://ohddang.github.io/react-tetris/tetris/');
        break;
      case MediaQueryType.DESKTOP_2XL:
        setIframeSize([1200, 800]);
        // setIframeUrl('https://ohddang.github.io/this-is-FE');
        break;
    }
  }, [mediaQuery]);

  useEffect(() => {
    if (!isStart) return;

    const interval = setInterval(() => {
      if (!isRevert) {
        setZPosition(prev => {
          if (prev < endZ) {
            return prev + 0.1;
          } else {
            setIsStart(false);
            setIsMoveMac(true);
            clearInterval(interval);
            return prev;
          }
        });
      } else {
        setZPosition(prev => {
          if (prev > 0) {
            return prev - 0.1;
          } else {
            setIsStart(false);
            setIsRevert(false);
            clearInterval(interval);
            return prev;
          }
        });
      }
    }, 15);

    return () => {
      clearInterval(interval);
    };
  }, [isStart, zPosition, isMoveMac, isRevert]);

  useEffect(() => {
    if (!isMoveMac) return;

    const interval = setInterval(() => {
      if (!isRevert) {
        setDegree(prev => {
          if (prev > endDegree) {
            return prev - 3;
          } else {
            setDegree(endDegree);
            setIsMoveMac(false);
            setIsOnMac(true);
            clearInterval(interval);
            return prev;
          }
        });
      } else {
        setDegree(prev => {
          if (isOnMac) setIsOnMac(false);

          if (prev < 0) {
            return prev + 3;
          } else {
            setDegree(0);
            setIsStart(true);
            setIsMoveMac(false);
            clearInterval(interval);
            return prev;
          }
        });
      }
    }, 15);

    return () => {
      clearInterval(interval);
    };
  }, [isMoveMac, isRevert, isOnMac, degree]);

  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls global polar={[-0.02, 0.02]} azimuth={[-0.015, 0.015]}>
        <primitive
          object={laptop.scene}
          position-y={-1.2}
          position-z={-1.6 + zPosition}
          ref={(scene: any) => {
            if (scene) {
              const mesh = scene.getObjectByName('Macbook');
              if (mesh) {
                mesh.getObjectByName('Top').rotation.x = ((180 + degree) * Math.PI) / 180;
                mesh.getObjectByName('FrontCameraRing001').visible = false;
              }
            }
          }}
        >
          {
            <Html wrapperClass="laptop" center position={[deltaX, deltaY, deltaZ]} distanceFactor={1.0} style={{ opacity: isOnMac ? '1' : '0' }}>
              <iframe
                loading="lazy"
                allowFullScreen
                src={iframeUrl}
                style={{
                  width: `${iframeSize[0] * 2}px`,
                  height: `${iframeSize[1] * 2}px`,
                  position: 'relative',
                  top: '0',
                  left: '0',
                }}
              />
            </Html>
          }
        </primitive>
        <MainThumb onClick={onClickThumb} />
      </PresentationControls>
    </>
  );
};

export default function Canvas3DView({ operateIndex }: { operateIndex: number }) {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 45, near: 0.1, far: 1500 }} style={{ background: '#F1EFFD' }}>
      <Laptop operateIndex={operateIndex} />
    </Canvas>
  );
}
