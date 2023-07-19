import * as R from "ramda";

export const moveRevisionsField = ({ processColumns }) => {
  const revisionFieldIndex = processColumns.findIndex(
    item => item?.type === "revision"
  );

  if (revisionFieldIndex === -1) return processColumns;

  const titleIndex = processColumns.findIndex(item => item?.key === "title");

  // $FlowFixMe
  return R.move(revisionFieldIndex, titleIndex + 1, processColumns);
};

export const calculateColumnSpan = ({ instance, linkedFieldId }) => {
  let embeddedHeaderCount = 0;
  Object.keys(instance).map(key => {
    if (key.includes(`${linkedFieldId}-`)) {
      embeddedHeaderCount = Math.max(embeddedHeaderCount, instance[key].length);
    }
  });
  return embeddedHeaderCount;
};
