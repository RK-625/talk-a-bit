/**
 * engine/colliders.js: cylinder-ish obstacles on the sphere the player slides off.
 * A collider is { dir: unit Vector3 (direction from planet centre), radius, height } in surface units.
 * The player ignores a collider when it is higher than `height` above the ground (jumps clear it).
 *
 * const colliders = createColliders()
 * colliders.add(c)             static collider (trees, rocks, stalls)
 * colliders.addMoving(c)       moving collider: mutate c.dir (in place) every frame, or give c.update(dt) and
 *                              it is called each frame by the engine. actors.add(..., { collider }) does this for you.
 * colliders.remove(c)
 * colliders.list               live array (the player iterates it)
 * colliders.update(dt)         engine calls this once per frame
 */
export function createColliders() {
  const list = [];
  const moving = [];
  return {
    list,
    add(c) { list.push(c); return c; },
    addMoving(c) { list.push(c); moving.push(c); return c; },
    remove(c) {
      for (const arr of [list, moving]) { const i = arr.indexOf(c); if (i >= 0) arr.splice(i, 1); }
    },
    update(dt) { for (let i = 0; i < moving.length; i++) moving[i].update?.(dt); },
  };
}
