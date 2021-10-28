export function extendFragmentWithMouseMovement(fragment, mouse) {
    const newFragment = fragment.position.map((positions) => {
        const { x, y, z } = positions;
        return { x: x + mouse.x, y: y + mouse.y, z };
    });
    return newFragment;
}
