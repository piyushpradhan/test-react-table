export const moveRevisionsField = (processColumns: Array<Object>) => {
  const revisionFieldIndex = processColumns.findIndex(
    item => item?.type === "revision"
  );

  if (revisionFieldIndex === -1) return processColumns;

  const titleIndex = processColumns.findIndex(item => item?.key === "title");

  // $FlowFixMe
  return R.move(revisionFieldIndex, titleIndex + 1, processColumns);
};
