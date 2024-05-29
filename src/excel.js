import xl from "excel4node";
import { open, close, createWriteStream } from "node:fs";

/**
 * @param {string} path - Filepath to write to.
 * @param {object} headers
 * @returns {Promise} An array of functions. The first function writes to the
 * excel file designated by path. The second function terminates the stream,
 * cleaning up file descriptors and such.
 */
function excel(filepath, headers) {
  const setHeader = (sheet, style) => {
    for (let i = 0; i < headers.length; i++) {
      sheet
        .cell(1, i + 1)
        .string(headers[i].toString())
        .style(style);
    }
  };
  return new Promise((resolve, reject) => {
    open(filepath, "w", (err, fd) => {
      if (err) return reject(err);

      try {
        const stream = createWriteStream(null, { fd });
        const wb = new xl.Workbook();
        const style = wb.createStyle({
          font: {
            bold: true,
            size: 18,
          },
        });
        const sheets = new Map();
        const defsheet = sheets
          .set("default", {
            sheet: wb.addWorksheet("sheet 1"),
            row: 1,
          })
          .get("default");

        setHeader(defsheet.sheet, style);
        defsheet.row++;

        wb.writeToBuffer()
          .then((buffer) =>
            stream.write(buffer, (err) => {
              if (err) reject(err);
            }),
          )
          .then(() =>
            resolve([
              (data, sheetName) => {
                return new Promise((resolve, reject) => {
                  try {
                    const sheet = sheetName
                      ? sheets.get(sheetName) ||
                        sheets
                          .set(sheetName, {
                            sheet: wb.addWorksheet(sheetName),
                            row: 1,
                          })
                          .get(sheetName)
                      : defsheet;

                    if (sheet.row === 1) {
                      setHeader(sheet.sheet, style);
                      sheet.row++;
                    }
                    const row = sheet.row++;

                    for (let col = 0; col < data.length; col++) {
                      sheet.sheet
                        .cell(row, col + 1)
                        .string(data[col]?.toString());
                    }

                    wb.writeToBuffer()
                      .then((buffer) =>
                        stream.write(buffer, (err) => {
                          if (err) throw err;
                        }),
                      )
                      .then(resolve)
                      .catch(reject);
                  } catch (err) {
                    reject(err);
                  }
                });
              },
              () => {
                close(fd);
                console.log(filepath);
              },
            ]),
          );
      } catch (err) {
        reject(err);
      }
    });
  });
}

export { excel };
