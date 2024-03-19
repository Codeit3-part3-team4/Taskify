'use client';

import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTF, Environment, PresentationControls, useTexture } from '@react-three/drei';
import { BoxGeometry, MeshBasicMaterial } from 'three';
import { useState, useEffect } from 'react';

const BOX_GEOMETRY_ARGS = [1.9, 1.1, 0.01];

const MainThumb = ({ onClick }: { onClick: (revert: boolean) => void }) => {
  const texture = useTexture('images/mainThumb.png');
  const geometry = new BoxGeometry(...BOX_GEOMETRY_ARGS);
  const material = new MeshBasicMaterial({ map: texture });
  const [zPosition, setZPosition] = useState(-0.5);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0.7);
  const [isStart, setIsStart] = useState(false);
  const [isRevert, setIsRevert] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 or -1

  useFrame(() => {
    if (rotation > 0.1) setRotationDirection(-1);
    else if (rotation < -0.1) setRotationDirection(1);
    setRotation(prev => prev + 0.001 * rotationDirection);
  });

  const endZ = -6;
  const endX = 3;
  const endY = 1;

  const startZ = -0.5;

  const startX = 0;
  const startY = 0.7;

  const onClickThumb = (e: any) => {
    onClick(isRevert);
    setIsStart(true);
  };

  useEffect(() => {
    if (!isStart) return;

    const interval = setTimeout(() => {
      if (!isRevert) {
        if (zPosition >= endZ) {
          setZPosition(prev => prev - 0.055);
        }
        if (xPosition <= endX) {
          setXPosition(prev => prev + 0.03);
        }
        if (yPosition <= endY) setYPosition(prev => prev + 0.003);

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

const Laptop = () => {
  const laptop = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  const [isStart, setIsStart] = useState(false);
  const [isRevert, setIsRevert] = useState(false);
  const [isMoveMac, setIsMoveMac] = useState(false);
  const [zPosition, setZPosition] = useState(0);
  const [degree, setDegree] = useState(0);
  const [isOnMac, setIsOnMac] = useState(false);

  // html react-three/drei bug 임시조치
  const [isOdd, setIsOdd] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const deltaX = 0;
  const deltaY = 1.53;
  const deltaZ = -1.4;

  const endZ = 4.4;
  const endDegree = -105;

  const onClickThumb = (revert: boolean) => {
    if (revert) setIsRevert(revert);
    revert ? setIsMoveMac(true) : setIsStart(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1536 ? true : false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth % 2 === 0) setIsOdd(false);
      else setIsOdd(true);
    });
  }, [isOdd]);

  let iframeShow = false;

  // chrome에서 이렇게 동작, whale은 isOdd를 반대로해야 동작
  if (!isOdd && !isDesktop) iframeShow = true;
  if (isOdd && isDesktop) iframeShow = true;

  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls global polar={[-0.3, 0.3]} azimuth={[-1.1, 1.1]}>
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
          {iframeShow && (
            <Html
              wrapperClass="laptop"
              position={[deltaX, deltaY, deltaZ]}
              scale={[0.9, 1, 1]}
              distanceFactor={1.0}
              rotation-x={-0.25}
              transform
              style={{ opacity: isOnMac ? '1' : '0' }}
            >
              <iframe
                loading="lazy"
                allowFullScreen
                src="https://ohddang.github.io/this-is-FE"
                style={{
                  width: '1280px',
                  height: '800px',
                  position: 'relative',
                  top: '0',
                  left: '0',
                }}
              />
            </Html>
          )}
        </primitive>
        <MainThumb onClick={onClickThumb} />
      </PresentationControls>
    </>
  );
};

export default function Canvas3DView() {
  return (
    <Canvas camera={{ position: [0.6, 1.5, 5], fov: 45, near: 0.1, far: 1500 }} style={{ background: '#F1EFFD' }}>
      <Laptop />
    </Canvas>
  );
}
