import path from "node:path";

const yolo = () => {
  console.log(path.join("/one/", "two"));
};

export { yolo };
