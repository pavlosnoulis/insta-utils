import { open, close, createWriteStream } from "node:fs";

/**
 * @param {string} path - Filepath to write to.
 * @param {object} headers
 * @returns {Promise} An array of functions. The first function writes to the
 * csv file designated by path. The second function terminates the stream,
 * cleaning up file descriptors and such.
 */

function csv(filepath, headers) {
  const arToCsv = (array) =>
    array
      .reduce((car, cdr) => {
        return (car ? car.concat(",") : car).concat(
          `"${cdr instanceof Array ? cdr.join(" ") : cdr.toString()}"`,
        );
      }, "")
      .concat("\n");

  return new Promise((resolve, reject) => {
    open(filepath, "w", (err, fd) => {
      if (err) return reject(err);
      try {
        const stream = createWriteStream(null, { fd });
        stream.write(arToCsv(headers), (err) => {
          if (err) reject(err);
          resolve([
            (data) => {
              return new Promise((resolve, reject) => {
                try {
                  const str = data
                    .reduce((car, cdr) => {
                      return (car ? car.concat(",") : car).concat(
                        `"${cdr instanceof Array ? cdr.join(" ") : cdr.toString()}"`,
                      );
                    }, "")
                    .concat("\n");

                  stream.write(str, (err) => (err ? reject(err) : resolve()));
                } catch (err) {
                  reject(err);
                }
              });
              return stream.write();
            },
            () => {
              close(fd);
              console.log(filepath);
            },
          ]);
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

export { csv };
