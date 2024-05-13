// Convert a Pointer to an ID
function pointerToId(pointer) {
  try {
    const id = pointer.split("$").at(1);
    if (!id) throw new Error();
    return id;
  } catch (err) {
    throw new TypeError(`pointerToId: Wrong pointer format: '${pointer}'`);
  }
}

// Convert an ID to a Pointer
function idToPointer(collection, id) {
  try {
    const pointer = `${collection[0].toUpperCase()}${collection.slice(1)}$${id}`;
    if (!/.+\$.+/.test(pointer)) throw new Error();
    return pointer;
  } catch (err) {
    throw new TypeError(
      `idToPointer: Wrong argument format: argv[0]:'${collection}' argv[1]:'${id}'`,
    );
  }
}

export { pointerToId, idToPointer };
