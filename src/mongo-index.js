function willCursorUseIndex(cursor) {
  return Promise.resolve(typeof cursor?.explain === "function")
    .then((isCursor) => (isCursor ? cursor.explain("executionStats") : cursor))
    .then((explain) => {
      for (const stage of gatherStages(
        explain.executionStats.executionStages,
      )) {
        if (typeof stage === "object") return false;
        else if (typeof stage === "string") return stage;
      }

      function gatherStages(stages, info) {
        info ||= [];

        // breadth first scan
        info.push(stages.filter || stages.indexName);

        if (stages.inputStage) {
          gatherStages(stages.inputStage, info);
        }

        return info;
      }
    });
}

export { willCursorUseIndex };
