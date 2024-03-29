import React from "react";
import { EllipseCurve } from "three";
import { Text } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { getRandomInRange } from "./utils";

// TODO:
// Next steP: animate
// modify curveRadius around 100 to achieve flapping effect --- anchor ~ 86
// make text flap + follow a line
// loop through anchorX with a small curveRadius to achieve chasing tail rotation
export const TextAnimFlying = ({}) => {
    const textRef = React.useRef(null);
    let v = 0;
    let v2 = 0;

    const xRadius = 10;
    const yRadius = 10;

    const curve = React.useMemo(
        () =>
            new EllipseCurve(
                10,
                10, // ax, aY
                xRadius,
                yRadius, // xRadius, yRadius
                0,
                2 * Math.PI, // aStartAngle, aEndAngle
                false, // aClockwise
                0 // aRotation
            ),
        [xRadius, yRadius]
    );

    let r = 100;

    useFrame(() => {
        if (textRef.current) {
            const text = textRef.current;
            // fly in a circle shape

            // text.position.x += Math.cos(v2);
            // text.position.y += Math.sin(v2);

            // v2 += 0.01;

            // coil
            text.fontSize += 2 * Math.sin(v);
            // flapp
            text.curveRadius = 100 + 20 * Math.sin(v);
            // wobble
            text.anchorX += Math.cos(v / getRandomInRange(15, 20));
            text.anchorY += Math.sin(v / getRandomInRange(15, 20));

            v += getRandomInRange(0.1, 0.5) + 0.05;
        }
    });

    return (
        <Text
            ref={textRef}
            font={"ultra.ttf"}
            position={[-43, 450, -230]}
            anchorX={86}
            anchorY={50}
            rotation={[5, 0, 0]}
            orientation="-x+y"
            curveRadius={100}
            fontSize={80}
            color="crimson" // default
            strokeWidth={1.7}
            strokeColor={"chartreuse"}
            outlineWidth={"2%"}
            outlineOffsetX={3}
            outlineOffsetY={3}
            outlineColor={"cyan"}
        >
            beb
        </Text>
    );
};
