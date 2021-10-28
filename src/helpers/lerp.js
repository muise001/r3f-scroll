export const applyAnimationToTimelineLine = (
    camera,
    animationProgress,
    fragment
) => {
    if (fragment.position) {
        camera.position.set(...lerpPos(fragment.position, animationProgress));
    }
    if (fragment.lookAt) {
        camera.lookAt(...lerpPos(fragment.lookAt, animationProgress));
    }
};

function lerpPos(fragment, animationProgress) {
    return [
        fragment[0].x + (fragment[1].x - fragment[0].x) * animationProgress,
        fragment[0].y + (fragment[1].y - fragment[0].y) * animationProgress,
        fragment[0].z + (fragment[1].z - fragment[0].z) * animationProgress,
    ];
}
