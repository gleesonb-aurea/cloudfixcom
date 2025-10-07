export function triggerAllIntersections(isIntersecting = true) {
  const io = (global as any).__io;
  if (!io) return;
  for (const inst of io.instances) {
    if (typeof inst.trigger === 'function') inst.trigger(isIntersecting);
  }
}

