import { useAppContext } from "../store/store";
import instances from "../makeData.js";

export default function useRowExpansion({ instanceId, columnId }) {
  const { appState, toggleEmbeddedFieldsExpansion, getMaxRows, getIsExpanded } =
    useAppContext();
  const toggleExpansion = ({ index }) => {
    const parts = columnId.split("-");
    const parentId = parts.slice(0, parts.length - 1).join("-");
    const currentMaxRows = getMaxRows({ instanceId });
    const linkedFieldMax =
      instances[instanceId]?.[`${parentId}-meta`].length ??
      instances[instanceId]?.[columnId].length ??
      1;
    const fieldMax = Math.max(
      linkedFieldMax,
      instances[instanceId]?.[columnId]?.[index]?.length ?? 1
    );

    toggleEmbeddedFieldsExpansion({
      instanceId,
      columnId,
      maxRows: Math.max(fieldMax, currentMaxRows),
      index
    });

    console.log({ expanded: appState.expandedEmbeddedRows });
  };

  const isRowExpanded = getIsExpanded({ instanceId, columnId });

  return {
    appState,
    toggleExpansion,
    isRowExpanded
  };
}
