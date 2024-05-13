function debug(heading) {
  if (typeof heading === "object") {
    console.dir(heading, { depth: null, colors: true, showHidden: false });
  } else if (heading) {
    console.log(`##################################################
## ${heading}
##################################################`);
  }

  return (...args) => {
    args.forEach((arg) =>
      console.dir(arg, { depth: null, colors: true, showHidden: false }),
    );

    heading && console.log(`# end ${heading}`);
    return debug;
  };
}

export { debug };
