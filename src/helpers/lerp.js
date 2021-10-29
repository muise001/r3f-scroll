export const applyAnimationToTimelineLine = (
    camera,
    animationProgress,
    fragment,
    textGroupRef
) => {
    if (fragment?.position) {
        camera.position.set(...lerpPos(fragment.position, animationProgress));
    }
    if (fragment?.lookAt) {
        camera.lookAt(...lerpPos(fragment.lookAt, animationProgress));
    }
    if (fragment?.text?.position && textGroupRef) {
        textGroupRef.position.set(
            ...lerpPos(fragment.text.position, animationProgress)
        );
    }
};

function lerpPos([start, end], animationProgress) {
    return [
        start.x + (end.x - start.x) * animationProgress,
        start.y + (end.y - start.y) * animationProgress,
        start.z + (end.z - start.z) * animationProgress,
    ];
}

export const handleIntro = (percentage, introGroup) => {
    if (percentage < 1 && introGroup?.children) {
        introGroup.children[0].fillOpacity = 0 + 3 * percentage;
        introGroup.children[1].fillOpacity = -1 + 3 * percentage;
        introGroup.children[2].fillOpacity = -1.1 + 3 * percentage;
        introGroup.position.setZ(-2 + 3 * percentage);
    }
};
