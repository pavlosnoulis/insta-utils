function removeIndex(array, index) {
  if (index === 0) {
    return array.slice(1);
  } else if (index === array.length - 1) {
    return array.slice(0, -1);
  } else {
    return array.slice(0, index).concat(index + 1);
  }
}

export { removeIndex };
